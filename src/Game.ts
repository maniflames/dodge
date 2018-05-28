/// <reference path="typings/index.d.ts" />
import GameObject from './GameObjects/GameObject'
import Player from './GameObjects/Player'
import Tunnel from './GameObjects/Tunnel'
import Wall from './GameObjects/Wall/Wall'
import Level from './Level'
import Screen from './UI/Screen'
import StartScreen from './UI/StartScreen'
import EndScreen from './UI/EndScreen'
import ScoreDisplay from './UI/ScoreDisplay'

export default class Game {
    private static _object: Game;
    private STATE_INIT: string = "init" //not static because the assignment
    private STATE_INIT_DONE: string = "init_done" //happens in game constructor as well
    private STATE_PLAYING: string = "playing"
    private STATE_PAUSE: string = "pause"
    private STATE_OVER: string = "game_over"
    private _state: string | null
    private _renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer()
    private _scene: THREE.Scene = new THREE.Scene()
    private _camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    private _gameObjects: Array<GameObject> = new Array<GameObject>()
    private _level: Level | null
    private _screen: Screen | null
    private _scoreDisplay: ScoreDisplay | null

    public static getGame(): Game {
        if (!Game._object) {
            Game._object = new Game()
        }

        return Game._object;
    }

    public get scoreDisplay() { return this._scoreDisplay }

    public getCamera(): THREE.Camera {
        return this._camera;
    }

    public getScene(): THREE.Scene {
        return this._scene;
    }

    private constructor() {
        console.count("[Game] Game construct!")
        this._state = this.STATE_INIT
        this._level = null
        this._screen = null
        this._scoreDisplay = null

        // let pointLight = new THREE.PointLight(0xff0000, 1, 100)
        const pointLight = new THREE.PointLight(0xff0000, 1, 100, 2);
        pointLight.position.set(0, 0, 50)
        this._scene.add(pointLight)

        this._camera.position.z = 50
        this._renderer.setSize(window.innerWidth, window.innerHeight)
        document.body.appendChild(this._renderer.domElement)

        requestAnimationFrame(() => this._gameloop())
    }

    private _init() {
        this._screen = new StartScreen()
        this._scoreDisplay = new ScoreDisplay()
        this.addGameObject(new Tunnel())
        this._state = this.STATE_INIT_DONE
    }

    private _gameloop() {
        if (this._state === this.STATE_INIT) {
            this._init()
        }

        //TODO: check if the game the game state is "playing.." 
        //this would be cool because the only thing that has to happen is that this 
        //and the objects in the gameobjects array will stop during pause
        if (this._level && this._state === this.STATE_PLAYING) {
            this._level.update()
        }

        for (let object of this._gameObjects) {
            if (this._state === this.STATE_PLAYING) {
                object.update()
            }

            //Logic behind collision should be refactored to a seperate function
            //TODO: refactor into something pretty
            if (object instanceof Player) {
                for (let otherObject of this._gameObjects) {
                    if (otherObject instanceof Wall) {

                        let boxObj = object.getBoundingBox()
                        let boxOthObj = otherObject.getBoundingBox()

                        if (boxObj.intersectsBox(boxOthObj)) {
                            object.die()
                        }
                    }
                }
            }
        }

        this._renderer.render(this._scene, this._camera)
        requestAnimationFrame(() => this._gameloop())
    }

    public playGame() {
        this.addGameObject(new Player())
        this._level = new Level(1)
        this._state = this.STATE_PLAYING
    }

    //TODO: checkout why walls aren't always removed properly
    public gameOver() {
        this._state = this.STATE_OVER
        for (let object of this._gameObjects) { 
            if (object instanceof Wall) {
                this.removeGameObject(object)
            }
        }

        console.log(this._gameObjects); 
        this._screen = new EndScreen()
    }

    public addGameObject(object: GameObject): void {
        this._gameObjects.push(object)
    }

    public removeGameObject(target: GameObject): void {
        for (let object of this._gameObjects) {
            if (target === object) {
                let index = this._gameObjects.indexOf(target)
                this._gameObjects.splice(index, 1)
                target.remove()
            }
        }
    }
}
