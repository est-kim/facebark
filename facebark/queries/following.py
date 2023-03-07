from pydantic import BaseModel, Field
from typing import Optional, List, Union
from queries.pool import pool
from queries.accounts import AccountOut
from datetime import datetime

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


class FollowingIn(BaseModel):
    follower_id: int
    followee_id: int


class FollowingOut(BaseModel):
    id: int
    follower_id: int
    followee_id: int


class StatusOutVO(BaseModel):
    id: int
    status_text: str
    time_stamp: datetime = Field(default_factory=lambda: get_pst_time())
    account_id: int
    comment_id: Optional[int]
    name: str
    account_image_url: str
    status_image_url: str


class FollowingRepository:
    def get_all(self) -> Union[List[FollowingOut], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT f.id
                            , follower_id
                            , followee_id
                        FROM following f
                        LEFT JOIN accounts ab
                            ON (ab.id = f.follower_id)
                        LEFT JOIN accounts ac
                            ON (ac.id = f.followee_id);
                        """
                    )
                    return [
                        self.record_to_following_out(record)
                        for record in result
                    ]
        except Exception as e:
            print(e)
            return {"message": "Could not get all following relationships"}

    def create(self, following: FollowingIn) -> FollowingOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO following
                        (follower_id, followee_id)
                    VALUES
                        (%s, %s)
                    RETURNING id;
                    """,
                    [following.follower_id, following.followee_id],
                )
                id = result.fetchone()[0]
                return self.following_in_to_out(id, following)

    def get_all_following_for_one_account(
        self, account_id: int
    ) -> List[AccountOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT f.follower_id
                            , f.followee_id
                            , a.id
                            , a.username
                            , a.email
                            , a.phone_number
                            , a.name
                            , a.image_url
                            , a.breed
                            , a.sex
                            , a.dob
                            , a.owner_name
                            , a.description
                            , a.city_id
                            , a.state_id
                        FROM following AS f
                        INNER JOIN accounts AS a
                            ON (f.followee_id = a.id)
                        WHERE f.follower_id = %s
                        """,
                        [account_id],
                    )
                    result = []
                    for record in db:
                        account = AccountOut(
                            id=record[2],
                            username=record[3],
                            hashed_password="null",
                            email=record[4],
                            phone_number=record[5],
                            name=record[6],
                            image_url=record[7],
                            breed=record[8],
                            sex=record[9],
                            dob=record[10],
                            owner_name=record[11],
                            description=record[12],
                            city_id=record[13],
                            state_id=record[14],
                        )
                        result.append(account)
                    return result
        except Exception as e:
            print(e)
            return {"message": "Could not get that following relationship"}

    def delete(self, follower_id: int, followee_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM following
                        WHERE follower_id = %s
                        AND followee_id = %s
                        """,
                        [follower_id, followee_id],
                    )
                    return True
        except Exception as e:
            print(e)
            return False

    def get_all_statuses_for_accounts_following(
        self, account_id: int
    ) -> List[StatusOutVO]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT f.follower_id
                            , f.followee_id
                            , s.id
                            , s.status_text
                            , s.time_stamp
                            , s.account_id
                            , a.name
                            , a.image_url
                            , s.image_url
                        FROM following AS f
                        INNER JOIN statuses AS s
                            ON (f.followee_id = s.account_id)
                        INNER JOIN accounts AS a
                            ON (a.id = f.followee_id)
                        WHERE f.follower_id = %s
                        ORDER BY s.time_stamp DESC;
                        """,
                        [account_id],
                    )
                    result = []
                    for record in db:
                        status = StatusOutVO(
                            id=record[2],
                            status_text=record[3],
                            time_stamp=record[4],
                            account_id=record[5],
                            name=record[6],
                            account_image_url=record[7],
                            status_image_url=record[8],
                        )
                        result.append(status)
                    return result
        except Exception as e:
            print(e)
            return {"message": "Could not get those status updates"}

    def following_in_to_out(self, id: int, following: FollowingIn):
        old_data = following.dict()
        return FollowingOut(id=id, **old_data)

    def record_to_following_out(self, record):
        return FollowingOut(
            id=record[0],
            follower_id=record[1],
            followee_id=record[2],
        )
