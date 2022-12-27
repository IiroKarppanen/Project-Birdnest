# Reaktor pre-assigment

This project is my implementation for the [Reaktor pre-assigment](https://assignments.reaktor.com/birdnest/?_gl=1*ar90ta*_ga*MTcyODI2MDgxNi4xNjcwODQ0NTA5*_ga_DX023XT0SX*MTY3MDg0NDUwOS4xLjEuMTY3MDg0NDU2My42LjAuMA).

You may visit the project at: https://ndz-perimeter.vercel.app/ 

# Project Breakdown

2 folders: <br />
Client -> Frontend made with ReactJs, Hosted with [Vercel](https://vercel.com) <br />
Server -> Backend made with Nodejs, Hosted with [Render](https://render.com/)

On server side, I have created a function that is constantly fetching xml data from the [api](https://assignments.reaktor.com/birdnest/drones), which is then converted into a javascript object with the help of xml2js package. The function maps the object and finds the drones that are inside the "no drone zone", if a drone is inside the ndz, another request is made to get pilot data and then it's saved to mongoDB database that contains all violators from past 10 minutes.

I have used socket.io to set up a socket between the React frontend and Nodejs backend that constantly sends the data of all drones and pilot data of violators to React frontend.

<br />
<br />

<img width="1080" alt="table" src="https://user-images.githubusercontent.com/39335935/209678189-d421006c-1e0a-4ffd-9ef6-541f06ecc915.png">

<br />
<br />

<img width="1080" alt="map" src="https://user-images.githubusercontent.com/39335935/209678203-b3453fde-9662-4ee6-b19e-eca490e84a22.png">
