# UR Class Finder

A proposed class finder tool for University of Richmond classes, built using Angular 6 with a <a href="https://github.com/jack-ditto/UR-Class-Finder-Flask-API">Flask backend</a>


## Background
I built this tool because I was learning the Angular Javscript framework at the time and it seemed like a great application for a tool that I know would make many students' lives easier (including my own). This repo contains the Angular portion of the application and the Flask backend portion <a href="https://github.com/jack-ditto/UR-Class-Finder-Flask-API">can be found here.</a>


## How does it work? 
The website allows a user to search the class catalog for the University of Richmond and select sections of a class that they would like to take, similair to adding items to a shopping cart. 

<img width="500" alt="Screen Shot 2021-05-16 at 12 29 22 AM" src="https://user-images.githubusercontent.com/31874647/118385646-ca84cc80-b5de-11eb-8385-aa45528757b5.png">

After adding classes, the user can then go to their planner and generate a list of the most optimal schedules that include the classes they selected. 

<img width="500" alt="Screen Shot 2021-05-16 at 12 37 56 AM" src="https://user-images.githubusercontent.com/31874647/118385661-f99b3e00-b5de-11eb-91a4-6ea5684e2879.png">

<img width="500" alt="Screen Shot 2021-05-16 at 12 38 49 AM" src="https://user-images.githubusercontent.com/31874647/118385671-19326680-b5df-11eb-8fb5-7d73dccaf26b.png">

The user has the option to run the algorithm for finding the best schedule with only the _sections_ they selected, or with the default option of finding schedules with the selected _classes_. 

## The Algorithm

The algorithm I chose to use for this was the Bron–Kerbosch Maximal Clique finding algorithm. This problem breaks down into an interval scheduling maximization problem (ISMP), and at the end of the day it is an NP-Hard problem. 

## Some things I would (and may still) do differently

There are many things I would change about this project with the knowledge I have today. 
- The "Database" is an excel spreadsheet. Obviously this isn't the most efficient technique for storing and serving data. 
- The algorithm is implemented client side in Typescript in the Angular application. If I did this again all of the grunt work would be done server-side. 
- Angular is a pretty heavy framework for such a simple application. I was learning it at the time, but I could build the same application now with React.js and it would be much smaller and manageable. 

And I am sure there are many other changes I would make. When I have time I am going to completely rebuild this project, but I thought I would still share it for inspiration!
