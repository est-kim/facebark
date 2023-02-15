from pydantic import BaseModel
from typing import Optional, List, Union
from datetime import datetime
from queries.pool import pool

class Error(BaseModel):
    message: str


class StatusIn(BaseModel):
    status: str
    timestamp: datetime


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


    def status_in_to_out(self, id:int, status: StatusIn):
        old_data = status.dict()
        return StatusOut(id=id, **old_data)
