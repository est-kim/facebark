from pydantic import BaseModel, Field
from typing import Optional, List, Union
from datetime import datetime
from queries.pool import pool


class Error(BaseModel):
    message: str


class StatusIn(BaseModel):
    status_text: str
    account_id: int
    comment_id: int


class StatusOut(BaseModel):
    id: int
    status_text: str
    time_stamp: datetime = Field(default_factory=datetime.utcnow)
    account_id: int
    comment_id: Optional[int]


class StatusesOut(BaseModel):
    statuses: list[StatusOut]


class StatusRepository:
    def get_all(self) -> Union[List[StatusOut], Error]:
        try:
            # connect the database by creating pool of connections
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    # run our SELECT statement
                    result = db.execute(
                        """
                        SELECT
                            id,
                            status_text,
                            time_stamp,
                            account_id,
                            comment_id
                        FROM statuses;
                        """
                    )
                    # creating a new statusOut object
                    return [
                        self.record_to_status_out(record)
                        for record in result
                    ]
        except Exception as e:
            print(e)
            return {"message": "Could not get all statuses"}

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
                        (status_text, account_id, comment_id)
                    VALUES
                        (%s, %s, %s)
                    RETURNING id, status_text, time_stamp, account_id, comment_id;
                    """,
                    # to pass in values to our SQL statement
                    [
                        status.status_text,
                        status.account_id,
                        status.comment_id
                    ]
                )
                row = result.fetchone()
                id = row[0]
                time_stamp = row[2]
                # Return our new data
                # old_data = vacation.dict()
                # Splats old_data so we don't have to type
                # old_data["name"] etc...
                return self.status_in_to_out(id, status)


    def status_in_to_out(self, id:int, status: StatusIn):
        old_data = status.dict()
        return StatusOut(id=id, **old_data)

    def record_to_status_out(self, record):
        return StatusOut(
            id=record[0],
            status_text=record[1],
            time_stamp=record[2],
            account_id=record[3],
            comment_id=record[4],
        )
