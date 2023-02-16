from pydantic import BaseModel
from queries.pool import pool

class StateIn(BaseModel):
    name:str

class StateOut(BaseModel):
    id:int
    name:str


class StateRepository:
    def create(self, state:StateIn) -> StateOut:
        #connect the database
        with pool.connection() as conn:
            #get a cursor
            with conn.cursor() as db:
                #run INSERT statement
                result = db.execute(
                    """
                    INSERT INTO states
                        (name)
                    VALUES
                        (%s)
                    RETURNING id;
                    """,
                    [state.name]
                )
                id = result.fetchone()[0]
                #return new data
                old_data = state.dict()
                return StateOut(id=id, **old_data)
