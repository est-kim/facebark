from fastapi.testclient import TestClient
from main import app
from queries.states import StateRepository

client = TestClient(app)


class MockStateQueries:
    def get_all(self):
        return [all_states_mock]


all_states_mock = {
    "id": 0,
    "name": "string",
}

mock_state = {
    "id": 0,
    "name": "string",
}


def state_override():
    return mock_state


def test_get_all_states():
    app.dependency_overrides[StateRepository] = MockStateQueries
    # app.dependency_overrides[
    #     authenticator.try_get_current_state_data
    # ] = state_override

    response = client.get("/states")

    assert response.status_code == 200
    assert response.json() == [all_states_mock]

    app.dependency_overrides = {}


def test_init():
    assert 1 == 1
