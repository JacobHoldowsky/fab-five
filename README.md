# Fab Five

Fab Five is the center for immersing oneself in the world the athletes one loves. Users can build teams with their favorite players and see how their teams stack up against other teams.  Users can also post images with captions of their favorite athletes. The picture posting funtionality results in a collage-like collection of images for each athlete. On the splash page, one can scroll from one exciting view to the next as all player images are mixed together.

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

<img width="1440" alt="Screen Shot 2022-04-14 at 1 06 11 PM" src="https://user-images.githubusercontent.com/52753308/163438675-53c84a1f-8f6a-42a9-aeef-490c22a49b91.png">

<img width="1440" alt="Screen Shot 2022-04-14 at 1 06 27 PM" src="https://user-images.githubusercontent.com/52753308/163438715-1d8d289d-2a55-4c8d-8619-701570929f8a.png">

## Post Detail

<img width="1440" alt="Screen Shot 2022-04-14 at 1 08 50 PM" src="https://user-images.githubusercontent.com/52753308/163439060-9bf4b259-6edc-4b2b-b7cb-e584960bbf19.png">

<img width="1440" alt="Screen Shot 2022-04-14 at 1 09 16 PM" src="https://user-images.githubusercontent.com/52753308/163439123-31acc581-3433-4859-95e6-9e4526a05568.png">

## Teams feed

<img width="1440" alt="Screen Shot 2022-04-14 at 1 09 52 PM" src="https://user-images.githubusercontent.com/52753308/163439185-fbd0543d-cd65-4e12-b858-13bf7b5a0132.png">

<img width="1440" alt="Screen Shot 2022-04-14 at 1 10 19 PM" src="https://user-images.githubusercontent.com/52753308/163439275-40034d53-965a-452b-93df-34f83068c8c7.png">

## Team Detail

<img width="1440" alt="Screen Shot 2022-04-14 at 1 11 07 PM" src="https://user-images.githubusercontent.com/52753308/163439408-4a96ddcd-713d-4bcf-8458-3646ec1a2836.png">

<img width="1440" alt="Screen Shot 2022-04-14 at 1 12 08 PM" src="https://user-images.githubusercontent.com/52753308/163439612-465101f9-4dc7-453e-b154-1fe5434926ea.png">

## Player Detail

<img width="1440" alt="Screen Shot 2022-04-14 at 1 13 01 PM" src="https://user-images.githubusercontent.com/52753308/163439781-11ab6cf8-73e8-4ac2-9bc6-a224029c609d.png">

<img width="1440" alt="Screen Shot 2022-04-14 at 1 13 15 PM" src="https://user-images.githubusercontent.com/52753308/163439803-40c030d7-abbd-4182-956a-fb3a507f6fab.png">

## User Profile

<img width="1440" alt="Screen Shot 2022-04-14 at 1 16 22 PM" src="https://user-images.githubusercontent.com/52753308/163440244-61cdcc1b-8724-406c-8c46-0ee1074c9cae.png">

<img width="1440" alt="Screen Shot 2022-04-14 at 1 16 35 PM" src="https://user-images.githubusercontent.com/52753308/163440277-ff4887db-1c57-477d-a305-ecddae3f9d87.png">

# Developer's thoughts moving forward

I see so much potential in this website. I can see the implementation of head-to-head functionality in which one team can "play" against another team. The game would be simulated based upon statistical analysis of each team's ratings. The next step would be to implement a league mode in which a schedule would be created for a number of teams to play each other, ultimately ending with one team winning the championship.

## Getting started

1. Clone this repository (only this branch)

      - `git clone git@github.com:JacobHoldowsky/fab-five.git`

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
