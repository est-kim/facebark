from pydantic import BaseModel
from queries.pool import pool
from typing import List, Union

class CityOut(BaseModel):
    id: int
    name: str
    state_id: int

class Error(BaseModel):
    message: str

class CityRepository:
    def get_all(self) -> Union[Error, List[CityOut]]:
        try:
                # connect the database
            with pool.connection() as conn:
                # get a cursor
                with conn.cursor() as db:
                    # run SELECT statement
                    db.execute(
                        """
                        SELECT id, name, state_id
                        FROM cities
                        ORDER BY id;
                        """
                    )
                    result = []
                    for record in db:
                        city = CityOut(
                            id = record[0],
                            name = record[1],
                            state_id = record[2]
                        )
                        result.append(city)
                    return result
        except Exception as e:
            print(e)
            return {"message": "Could not get all cities"}
