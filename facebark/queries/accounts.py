from pydantic import BaseModel
from typing import List, Union
from datetime import date
from queries.pool import pool


class Error(BaseModel):
    message: str


class AccountIn(BaseModel):
    username: str
    email: str
    phone_number: str
    name: str
    image_url: str
    breed: str
    sex: str
    dob: date
    owner_name: str
    description: str


class AccountOut(BaseModel):
    id: int
    username: str
    email: str
    phone_number: str
    name: str
    image_url: str
    breed: str
    sex: str
    dob: date
    owner_name: str
    description: str

class AccountOutWithPassword(AccountOut):
    hashed_password: str

class AccountRepository:
    def get_all(self) -> Union[Error, List[AccountOutWithPassword]]:
        try:
            # connect to the database
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    # Run our SELECT statement
                    result = db.execute(
                        """
                        SELECT id, username, email, phone_number, name, image_url, breed, sex, dob, owner_name, description
                        FROM accounts
                        ORDER BY name;
                        """
                    )
                    return [
                        self.record_to_account_out(record) for record in result
                    ]

        except Exception as e:
            print(e)
            return {"message": "Could not get all accounts"}

    def account_in_to_out(self, id: int, account: AccountIn):
        old_data = account.dict()
        return AccountOut(id=id, **old_data)

    def record_to_account_out(self, record):
        return AccountOut(
            id=record[0],
            username=record[1],
            email=record[2],
            phone_number=record[3],
            name=record[4],
            image_url=record[5],
            breed=record[6],
            sex=record[7],
            dob=record[8],
            owner_name=record[9],
            description=record[10],
        )
