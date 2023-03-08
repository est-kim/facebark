from fastapi.testclient import TestClient
from main import app
from queries.accounts import AccountRepository

client = TestClient(app)


class MockAccountQueries:
    def get_all_accounts(self):
        return [all_accounts_mock]


all_accounts_mock = {
    "id": 0,
    "username": "string",
    "hashed_password": "string",
    "email": "string",
    "phone_number": "string",
    "name": "string",
    "image_url": "string",
    "breed": "string",
    "sex": "string",
    "dob": "string",
    "owner_name": "string",
    "description": "string",
    "city_id": 0,
    "state_id": 0
}

mock_account = {
    "id": 0,
    "username": "string",
    "hashed_password": "string",
    "email": "string",
    "phone_number": "string",
    "name": "string",
    "image_url": "string",
    "breed": "string",
    "sex": "string",
    "dob": "string",
    "owner_name": "string",
    "description": "string",
    "city_id": 0,
    "state_id": 0
}


def account_override():
    return mock_account


def test_get_all_users():
    app.dependency_overrides[AccountRepository] = MockAccountQueries
    # app.dependency_overrides[
    #     authenticator.try_get_current_account_data
    # ] = account_override

    response = client.get("/accounts")
    print(response)

    assert response.status_code == 200
    assert response.json() == [all_accounts_mock]

    app.dependency_overrides = {}


def test_init():
    assert 1 == 1
