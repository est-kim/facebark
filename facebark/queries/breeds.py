from pydantic import BaseModel
from queries.pool import pool
from typing import List, Union


class BreedOut(BaseModel):
    id: int
    name: str


class Error(BaseModel):
    message: str


class BreedRepository:
    def get_all(self) -> Union[Error, List[BreedOut]]:
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor
                with conn.cursor() as db:
                    # run SELECT statement
                    db.execute(
                        """
                        SELECT id, name
                        FROM breeds;
                        """
                    )
                    result = []
                    for record in db:
                        breed = BreedOut(
                            id=record[0],
                            name=record[1],
                        )
                        result.append(breed)
                    return result
        except Exception:
            return {"message": "Could not get all breeds"}
