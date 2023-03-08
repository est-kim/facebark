from pydantic import BaseModel
from queries.pool import pool
from typing import List, Union, Optional


class DogParkOut(BaseModel):
    id: int
    name: str
    city_id: int


class Error(BaseModel):
    message: str


class DogParkRepository:
    def get_one(self, dog_park_id: int) -> Optional[DogParkOut]:
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
                        name,
                        city_id
                        FROM dog_parks
                        WHERE id = %s;
                        """,
                        [dog_park_id],
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_dog_out(record)
        except Exception:
            return {"message": "Could not get that doggo park"}

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
                            id=record[0], name=record[1], city_id=record[2]
                        )
                        result.append(dog_park)
                    return result
        except Exception:
            return {"message": "Could not get all dog parks"}

    def record_to_dog_out(self, record):
        return DogParkOut(id=record[0], name=record[1], city_id=record[2])
