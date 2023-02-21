from pydantic import BaseModel
from queries.pool import pool
from typing import List, Union

class DogParkOut(BaseModel):
    id: int
    name: str
    city_id: int

class Error(BaseModel):
    message: str

class DogParkRepository:
    def get_all(self) -> Union[Error, List[DogParkOut]]:
        try:
                # connect the database
            with pool.connection() as conn:
                # get a cursor
                with conn.cursor() as db:
                    # run SELECT statement
                    db.execute(
                        """
                        SELECT id, name, city_id
                        FROM dog_parks
                        ORDER BY id;
                        """
                    )
                    result = []
                    for record in db:
                        dog_park = DogParkOut(
                            id = record[0],
                            name = record[1],
                            city_id = record[2]
                        )
                        result.append(dog_park)
                    return result
        except Exception as e:
            print(e)
            return {"message": "Could not get all dog parks"}
