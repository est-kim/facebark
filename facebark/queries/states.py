from pydantic import BaseModel
from queries.pool import pool
from typing import List, Union


class StateOut(BaseModel):
    id: int
    name: str


class Error(BaseModel):
    message: str


class StateRepository:
    def get_all(self) -> Union[Error, List[StateOut]]:
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor
                with conn.cursor() as db:
                    # run SELECT statement
                    db.execute(
                        """
                        SELECT id, name
                        FROM states
                        ORDER BY id;
                        """
                    )
                    result = []
                    for record in db:
                        state = StateOut(
                            id=record[0],
                            name=record[1],
                        )
                        result.append(state)
                    return result
        except Exception as e:
            print(e)
            return {"message": "Could not get all states"}
