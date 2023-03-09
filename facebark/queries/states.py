from pydantic import BaseModel
from queries.pool import pool
from typing import List, Union, Optional


class StateOut(BaseModel):
    id: int
    name: str


class Error(BaseModel):
    message: str


class StateRepository:
    def get_one(self, state_id: int) -> Optional[StateOut]:
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    # Run our SELECT statement
                    result = db.execute(
                        """
                        SELECT
                        id,
                        name
                        FROM states
                        WHERE id = %s;
                        """,
                        [state_id],
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_state_out(record)

        except Exception:
            return {"message": "Could not get that event"}

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
        except Exception:
            return {"message": "Could not get all states"}

    def get_all_onid(self, state_id: int) -> Union[Error, List[StateOut]]:
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
                        WHERE states.state_id = %s
                        """,
                        [state_id],
                    )
                    result = []
                    for record in db:
                        state = StateOut(
                            id=record[0], name=record[1], state_id=record[2]
                        )
                        result.append(state)
                    return result
        except Exception:
            return {"message": "Could not get all cities"}

    def record_to_state_out(self, record):
        return StateOut(
            id=record[0],
            name=record[1],
        )
