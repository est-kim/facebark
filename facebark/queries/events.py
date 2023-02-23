from pydantic import BaseModel
from typing import Optional, List, Union
from datetime import date, time
from queries.pool import pool

class Error(BaseModel):
    message: str

class EventsIn(BaseModel):
    title: str
    states_id: int
    cities_id: int
    dog_parks_id: Optional[int]
    address: str
    date: date
    start_time: str
    end_time: str
    description: str
    picture: str


class EventsOut(BaseModel):
    id: int
    title: str
    states_id: str
    cities_id: str
    dog_parks_id: Optional[str]
    address: str
    date: date
    start_time: str
    end_time: str
    description: str
    picture: str

class Error(BaseModel):
    message: str

class EventsRepository:
    def get_one(self, event_id: int) -> Optional[EventsOut]:
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    # Run our SELECT statement
                    result = db.execute(
                        """
                        SELECT 
                        e.id, 
                        e.title, 
                        s.name, 
                        c.name, 
                        d.name, 
                        e.address, 
                        e.date, 
                        e.start_time, 
                        e.end_time, 
                        e.description, 
                        e.picture
                        FROM events e
                        LEFT JOIN states s
                            ON (s.id= e.states_id)
                        LEFT JOIN cities c
                            ON (c.id= e.cities_id)
                        LEFT JOIN dog_parks d
                        ON (d.id= e.dog_parks_id)
                        WHERE e.id = %s
                        """,
                        [event_id]
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_event_out(record)
        except Exception as e:
            print(e)
            return {"message": "Could not get that event"}


    def delete(self, event_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM events
                        WHERE id = %s
                        """,
                        [event_id],
                    )
                    return True
        except Exception as e:
            print(e)
            return False

    def update(self, event_id: int, event: EventsIn) -> EventsOut:
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor(something to run sql with)
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE events
                        SET title=%s
                            , states_id=%s
                            , cities_id=%s
                            , dog_parks_id=%s
                            , address=%s
                            , date=%s
                            , start_time=%s
                            , end_time=%s
                            , description=%s
                            , picture=%s
                        WHERE id=%s;
                        """,
                        [
                            event.title,  # these represent the %s
                            event.states_id,
                            event.cities_id,
                            event.dog_parks_id,
                            event.address,
                            event.date,
                            event.start_time,
                            event.end_time,
                            event.description,
                            event.picture,
                            event_id,
                        ],
                    )
                    return self.event_in_to_out(event_id, event)
        except Exception as e:
            return {"message": "could not update events"}

    def get_all(self) -> Union[Error, List[EventsOut]]:
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor(something to run sql with)
                with conn.cursor() as db:
                    # run our select statement
                    db.execute(
                        """
                        SELECT 
                        e.id, 
                        e.title, 
                        s.name, 
                        c.name, 
                        d.name, 
                        e.address, 
                        e.date, 
                        e.start_time, 
                        e.end_time, 
                        e.description, 
                        e.picture
                        FROM events e
                        LEFT JOIN states s
                            ON (s.id= e.states_id)
                        LEFT JOIN cities c
                            ON (c.id= e.cities_id)
                        LEFT JOIN dog_parks d
                        ON (d.id= e.dog_parks_id);

                        """,
                    )
                    # return [
                    #     EventsOut(
                    #         id=record[0],
                    #         title=record[1],
                    #         states_id=record[2],
                    #         cities_id=record[3],
                    #         dog_parks_id=record[4],
                    #         address=record[5],
                    #         date=record[6],
                    #         start_time=record[7],
                    #         end_time=record[8],
                    #         description=record[9],
                    #         picture=record[10],
                    #     )
                    #     for record in db
                    # ]
                    return[ 
                        self.record_to_event_out(record)
                        for record in result
                    ]
        except Exception as e:
            print(e)
            return {"message": "could not get all events"}

    def create(self, event: EventsIn) -> EventsOut:
        # connect to the database
        with pool.connection() as conn:
            # get a cursor(something to run sql with)
            with conn.cursor() as db:
                # run our insert statement
                result = db.execute(  # stuff we want to insert/create
                    """
                    INSERT INTO events
                        (title, states_id, cities_id, dog_parks_id, address, date, start_time, end_time, description, picture)
                    VALUES
                        (%s, %s, %s, %s, %s, %s, %s,%s, %s, %s)
                    RETURNING id;
                    """,
                    [
                        event.title,  # these represent the %s
                        event.states_id,
                        event.cities_id,
                        event.dog_parks_id,
                        event.address,
                        event.date,
                        event.start_time,
                        event.end_time,
                        event.description,
                        event.picture,
                    ],
                )
                id = result.fetchone()[0]
                # Return new data
                # old_data = event.dict()
                # return EventsOut(id=id, **old_data)
                return self.event_in_to_out(id, event)

    def event_in_to_out(self, id: int, event: EventsIn):
        old_data = event.dict()
        return EventsOut(id=id, **old_data)

    def record_to_event_out(self, record):
        return EventsOut(
            id=record[0],
            title=record[1],
            states_id=record[2],
            cities_id=record[3],
            dog_parks_id=record[4],
            address=record[5],
            date=record[6],
            start_time=record[7],
            end_time=record[8],
            description=record[9],
            picture=record[10],
        )
