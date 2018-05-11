/// <reference path="typings/index.d.ts" />
import GameObject from './GameObject'
import Player from './Player'
import Tunnel from './Tunnel'
import Wall from './Wall';

export default class Game {
    private static _object : Game;
    private STATE_INIT : string = "init" //not static because the assignment of static values to non-static values
    private STATE_NOT_INIT : String = "something" //doesn't go right for some reason :/ 
    private _state : String | null
    private _renderer : THREE.WebGLRenderer  = new THREE.WebGLRenderer()
    private _scene : THREE.Scene = new THREE.Scene() 
    private _camera : THREE.PerspectiveCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000) 
    private _gameObjects : Array<GameObject> = new Array<GameObject>()

    public static getGame() : Game {
        if(! Game._object){
            Game._object = new Game()
        }

        return Game._object;         
    }

    public getCamera() : THREE.Camera {
        return this._camera;
    }

    public getScene() : THREE.Scene {
        return this._scene; 
    }

    private constructor() { 
        this._state = this.STATE_INIT

        let pointLight = new THREE.PointLight( 0xff0000, 1, 100 )
        pointLight.position.set( 0, 0, 50 )
        this._scene.add( pointLight ) 

        this._camera.position.z = 50
        this._renderer.setSize(window.innerWidth, window.innerHeight)
        document.body.appendChild(this._renderer.domElement)

        requestAnimationFrame(() => this._gameloop())
    } 

    //this function could be a communication point for an external level class
    //but I could use an observer pattern an notify the game about the new level 
    //& about the objects that should be inserted or removed from the game
    private _init() {
        this._gameObjects.push(new Player(), new Tunnel(), new Wall())
        this._state = this.STATE_NOT_INIT
    }

    private _gameloop() {
        if(this._state === this.STATE_INIT) {
            this._init()
        }

        for(let object of this._gameObjects){
            object.update()
        }
           
        this._renderer.render(this._scene, this._camera)
        requestAnimationFrame(() => this._gameloop())
    }
}