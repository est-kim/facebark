from pydantic import BaseModel
from typing import List, Union
from queries.pool import pool


class Error(BaseModel):
    message: str


class AttendeesIn(BaseModel):
    event_id: int
    attendee_id: int


class AttendeesOut(BaseModel):
    id: int
    event_id: int
    attendee_id: int


class AttendeesRepository:
    def get_all(self) -> Union[List[AttendeesOut], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT a.id
                            , event_id
                            , attendee_id
                        FROM attendees a

                        """
                    )
                    return [
                        self.record_to_attendees_out(record)
                        for record in result
                    ]
        except Exception:
            return {"message": "Could not get all attendees relationships"}

    def get_attendees_by_event_id(self, event_id: int) -> List[AttendeesOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT a.id
                            , event_id
                            , attendee_id
                        FROM attendees a
                        where event_id = %s
                        """,
                        [event_id],
                    )
                    result = []
                    for record in db:
                        attendee = AttendeesOut(
                            id=record[0],
                            event_id=record[1],
                            attendee_id=record[2],
                        )
                        result.append(attendee)
                    return result
        except Exception:
            return {"message": "Could not get all attendees by event id"}

    def create(self, attendees: AttendeesIn) -> AttendeesOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO attendees
                        (event_id, attendee_id)
                    VALUES
                        (%s, %s)
                    RETURNING id;
                    """,
                    [attendees.event_id, attendees.attendee_id],
                )
                id = result.fetchone()[0]
                return self.attendees_in_to_out(id, attendees)

    def attendees_in_to_out(self, id: int, attendees: AttendeesIn):
        old_data = attendees.dict()
        return AttendeesOut(id=id, **old_data)

    def record_to_attendees_out(self, record):
        return AttendeesOut(
            id=record[0],
            event_id=record[1],
            attendee_id=record[2],
        )
