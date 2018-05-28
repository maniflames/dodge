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
_after I've fixed some issues_ 

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
[pull request](https://github.com/sven-zo/iv/pull/1)
[peer review](http://404.com/)


