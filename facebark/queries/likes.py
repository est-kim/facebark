from pydantic import BaseModel, Field
from typing import Optional, List, Union, Dict
from queries.pool import pool
from datetime import datetime, timedelta, timezone


def get_pst_time() -> datetime:
    utc_time = datetime.utcnow()
    pst_offset = timedelta(hours=-8)
    pst_time = utc_time.replace(tzinfo=timezone.utc) + pst_offset
    pst_time = pst_time.replace(
        tzinfo=None
    )  # remove timezone info to avoid ambiguity
    return pst_time


class Error(BaseModel):
    message: str


class LikeIn(BaseModel):
    status_id: int
    account_id: int


class LikeOut(BaseModel):
    id: int
    status_id: int
    account_id: int


class StatusOutVO(BaseModel):
    id: int
    status_text: str
    time_stamp: datetime = Field(default_factory=lambda: get_pst_time())
    account_id: int
    comment_id: Optional[int]
    name: str
    account_image_url: str
    status_image_url: str
    likes: int


class LikeRepository:
    def get_all(self) -> Union[List[LikeOut], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT l.id
                            , l.status_id
                            , l.account_id
                        FROM likes l
                        """
                    )
                    return [
                        self.record_to_like_out(record)
                        for record in result
                    ]
        except Exception:
            return {"message": "Could not get all likes"}

    def create(self, like: LikeIn) -> Union[LikeOut, Dict[str, str]]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                # check if a row with the given status_id and account_id already exists
                db.execute(
                    """
                    SELECT id, status_id, account_id
                    FROM likes
                    WHERE status_id = %s AND account_id = %s
                    """,
                    [like.status_id, like.account_id],
                )
                existing_like = db.fetchone()
                if existing_like:
                    # a like record with the given status_id and account_id already exists
                    id, status_id, account_id = existing_like
                    return LikeOut(id=id, status_id=status_id, account_id=account_id)
                else:
                    # insert a new like record
                    db.execute(
                        """
                        INSERT INTO likes (status_id, account_id)
                        VALUES (%s, %s)
                        RETURNING id, status_id, account_id
                        """,
                        [like.status_id, like.account_id],
                    )
                    # check if one row was affected
                    if db.rowcount == 1:
                        id, status_id, account_id = db.fetchone()
                        return LikeOut(id=id, status_id=status_id, account_id=account_id)
                    else:
                        return {"detail": "Failed to create like record"}

    def get_likes_by_status_id(self, status_id: int) -> List[LikeOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT
                            l.id,
                            l.status_id,
                            l.account_id
                        FROM likes l
                        LEFT JOIN statuses s
                            ON (s.id = l.status_id)
                        LEFT JOIN accounts a
                            ON (a.id = l.account_id)
                        WHERE l.status_id = %s
                            """,
                        [status_id],
                    )
                    result = []
                    for record in db:
                        like = LikeOut(
                            id=record[0],
                            status_id=record[1],
                            account_id=record[2]
                        )
                        result.append(like)
                    return result
        except Exception:
            return {"message": "Could not get all likes by status id"}

    def like_in_to_out(self, id: int, like: LikeIn):
        old_data = like.dict()
        return LikeOut(id=id, **old_data)

    def record_to_like_out(self, record):
        return LikeOut(
            id=record[0],
            status_id=record[1],
            account_id=record[2],
        )
