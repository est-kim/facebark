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
    def record_to_city_out(self, record):
        return CityOut(
            id=record[0],
            name=record[1],
            state_id=record[2]
        )

    def get_cities_by_state_id(self, state_id: int) -> List[CityOut]:
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    # Run our SELECT statement
                    result = db.execute(
                        """
                        SELECT
                        cities.id,
                        cities.name,
                        cities.state_id
                        FROM cities
                        LEFT JOIN states
                            ON (states.id = cities.state_id)
                        WHERE cities.state_id =%s
                        """,
                        [state_id],
                    )
                    records = result.fetchall()
                    cities = [self.record_to_city_out(record) for record in records]
                    return cities
        except Exception as e:
            print(e)
            return {"message": "Could not get cities for that state"}

    def get_all(self) -> Union[Error, List[CityOut]]:
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor
                with conn.cursor() as db:
                    # run SELECT statement
                    db.execute(
                        """
                        SELECT
                        cities.id,
                        cities.name,
                        cities.state_id
                        FROM cities
                        LEFT JOIN states
                            ON (states.id = cities.state_id)
                        """
                    )
                    result = []
                    for record in db:
                        city = CityOut(
                            id=record[0], name=record[1], state_id=record[2]
                        )
                        result.append(city)
                    return result
        except Exception as e:
            print(e)
            return {"message": "Could not get all cities"}

