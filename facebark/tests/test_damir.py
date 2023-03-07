from fastapi.testclient import TestClient
from main import app
from queries.following import FollowingRepository


client = TestClient(app)

class FollowingQueries:
    def get_all(self):
        return []

# mock_data = {
#     "id": 290,
#     "username": "rudy",
#     "hashed_password": "null",
#     "email": "damir.rukavina@yahoo.com",
#     "phone_number": "847-899-1526",
#     "name": "Rudy",
#     "image_url": "https://i.ibb.co/QrgqL63/rudy-on-pillow.jpg",
#     "breed": "Shih Tzu",
#     "sex": "Male",
#     "dob": "2013-07-23",
#     "owner_name": "Damir Rukavina",
#     "description": "boof (translation: I love my daddy, my toys, and my sister Olive!)",
#     "city_id": 733,
#     "state_id": 6
# }

# mock_user = {
#     "id": 291,
#     "username": "olive",
#     "hashed_password": "$2b$12$ysAUc4Z/gcPf0yDQR/robeqQC4rqozpMHHCsOJMnw960HbspnfIYO",
#     "email": "damir.rukavina@yahoo.com",
#     "phone_number": "847-899-1526",
#     "name": "Olive",
#     "image_url": "https://i.ibb.co/qY65FWf/IMG-0212.jpg",
#     "breed": "Shih Tzu",
#     "sex": "Female",
#     "dob": "2013-07-23",
#     "owner_name": "Damir Rukavina",
#     "description": "I love daddy and my brother Rudy, but not Odin!",
#     "city_id": 733,
#     "state_id": 6
# }

# def account_override():
#     return mock_user

def test_get_all_following_relationships():
    app.dependency_overrides[FollowingRepository] = FollowingQueries
    # app.dependency_overrides[
    #     authenticator.try_get_current_account_data
    # ] = account_override
    # expected = [{
    #     "id": 290,
    #     "username": "rudy",
    #     "hashed_password": "null",
    #     "email": "damir.rukavina@yahoo.com",
    #     "phone_number": "847-899-1526",
    #     "name": "Rudy",
    #     "image_url": "https://i.ibb.co/QrgqL63/rudy-on-pillow.jpg",
    #     "breed": "Shih Tzu",
    #     "sex": "Male",
    #     "dob": "2013-07-23",
    #     "owner_name": "Damir Rukavina",
    #     "description": "boof (translation: I love my daddy, my toys, and my sister Olive!)",
    #     "city_id": 733,
    #     "state_id": 6
    # }]
    response = client.get('/following')
    assert response.status_code == 200
    app.dependency_overrides = {}

def test_init():
    assert 1 == 1
