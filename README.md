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

Click this link (or paste it into your web browser) for a visual overview of the application's design: https://i.ibb.co/Xs0y98s/Screen-Shot-2023-03-08-at-3-55-47-PM.png

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
