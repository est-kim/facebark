from fastapi.testclient import TestClient
from main import app
from queries.events import EventsRepository

client = TestClient(app)


class EventsQueries:
    def get_all(self):
        return []


def test_get_all_following_relationships():
    app.dependency_overrides[EventsRepository] = EventsQueries

    response = client.get("/events")

    assert response.status_code == 200
    assert response.json() == []
    app.dependency_overrides = {}


def test_init():
    assert 1 == 1
