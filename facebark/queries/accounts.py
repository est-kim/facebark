from pydantic import BaseModel
from typing import List, Union, Optional
from datetime import date
from queries.pool import pool
from pydantic import BaseModel


class DuplicateAccountError(ValueError):
    pass


class Error(BaseModel):
    message: str


class AccountIn(BaseModel):
    username: str
    password: str
    email: str
    phone_number: str
    name: str
    image_url: str
    breed: str
    sex: str
    dob: date
    owner_name: str
    description: str
    city_id: int
    state_id: int


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
    city_id: int
    state_id: int


class AccountOutWithPassword(AccountOut):
    hashed_password: str


class AccountsOut(BaseModel):
    accounts: List[AccountOut]

class AccountOutWithPassword(AccountOut):
    hashed_password: str

class AccountRepository:
    def record_to_account_out(self, record) -> AccountOutWithPassword:
        account_dict = {
            "id": record[0],
            "username": record[1],
            "hashed_password": record[2],
            "email": record[3],
            "phone_number": record[4],
        }
        print("THIS IS THE ACCOUNT_DICT!!!", account_dict)
        return account_dict

    def get(self, username: str) -> AccountOutWithPassword:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id, username, hashed_password, email,
                        phone_number, name, image_url, breed, sex,
                        dob, owner_name, description, city_id, state_id
                        FROM accounts
                        WHERE username = %s
                        """,
                        [username],
                    )

                    record = result.fetchone()
                    print("THIS IS THE RECORD: ", record)
                    if record is None:
                        return None
                    return self.record_to_account_out(record)
        except Exception:
            return {"message": "Could not get account"}

    def get_all_accounts(self) -> List[AccountOut]:
        try:
            # connect to the database
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    # Run our SELECT statement
                    db.execute(
                        """
                        SELECT
                        a.id,
                        a.username,
                        a.email,
                        a.phone_number,
                        a.name,
                        a.image_url,
                        a.breed,
                        a.sex,
                        a.dob,
                        a.owner_name,
                        a.description,
                        a.city_id,
                        a.state_id
                        FROM accounts a
                        LEFT JOIN states s
                            ON (s.id = a.state_id)
                        LEFT JOIN cities c
                            ON (c.id = a.city_id);
                        """,
                    )
                    return [
                        AccountOut(
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
                            city_id=record[11],
                            state_id=record[12]
                        )
                        for record in db
                    ]
        except Exception as e:
            print(e)
            return {"message": "Could not get all accounts"}

    def get_account_by_id(self, id:int) -> Optional[AccountOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT
                        a.id,
                        a.username,
                        a.email,
                        a.phone_number,
                        a.name,
                        a.image_url,
                        a.breed,
                        a.sex,
                        a.dob,
                        a.owner_name,
                        a.description,
                        a.state_id,
                        a.city_id
                        FROM accounts a
                        LEFT JOIN states s
                            ON (s.id = a.state_id)
                        LEFT JOIN cities c
                            ON (c.id = a.city_id)
                        WHERE a.id = %s
                        """,
                        [id],
                    )

                    record = None
                    row = db.fetchone()
                    if row is not None:
                        record = {}
                        for i, column in enumerate(db.description):
                            record[column.name] = row[i]
                    if record is None:
                        return None
                    return record
        except Exception:
            return {"message": "Could not get that user"}

    def create(
        self, account: AccountIn, hashed_password: str
    ) -> AccountOutWithPassword:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    params = [
                        account.username,
                        account.email,
                        account.phone_number,
                        account.name,
                        account.image_url,
                        account.breed,
                        account.sex,
                        account.dob,
                        account.owner_name,
                        account.description,
                        account.city_id,
                        account.state_id,
                        hashed_password,
                    ]
                    db.execute(
                        """
                        INSERT INTO accounts (username, email, phone_number,
                        name, image_url, breed, sex, dob, owner_name, description,
                        city_id, state_id, hashed_password)
                        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                        RETURNING id, username, email, phone_number,
                        name, image_url, breed, sex, dob, owner_name, description,
                        city_id, state_id, hashed_password;
                        """,
                        params,
                    )
                    record = None
                    row = db.fetchone()
                    if row is not None:
                        record = {}
                        for i, column in enumerate(db.description):
                            record[column.name] = row[i]
                    return record
        except Exception:
            return {"message": "Could not create an account"}

    def account_in_to_out(
        self, id: int, account: AccountIn, hashed_password: str
    ):
        old_data = account.dict()
        return AccountOutWithPassword(
            id=id, hashed_password=hashed_password, **old_data
        )
