import os
from typing import Tuple
from fastapi import Depends
from jwtdown_fastapi.authentication import Authenticator
from queries.accounts import (
    AccountRepository,
    AccountOut,
    AccountOutWithPassword,
)


class AccountAuthenticator(Authenticator):
    async def get_account_data(
        self,
        username: str,
        accounts: AccountRepository,
    ) -> AccountOutWithPassword:
        # Use your repo to get the account based on the
        # username (which could be an email)
        return accounts.get(username)

    def get_account_getter(
        self,
        accounts: AccountRepository = Depends(),
    ) -> AccountRepository:
        # Return the accounts. That's it.
        return accounts

    def get_hashed_password(self, account: AccountOutWithPassword):
        # Return the encrypted password value from your
        # account object
        # print("ACCCCOUNTTTTT: ", account)
        return account.get("hashed_password")

    def get_account_data_for_cookie(
        self, account: AccountOutWithPassword
    ) -> Tuple[dict, str]:
        # Return the username and the data for the cookie.
        # You must return TWO values from this method.
        return account.__getitem__("username"), AccountOut(
            id=account.__getitem__("id"),
            username=account.__getitem__("username"),
            hashed_password=account.__getitem__("hashed_password"),
            email=account.__getitem__("email"),
            phone_number=account.__getitem__("phone_number"),
            name=account.__getitem__("name"),
            image_url=account.__getitem__("image_url"),
            breed=account.__getitem__("breed"),
            sex=account.__getitem__("sex"),
            dob=account.__getitem__("dob"),
            owner_name=account.__getitem__("owner_name"),
            description=account.__getitem__("description"),
            city_id=account.__getitem__("city_id"),
            state_id=account.__getitem__("state_id"),
        )


authenticator = AccountAuthenticator(os.environ["SIGNING_KEY"])
