# Reaktor pre-assigment

This project is my implementation for the [Reaktor pre-assigment](https://assignments.reaktor.com/birdnest/?_gl=1*ar90ta*_ga*MTcyODI2MDgxNi4xNjcwODQ0NTA5*_ga_DX023XT0SX*MTY3MDg0NDUwOS4xLjEuMTY3MDg0NDU2My42LjAuMA).

You may visit the project at: https://ndz-perimeter.vercel.app/ 

# Project Breakdown

2 folders: <br />
Client -> Frontend made with ReactJs, Hosted with [Vercel](https://vercel.com) <br />
Server -> Backend made with Nodejs, Hosted with [Render](https://render.com/)

On server side, drone data is fetched from the [api](https://assignments.reaktor.com/birdnest/drones) with the help of request and xml2js libraries. If the drone is inside the no drone zone, another request is made to get the pilot data and then it's saved to mongodb database that contains all the violators from past 10 minutes. 

I have used socket.io library to set up a socket between the React frontend and Nodejs backend that constantly sends the data of all drones and pilot data of violators to React frontend.

<br />
<br />

<img width="1080" alt="thepage" src="https://user-images.githubusercontent.com/39335935/209451111-8e5dc41b-0487-4bce-845c-7145ee31bc0e.png">