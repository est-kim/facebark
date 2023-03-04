from pydantic import BaseModel, Field
from typing import Optional, List, Union
from datetime import datetime, timezone, timedelta
from queries.pool import pool


class Error(BaseModel):
    message: str


class StatusIn(BaseModel):
    status_text: str
    image_url: str
    account_id: int


def get_pst_time() -> datetime:
    utc_time = datetime.utcnow()
    pst_offset = timedelta(hours=-8)
    pst_time = utc_time.replace(tzinfo=timezone.utc) + pst_offset
    pst_time = pst_time.replace(
        tzinfo=None
    )
    return pst_time


class StatusOut(BaseModel):
    id: int
    status_text: str
    time_stamp: datetime = Field(default_factory=lambda: get_pst_time())
    image_url: str
    account_id: int



class StatusesOut(BaseModel):
    statuses: list[StatusOut]


class StatusRepository:
    def get_all(self)-> Union[Error, List[StatusOut]]:
        try:
            # connect the database by creating pool of connections
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    # run our SELECT statement
                    db.execute(
                        """
                        SELECT
                            s.id,
                            s.status_text,
                            s.time_stamp,
                            s.account_id,
                            s.image_url
                        FROM statuses s
                        LEFT JOIN accounts a
                            ON (a.id = s.account_id)
                        ORDER BY time_stamp DESC;
                        """,
                    )
                    result = []
                    for record in db:
                        status = StatusOut(
                            id=record[0],
                            status_text=record[1],
                            time_stamp=record[2],
                            account_id=record[3],
                            image_url=record[4],
                        )
                        result.append(status)
                    return result
        except Exception as e:
            print(e)
            return {"message": "Could not get all statuses"}

    def get_statuses_by_account_id(self, account_id:int) -> List[StatusOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT
                            s.id,
                            s.status_text,
                            s.time_stamp,
                            s.account_id,
                            s.image_url
                        FROM statuses s
                        LEFT JOIN accounts a
                            ON (a.id = s.account_id)
                        WHERE s.account_id = %s
                        ORDER BY time_stamp DESC;
                        """,
                        [account_id],
                    )
                    result = []
                    for record in db:
                        status = StatusOut(
                            id=record[0],
                            status_text=record[1],
                            time_stamp=record[2],
                            account_id=record[3],
                            image_url=record[4],
                        )
                        result.append(status)
                    return result
        except Exception as e:
            print(e)
            return {"message": "Could not get all statuses by acc id"}

    ##add try and except after fixing post
    def create(self, status: StatusIn) -> Union[StatusOut, Error]:
        id = None
        # connect the database by creating pool of connections
        with pool.connection() as conn:
            # get a cursor (something to run SQL with)
            with conn.cursor() as db:
                # run our INSERT statement
                result = db.execute(
                    """
                    INSERT INTO statuses
                        (status_text, account_id, image_url)
                    VALUES
                        (%s, %s, %s)
                    RETURNING id, status_text, time_stamp, account_id, image_url;
                    """,
                    # to pass in values to our SQL statement
                    [status.status_text, status.account_id, status.image_url],
                )
                row = result.fetchone()
                id = row[0]
                return self.status_in_to_out(id, status)

    def delete(self, status_id: int) -> bool:
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM statuses
                        WHERE id = %s
                        """,
                        [status_id],
                    )
                    return True
        except Exception:
            return {"message": "Could not delete status"}

    def status_in_to_out(self, id: int, status: StatusIn):
        old_data = status.dict()
        return StatusOut(id=id, **old_data)

    def record_to_status_out(self, record):
        time_stamp = datetime.strptime(record[2], "%Y-%m-%d %H:%M:%S")
        return StatusOut(
            id=record[0],
            status_text=record[1],
            time_stamp=time_stamp,
            account_id=record[3],
            image_url=record[4],
        )

    def status_record_to_dict(self, row, description):
        status = None
        if row is not None:
            status = {}
            status_fields = [
                "id",
                "status_text",
                "time_stamp",
                "account_id",
                "image_url",
            ]
            for i, column in enumerate(description):
                if column.name in status_fields:
                    status[column.name] = row[i]
        return status
