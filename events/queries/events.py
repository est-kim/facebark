from pydantic import BaseModel
from typing import Optional, List, Union
from datetime import date, time
from queries.pool import pool

class EventsIn(BaseModel):
        title: str
        state: str
        city: str
        park: Optional[str] 
        address: str
        date: date
        start_time: str
        end_time: str
        description: str 
        picture: str

class EventsOut(BaseModel):
        id: int
        title: str
        state: str
        city: str
        park: Optional[str] 
        address: str
        date: date
        start_time: str
        end_time: str
        description: str 
        picture: str

class EventsRepository:
    def delete(self, event_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM events
                        WHERE id = %s
                        """,
                        [event_id]
                    )
                    return True
        except Exception as e:
            print(e)
            return False


    def update(self, event_id: int, event: EventsIn)-> EventsOut:
        try:
            # connect the database
            with pool.connection() as conn:
                #get a cursor(something to run sql with)
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE event
                        SET title=%s
                            , state=%s
                            , city=%s
                            , park=%s
                            , address=%s
                            , date=%s
                            , start_time=%s
                            , end_time=%s
                            , description=%s
                            , picture=%s
                        WHERE id=%s;
                        """,
                        [
                            event.title, # these represent the %s
                            event.state, 
                            event.city,
                            event.park,
                            event.address,
                            event.date,
                            event.start_time,
                            event.end_time,
                            event.description,
                            event.picture,
                            event_id
                        ]
                    )
                    return self.event_in_to_out(event_id, event)
        except Exception as e:
            return{"message": "could not update events"}


    def get_all(self)-> List[EventsOut]:
        try:
            # connect the database
            with pool.connection() as conn:
                #get a cursor(something to run sql with)
                with conn.cursor() as db:
                    #run our insert statement
                    result = db.execute(
                        """
                        SELECT 
                        id, title, state, city, park, address, date, start_time, end_time, description, picture
                        FROM events;
                        """,
                    )
                    return [
                        EventsOut(
                            id= record[0],
                            title= record[1],
                            state= record[2],
                            city= record[3],
                            park= record[4],
                            address= record[5],
                            date= record[6],
                            start_time= record[7],
                            end_time= record[8],
                            description= record[9],
                            picture= record[10]
                        )
                        for record in db
                    ]
        except Exception as e:
            return{"message": "could not get all events"}



    def create(self, event: EventsIn) -> EventsOut:
        #connect to the database
        with pool.connection() as conn:
            #get a cursor(something to run sql with)
            with conn.cursor() as db:
                #run our insert statement
                result = db.execute(   #stuff we want to insert/create
                    """    
                    INSERT INTO events
                        (title, state, city, park, address, date, start_time, end_time, description, picture)
                    VALUES
                        (%s, %s, %s, %s, %s, %s, %s,%s, %s, %s)
                    RETURNING id, title, state, city, park, address, date, start_time, end_time, description, picture;
                    """,
                    [
                    event.title, # these represent the %s
                    event.state, 
                    event.city,
                    event.park,
                    event.address,
                    event.date,
                    event.start_time,
                    event.end_time,
                    event.description,
                    event.picture
                    ]
                )
                id = result.fetchone()[0]
                #Return new data
                # old_data = event.dict()
                # return EventsOut(id=id, **old_data)
                return self.event_in_to_out(id, event)
    
    def event_in_to_out(self, id: int, event:EventsIn):
        old_data = event.dict()
        return EventsOut(id=id, **old_data)