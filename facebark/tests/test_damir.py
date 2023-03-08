from fastapi.testclient import TestClient
from main import app
from queries.following import FollowingRepository


client = TestClient(app)

class FollowingQueries:
    def get_all(self):
        return []

def test_get_all_following_relationships():
    app.dependency_overrides[FollowingRepository] = FollowingQueries
    response = client.get('/following')
    assert response.status_code == 200
    assert response.json() == []
    app.dependency_overrides = {}
