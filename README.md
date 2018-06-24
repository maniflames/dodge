# Dodge
The rules are simple: dodge unless you don't have to ...

play: [dodge.imanidap.nl](https://dodge.imanidap.nl)

## Installation
To install the game locally clone the repo (if you want to make changes don't forget to fork)

```
git clone https://github.com/maniflames/dodge.git 
```

I kinda assume you have the LTS of [nodejs](https://nodejs.org/) installed. 
To run the game: 
```
npm start
```

If you change anything within the ```/src``` code, webpack will recompile the code & restart the server for you. 

Installation complete 🔥!

## Changing the Game
If you want to make changes and enjoy the dev environment that is already present in this repo (webpack + hot reload) make sure install webpack globally.
```
npm install webpack -g 
```

To start the dev mode run
```
npm run dev
```

## UML
This is a visual representation of the game:
![Dodge UML](https://assets.imanidap.nl/dodge/dodge_uml.png)

## Design Patterns
This repo is part of the course `CMGTPRG-08`. One of the challenges was to include certain object oriented design patterns into the game. 

### Singleton
An example of the use of a singleton is ```Game```:

```typescript
    export default class Game {
        //code

        private constructor() {
            console.count("[Game] Game construct!")

            const pointLight = new THREE.PointLight(0xffffff, 1, 100, 2);
            pointLight.position.set(0, 0, 50)
            this._scene.add(pointLight)

            this._camera.position.z = 50
            this.renderer.setSize(window.innerWidth, window.innerHeight)
            document.body.appendChild(this.renderer.domElement)

            requestAnimationFrame(() => this.gameloop())
        }

        public static getGame(): Game {
            if (!Game._object) {
                Game._object = new Game()
            }

            return Game._object;
        }

        //code
    }
```
This allows me to access the game from anywhere but make sure that there is only one instance of Game. 

### Polymorphism
#### inheritance
Since a lot of objects in the game should have a few basic properties & functionalities I have made a ```GameObject``` class.
```Wall```, ```Player``` & ```Tunnel`` all extend GameObject. An example with Player: 

```typescript
    export default class Player extends GameObject {
        //code
    }
```

This allows me to store all objects that inherit ```GameObject``` that appear in the game in one array in the ```Game``` class. 

```typescript
    export default class Game {
        private _gameObjects: Array<GameObject> = new Array<GameObject>()
        
        //code

        public addGameObject(object: GameObject): void {
            this._gameObjects.push(object)
        }

        public removeGameObject(target: GameObject): void {
            let index = this._gameObjects.indexOf(target)
            this._gameObjects.splice(index, 1)
        }
    }
```

This allows my to update all GameObjects in ```GamePlay``` with just three lines:
```typescript
    for (let obj1 of this.game.gameObjects) {
            obj1.update()
    }
```

#### type guard
In order to check whether the player has touched a wall in ```GamePlay``` I check the type of the objects:
```typescript
    for (let obj1 of this.game.gameObjects) {
        obj1.update()
        
        for (let obj2 of this.game.gameObjects) {
            if(obj1 instanceof Player && obj2 instanceof Wall){
                if(this.checkCollision(obj1, obj2)) {
                    this.colorManager.unsubscribe(obj2)
                    document.removeEventListener('keydown', this.pauseKeyCb)
                    obj1.remove()
                    this.game.gameStateManager.state = new GameOver()
                }    
            }
        }
    }
```


### Strategy
*wall animations*
The animations of the wall are implemented with the strategy pattern. 
Every ```Wall``` has a property animation which is an implementation of the interface ```WallAnimation```.

```typescript
    export default interface WallAnimation {
        wall: Wall 
        update(): void 
    }
```

```typescript
    export default class Wall extends GameObject implements ColorListener {
        private _animation: WallAnimation

        public get animation(): WallAnimation {
            return this._animation
        }

        public set animation(animation: WallAnimation) {
            this._animation = animation
        }

        //code
    }
```

The animation of a wall is decided during runtime in ```LevelGenerator```
```typescript
    private addWall(): void {
        let wall = new Wall(this.colorManager.color)
        let animation: WallAnimation
        
        const n = Math.floor(Math.random() * 4)
        switch (n) {
            case 0:
                animation = new WallAnimationLeft(wall)
                break

            case 1:
                animation = new WallAnimationRight(wall)
                break

            case 2:
                animation = new WallAnimationLeft(wall, false)
                break

            case 3:
                animation = new WallAnimationRight(wall, false)
                break

            default:
                animation = new WallAnimationLeft(wall)
                break
        }

        wall.animation = animation
    }
```

In some cases the wall animation even changes during runtime. For example: a ```Wall``` with ```WallAnimationLeft``` switches to ```WallAnimationRight``` by assigning the new animation to animation property of ```Wall```.

```typescript 
    export default class WallAnimationLeft implements WallAnimation {
        //code 
        public depthAnimation(): void {
            if(this.wall.position.z < this.wall.maxDistance) {
                this.wall.position.z += 0.1
            } else if(this.endPositionX && this.wall.position.z >= this.wall.maxDistance) {
                this.wall.animation = new WallAnimationRight(this.wall, false, this.wall.position.x)
            }
        }
        //code
    }
```

### Observer
*Colormanager*
To make the game more interesting and improve the aesthetic I thought it would be fun to change the colors every once in a while. 
To do this I've created two interfaces:
 ```IColorManager```
 ```typescript
    export default interface IColorManager {
       subscribe(object: ColorListener): void
       unsubscribe(object: ColorListener): void
       changeColor(): void
    }
 ```

 ```ColorListener```
```typescript
    export default interface ColorListener {
        onColorChange(color: THREE.Color): void
    }
```

The ```ColorManager``` implements ```IColorManager``` and acts as the subject in this pattern. 
```typescript
    export default class ColorManager implements IColorManager {
        //code
        
        public changeColor(): void {
            let color = this.generateColor()
            for (let listener of this.colorListeners) {
                this._color = color
                listener.onColorChange(color)
            }
        }
    }
```

Both ```Wall``` and ```Tunnel``` implement ```ColorListener``` and are the observers in this pattern. 
```typescript
    export default class Tunnel extends GameObject implements ColorListener {
        //code
        
        public onColorChange(color: THREE.Color): void {
            let material = this.mesh.material as THREE.MeshLambertMaterial
            material.color = color;
        }
    }
```

```LevelGenerator``` makes sure that if the difficulty of the game goes up the color changes as well: 
```typescript 
    private checkDifficultyUpdate(): void {
        if(this.game.score >= this.targetScore) {
            console.log('update dificulty')
            this.difficulty++
            this.targetScore = this.calculateNextTargetScore()
            this.colorManager.changeColor()
        }
    }
```

## Gameplay components
The coolest thing about this course is that you are allowed to make anything you want. Implementing some extra's is rewarded so here is the stuff that makes this game really cool 😸.

### Canvas 
Even though I do use DOM elements for creating the menu UI, the actual game is build inside of a canvas. 

### External library: Three.js
This game is built with Three.js, an external library that makes it easier to work with WebGL. 

## Contributers 
Thank you for the pull request [@sven-zo](https://github.com/sven-zo)! 🎉

## My Contributions
The course also includes helping each other out by doing a pull request & a peer review. 

### Pull Request
I made a [pull request](https://github.com/sven-zo/iv/pull/1) on the game [iv](https://github.com/sven-zo/iv) by [@sven-zo](https://github.com/sven-zo).
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

### Peer Review
I have [peer reviewed](https://github.com/BrandonYuen/PRG01-8_Game/issues/3) a game from [@BrandonYuen](https://github.com/BrandonYuen). 
Right now the repository is private but I've done the following:
- Check which OOP patterns have been implemented so far
- The implementation of the OOP patterns that were implemented are correct 
- Check if gameplay components or other cool stuff is implemented

