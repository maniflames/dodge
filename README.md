# Dodge
The rules are simple: dodge unless you don't have to ...
Play: [dodge.imanidap.nl](https://dodge.imanidap.nl)

## Installation
To install the game locally clone the repo

```
git clone *insert url* 
```

I kinda assume you have [node](https://nodejs.org/) installed. 
To run the game: 
```
npm start
```

If you change anything within the ```/src``` code, webpack will recompile the code & restart the server for you. 

Installation complete 🔥!

## UML
This is an overview of what the game looks like: 
*insert UML*

## Design Patterns
This repo is part of the course `CMGTPRG-08`. One of the challenges was to include certain design patterns into the game. 

### Singleton
*GameObject*

### Polymorphism
*Updating gameobjects in gameloop*
inheritance / interface
type assertion
type guards

### Strategy
*being able to move the player y/n*
*screen state*

### Observer
*level change (faster moving gameobjects)*

## Gameplay components
The coolest thing about this course is that you are allowed to make anything you want. Implementing some extra's is rewarded so here is the stuff that makes this game really cool 😸.

### Canvas 
Even though I do use DOM elements for creating the menu UI, the actual game is build inside of a canvas. 

### External library: Three.js
This game is built with Three.js, an external library that makes it easier to work with WebGL. 

## Contributers 
Thanks @sven-zo for the pull request! 🎉

## My contributions
The course also includes helping each other out by doing a pull request & a peer review. 

### Pull Request
I made a [pull request](https://github.com/sven-zo/iv/pull/1) on the iv by @sven-zo.
He already created a level generator that created stairs of a random number of cubes. 
I already knew the game is a sequel to iii, the game he made in his first year. 
That's why I decided to put in the player and make him run, jump or die depending on the situation. 

#### Player
The player has the shape of the letter i in roboto-italic. In order to create the player I had to load the font. 
There already was a resource loader but it only supported music. 
I implemented support for fonts as well & decided to create a parent class ```Resource``` that contains values every resource should have.
The main reason I decided to do this is to avoid duplicate code in the ```Music``` and ```Font``` class.

#### Player Behaviour
I gave the player its own class because you should be able to do everything concerning the player in one place. 
I decided to implement the player movement/status with the strategy pattern. This is because the movement of the player is dependent on situations in runtime. I've created the interface ```Behaviour``` and the classes ```Run```, ```Jump``` and ```Die``` to be able to perform the strategy pattern. 

#### Player Collision
As a final addition I wanted to implement the collision detection between a player and a one of the generated cubes. 
My first strategy was to put bounding boxes around the objects in the game and check whether the player hit a cube. 
If that is the case then check if lower face of the player hit the upper face of the cube. 

I created a ```GameObject``` class that has all the functionality any object in the game should have. I added the logic of the collision in the level since that is the first class in the composition that knows both the player and the cube.

Unfortunately because of the speed that the player moves on the y-axis collision could not be detected. The points that could be detected if I checked for collision with a segment on the y-axis rather than a point were way too high or way too low. 

I decided to try the detection of the player and the upper face of a cube again by drawing an arc that aligns to the jump and predict where the player would collide. If the arc intersects with the upper face of the cube the player should stop jumping on that point and switch to running behaviour. 

That seemed to work when jumping upwards. As soon as a player needs to fall this doesn't work because the arc isn't long enough. 

#### Folder Structure
Because I have the tendency to separate as much logic as possible I create folders to structure the classes. 
I put all the classes that have the same parent into the same folder. I put the behaviour in the player class since the logic within that class is built specifically for a player. 


[peer review](http://404.com/)


