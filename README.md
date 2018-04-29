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
To modify the game and create your own version:

```
npm build
```

THIS IS NOT NEEDED IF WEBPACK-DEV-SERVER-WORKS!!!!!!

To run the the game locally, host put files from the docs folder on a server.
I like the http-server package, but XAMPP or MAMP will work just fine. 

```
npm install -g http-server
cd docs
http-server . 
```

Remove the .travis.yml 

installation complete 🔥

## UML
This is an overview of what the game looks like: 
*insert UML*

##Design Patterns
This repo is part of the course CMGTPRG-08. One of the challenges was to include certain design patterns into the game. 

### Singleton
*gameobject or threejs renderer*

### Polymorphism
*I'll see lololol*

### Strategy
*hahah*

### Observer
*...*

## Gameplay components
The coolest thing about htis course is that you are allowed to make anything you want. Some extra's are rewared so here is the stuff that makes this game really coolw 😸.

### Canvas 
Even though I do use DOM elements for the menus, the actual game is build inside of a canvas. 

### External library: Three.js
I've used Three.js, an external library that makes it easier to work with WebGL, to create the game in 3D. 

## Contributers 
Thanks ____ for the pull request! 🎉

## My contributions
The course also includes helping each other out by doing a pull request & a peer review. 
[pull request](http://404.com/)
[peer review](http://404.com/)


