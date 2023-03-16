from pydantic import BaseModel, Field
from typing import Optional, List, Union, Dict
from queries.pool import pool
from queries.accounts import AccountOut
from datetime import datetime, timedelta, timezone

# from queries.statuses import StatusOut


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
        # with pool.connection() as conn:
        #     with conn.cursor() as db:
        #         result = db.execute(
        #             """
        #             INSERT INTO likes
        #                 (status_id, account_id)
        #             VALUES
        #                 (%s, %s)
        #             RETURNING id;
        #             """,
        #             [like.status_id, like.account_id],
        #         )
        #         id = result.fetchone()[0]
        #         return self.like_in_to_out(id, like)

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

    # def get_all_likes_for_one_status(
    #     self, status_id: int
    # ) -> List[LikeOut]:
    #     try:
    #         with pool.connection() as conn:
    #             with conn.cursor() as db:
    #                 result = db.execute(
    #                     """
    #                     SELECT l.id
    #                         , l.status_id
    #                         , l.account_id
    #                     FROM likes AS l
    #                     WHERE l.status_id = %s
    #                     """,
    #                     [status_id],
    #                 )
    #                 result = []
    #                 for record in db:
    #                     like = LikeOut(
    #                         id=record[0],
    #                         status_id=record[1],
    #                         account_id=record[2],
    #                     )
    #                     result.append(like)
    #                 return result
    #     except Exception:
    #         return {"message": "Could not get those likes"}

    # def delete(self, follower_id: int, followee_id: int) -> bool:
    #     try:
    #         with pool.connection() as conn:
    #             with conn.cursor() as db:
    #                 db.execute(
    #                     """
    #                     DELETE FROM following
    #                     WHERE follower_id = %s
    #                     AND followee_id = %s
    #                     """,
    #                     [follower_id, followee_id],
    #                 )
    #                 return True
    #     except Exception:
    #         return False

    # def get_all_statuses_for_accounts_following(
    #     self, account_id: int
    # ) -> List[StatusOutVO]:
    #     try:
    #         with pool.connection() as conn:
    #             with conn.cursor() as db:
    #                 result = db.execute(
    #                     """
    #                     SELECT f.follower_id
    #                         , f.followee_id
    #                         , s.id
    #                         , s.status_text
    #                         , s.time_stamp
    #                         , s.account_id
    #                         , a.name
    #                         , a.image_url
    #                         , s.image_url
    #                         , s.likes
    #                     FROM following AS f
    #                     INNER JOIN statuses AS s
    #                         ON (f.followee_id = s.account_id)
    #                     INNER JOIN accounts AS a
    #                         ON (a.id = f.followee_id)
    #                     WHERE f.follower_id = %s
    #                     ORDER BY s.time_stamp DESC;
    #                     """,
    #                     [account_id],
    #                 )
    #                 result = []
    #                 for record in db:
    #                     status = StatusOutVO(
    #                         id=record[2],
    #                         status_text=record[3],
    #                         time_stamp=record[4],
    #                         account_id=record[5],
    #                         name=record[6],
    #                         account_image_url=record[7],
    #                         status_image_url=record[8],
    #                         likes=record[9],
    #                     )
    #                     result.append(status)
    #                 return result
    #     except Exception:
    #         return {"message": "Could not get those status updates"}

    def like_in_to_out(self, id: int, like: LikeIn):
        old_data = like.dict()
        return LikeOut(id=id, **old_data)

    def record_to_like_out(self, record):
        return LikeOut(
            id=record[0],
            status_id=record[1],
            account_id=record[2],
        )
