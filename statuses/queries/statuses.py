from pydantic import BaseModel
from typing import Optional, List, Union
from datetime import datetime
from queries.pool import pool

class Error(BaseModel):
    message: str


class StatusIn(BaseModel):
    status: str


class StatusOut(BaseModel):
    id: int
    status: str
    time_stamp: datetime
    account_id: int
    comment_id: int


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
                            status,
                            time_stamp,
                            account_id,
                            comment_id
                        FROM statuses;
                        """
                    )
                    # creating a new vacationOut object
                    return [
                        self.record_to_status_out(record)
                        for record in result
                    ]
        except Exception as e:
            print(e)
            return {"message": "Could not get all statuses"}

    def create(self, status: StatusIn) -> StatusOut:
        # connect the database by creating pool of connections
        with pool.connection() as conn:
            # get a cursor (something to run SQL with)
            with conn.cursor() as db:
                # run our INSERT statement
                result = db.execute(
                    """
                    INSERT INTO statuses
                        (status)
                    VALUES
                        (%s)
                    RETURNING id;
                    """,
                    # to pass in values to our SQL statement
                    [
                        status.status
                    ]
                )
                id = result.fetchone()[0]
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
            status=record[1],
            time_stamp=record[2],
            account_id=record[3],
            comment_id=record[4],
        )
