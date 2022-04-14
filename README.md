# The Main Feed

Fab Five is the center for immersing oneself in the world the athletes they love. Users can build teams with their favorite players and see how their teams stack up against other teams.  Users can also post images with captions of their favorite athletes. Replete with images in a collage-like style of each athlete, one can scroll on their home feed from one exciting view to the next. Users will love adding pictures and seeing the page change form to adapt itself to the new image. All images remain a model of their original size, but remain centered in each row with the other pictures for a sweet, eye-candy experience. 

# Live Link

https://fab-five.herokuapp.com/

# Overview of technologies used

Fab Five is a blogging website built with Flask, SQLAlchemy, PostgresSQL, React and Redux.

## Backend

Flask - A very user friendly choice for backend development.
SQLAlchemy -  Makes interacting with the database a simpler process due to its intuitive style. 
PostgresSQL - Harmonious pair to SQLAlchemy 

## Frontend

React - Chosen for its lightening fast rendering as it only re-renders items that change in state.
Redux - Most state items were handled by redux, which helped keep all state necessities neat and organized.

# Screenshots of the Fab Five

## Posts feed (Splash Page)

![Screen Shot 2022-04-14 at 1 02 02 PM (2)](https://user-images.githubusercontent.com/52753308/163438115-346f5ec3-13d8-41ab-a738-c68e55c59450.png)

![Screen Shot 2022-04-14 at 1 02 19 PM (2)](https://user-images.githubusercontent.com/52753308/163438155-be65da98-0096-4a4b-ac26-1350b029ae8c.png)


## Post Detail

## ![Screen Shot 2022-03-28 at 10 22 33 AM](https://user-images.githubusercontent.com/52753308/160419246-9f71085e-cb01-4d6e-8f78-5008c87cb5a4.png)

## ![Screen Shot 2022-03-28 at 10 22 54 AM](https://user-images.githubusercontent.com/52753308/160419316-17dbf729-0dd1-48a7-8a99-b65378f4723e.png)

## User Profile

## ![Screen Shot 2022-03-28 at 10 23 21 AM](https://user-images.githubusercontent.com/52753308/160419409-d2680d60-f54a-4e74-b061-e7f485cca284.png)

# Developer's thoughts moving forward

This was a fun project to work on, and it really started to develop a flavor once images could be displayed as a model of their original sizes.  While this project is only the beginning of a venture that has the potential to be expanded in multiple demensions, this developer is very excited with the progress thus far. The plan at this moment is to add a search function to search for a particular team or athlete. Furthermore, I would like to list all athletes by last name.

## Getting started

1. Clone this repository (only this branch)

      - `git clone git@github.com:JacobHoldowsky/TheMainFeed.git`

2. Install backend dependencies

      - `pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt`

3. Create a **.env** file based on the example with proper settings for your
   development environment
   
4. Setup your PostgreSQL user, password and database and make sure it matches your **.env** file

5. Get into your pipenv, migrate your database, seed your database, and run your flask app
      
      - `pipenv shell`

      - 'flask db upgrade'

      - `flask seed all`

      - `flask run`

6. Install frontend dependencies

      - cd into react-app
      - run `npm install`

7. Start front end server

      - in react-app directory, run `npm start`
      - This should take you to localhost:3000, but you can also go there manually in your browser
