# FaceBark

## About

FaceBark is a fun, dog-based social media application that lets users connect with each other, share posts and pictures, create and attend events, and more.

With other social media apps like Facebook, Instagram, Twitter, etc., the user is typically the person for whom an account profile is created. With FaceBark, account profiles are created for the user's dog (so even though dogs can't use computers, we like to imagine that the user IS the dog).

Each FaceBark account corresponds to one dog, so if you have more than one dog you can create a unique profile for each one!

### Development team

* Esther Kim
* Conor McCabe
* Israel Navarrete
* Damir Rukavina

## Design

FaceBark is a monolithic application built using a FastAPI framework with PostgreSQL on the back-end and React on the front-end.

Click this link (or paste it into your web browser) for a visual overview of the application's data architecture: https://i.ibb.co/Xs0y98s/Screen-Shot-2023-03-08-at-3-55-47-PM.png

## How to run

1. Navigate to https://facebark.gitlab.io/facebark/ in your web browser.
2. Create an account, if you don't have one already. (Click "Sign Up" in the navbar, fill in your information, then click the "Sign Up" button.)
3. Sign in using your username and password!

## Features

### Landing page

This is the page that loads when you first visit the site, or when you successfully log out. The navbar at the top of the screen contains links to the app's features (note that some of these are only visible when you're logged in!).

### Profile page

This is where your account information is displayed to other users, including your dog's name, profile picture, short description, and more. To access this page, click "Profile" in the navbar (you must be logged in).

Also included on this page is a feature to create status updates, or "pupdates" - simply enter some text in the "Tell us about your day!" field, and if you'd like to include a picture you can include its image URL in the "Post a photo (optional)" field.

(Note: To get an image URL, you must first upload your photo to an image hosting site. We recommend https://imgbb.com/. Once your photo is uploaded to the site, right-click on the image and select "copy image address", then paste the URL into FaceBark.)

Your pupdates will be displayed on your profile page, and will be visible to anyone who visits your profile as well as anyone who's following you!

### Home page

This page displays your personal "feed" which includes all the pupdates from the dogs you're following as well as any events in your state. To access this page, click "Home" in the navbar (you must be logged in).

Clicking on the profile picture of a dog in your feed will take you to that dog's profile page, where you can un-follow them if you'd like. (If you un-follow a dog, their pupdates will no longer appear in your feed.)

Similarly, clicking on the picture of an event at the bottom of the page will take you to that event's detail page, where you can see which dogs are attending the event as well as choose to attend the event, if you'd like.

### View all dogs

This feature allows you to view all dogs in the system. To access this page, click the "Dogs" drop-down in the navbar and select "View All Dogs".

Clicking on the profile picture of a dog on this page will take you to that dog's profile page, where you can follow them if you'd like.

You can also filter the dogs by city and state, if you'd like. Select a state and a city from the drop-downs in the "Filter by Location" section, and only the dogs in that city will be displayed.

### Follow/Un-follow

If you'd like a particular dog's pupdates to show in your feed, you can follow them by navigating to their profile page and clicking the "Follow" button. (In this relationship, you are the "follower" and the dog you're following is the "followee".)

To un-follow a particular dog, navigate to their profile page and click "Unfollow".

### View dogs you're following, or dogs following you

These features allow you to view all the dogs you're following or all the dogs that are following you.

To view all dogs you're following, click the "Dogs" drop-down and select "Following"; to view all dogs following you, select "My Followers".

### View all events

This feature allows you to view all existing events. To access this page, click the "Events" drop-down in the navbar and select "View all events".

Clicking on the picture of an event will take you to that event's detail page, where you can see which dogs are attending the event as well as choose to attend the event, if you'd like.

### Create an event

If you'd like to create an event where you can meet other dogs (and their owners), you can do so using this feature. To access the create event form, click the "Events" drop-down in the navbar and select "Cretae an Event".

Once the form loads, you can enter the event's details in each respective field. If you'd like the event to be at a dog park, you can select the dog park from the "Choose a dog park..." drop-down (this list contains all dog parks in the selected city).

## CRUD routes

### Accounts (dog profiles)

POST request to /accounts:

```
request:
{
  "username": "string",
  "password": "string",
  "email": "string",
  "phone_number": "string",
  "name": "string",
  "image_url": "string",
  "breed": "string",
  "sex": "string",
  "dob": "string",
  "owner_name": "string",
  "description": "string",
  "city_id": int,
  "state_id": int
}

returns:
{
  "access_token": "string",
  "token_type": "Bearer",
  "account": {
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
}
```

GET and PUT request to /accounts/{id}:

```
request:
{
  "id": int,
  "username": "string",
  "hashed_password": "string",
  "email": "string",
  "phone_number": "string",
  "name": "string",
  "image_url": "string",
  "breed": "string",
  "sex": "string",
  "dob": "yyyy-mm-dd",
  "owner_name": "string",
  "description": "string",
  "city_id": int,
  "state_id": int
}

returns:
{
  "id": 5,
  "username": "CandyCactus",
  "hashed_password": "$2b$12$AJPye./yTYUOaIcVq4AdyeiVE0h/ga.Ek5u9ClxyuNgptfxGySc6a",
  "email": "CandyCactus@gmail.com",
  "phone_number": "3035310111",
  "name": "Charlie",
  "image_url": "https://highlandcanine.com/wp-content/uploads/2020/09/golden-retriever-in-field-of-flowers.jpg",
  "breed": "Golden Retriever",
  "sex": "Male",
  "dob": "2016-07-27",
  "owner_name": "Carmen Blackwell",
  "description": "Im always ready for a walk.",
  "city_id": 3208,
  "state_id": 44
}
```

### Following relationships

POST request to /following:

```
request:
{
  "follower_id": int,
  "followee_id": int
}

returns:
{
  "id": 1,
  "follower_id": 291,
  "followee_id": 292
}
```

GET request to /following/{id}:

```
request:
{
  "account_id": int,
}

returns:
[
  {
    "id": 290,
    "username": "rudy",
    "hashed_password": "null",
    "email": "damir.rukavina@yahoo.com",
    "phone_number": "847-899-1526",
    "name": "Rudy",
    "image_url": "https://i.ibb.co/QrgqL63/rudy-on-pillow.jpg",
    "breed": "Shih Tzu",
    "sex": "Male",
    "dob": "2013-07-23",
    "owner_name": "Damir Rukavina",
    "description": "boof (translation: I love my daddy, my toys, and my sister Olive!)",
    "city_id": 733,
    "state_id": 6
  }, ...
]
```

DELETE request to /following/{followee_id}?follower_id={follower_id}:

```
request:
{
  "followee_id": int,
  "follower_id": int
}

returns:

true
```

### Status updates (pupdates)

POST request to /statuses:

```
request:
{
  "status_text": "string",
  "image_url": "string",
  "account_id": int
}

returns:
{
  "id": 10,
  "status_text": "I'm hungry, feed me!",
  "time_stamp": "2023-03-07T11:27:25.339794",
  "image_url": "",
  "account_id": 292
}
```

GET request to /statuses:

```

returns:
[
  {
    "id": 10,
    "status_text": "I'm hungry, feed me!",
    "time_stamp": "2023-03-07T11:27:25.339794",
    "image_url": "",
    "account_id": 292
  }, ...
]
```

DELETE request to /statuses/{status_id}:

```
request:
{
  "status_id": int,
}

returns:

true
```

### Events

POST request to /events:

```
request:
{
  "title": "string",
  "states_id": int,
  "cities_id": int,
  "dog_parks_id": int,
  "address": "string",
  "date": "yyyy-mm-dd",
  "start_time": "string",
  "end_time": "string",
  "description": "string",
  "picture": "string",
  "account_id": int
}

returns:
{
  "id": 1,
  "title": "Pawsome Meetups for Pawesome Dogs!",
  "states_id": "California",
  "cities_id": "Los Angeles",
  "dog_parks_id": "Arts District Dog Park",
  "address": "123 Main St.",
  "date": "2023-03-09",
  "start_time": "10:00",
  "end_time": "12:00",
  "description": "The upcoming dog party is set to be a paw-some affair, with a variety of activities for dogs and their owners to enjoy.",
  "picture": "https://www.kirbybuilt.com/media/catalog/category/Kirby%20Banner%20Images4.jpg",
  "account_id": 1
}
```

GET request to /events:

```

returns:
[
  {
    "id": 1,
    "title": "Pawsome Meetups for Pawesome Dogs!",
    "states_id": "California",
    "cities_id": "Los Angeles",
    "dog_parks_id": "Arts District Dog Park",
    "address": "123 Main St.",
    "date": "2023-03-09",
    "start_time": "10:00",
    "end_time": "12:00",
    "description": "The upcoming dog party is set to be a paw-some affair, with a variety of activities for dogs and their owners to enjoy.",
    "picture": "https://www.kirbybuilt.com/media/catalog/category/Kirby%20Banner%20Images4.jpg",
    "account_id": 1
  }, ...
]
```
