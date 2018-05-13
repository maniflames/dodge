/// <reference path="typings/index.d.ts" />
import GameObject from './GameObject'
import Player from './Player'
import Tunnel from './Tunnel'
import Wall from './Wall';
import Level from './Level';

export default class Game {
    private static _object : Game;
    private STATE_INIT : string = "init" //not static because the assignment of static values to non-static values
    private STATE_NOT_INIT : string = "something" //doesn't go right for some reason :/ 
    private _state : string | null
    private _renderer : THREE.WebGLRenderer  = new THREE.WebGLRenderer()
    private _scene : THREE.Scene = new THREE.Scene() 
    private _camera : THREE.PerspectiveCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000) 
    private _gameObjects : Array<GameObject> = new Array<GameObject>()
    private _level : Level | null

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
        this._level = null

        let pointLight = new THREE.PointLight( 0xff0000, 1, 100 )
        pointLight.position.set( 0, 0, 50 )
        this._scene.add( pointLight ) 

        this._camera.position.z = 50
        this._renderer.setSize(window.innerWidth, window.innerHeight)
        document.body.appendChild(this._renderer.domElement)

        requestAnimationFrame(() => this._gameloop())
    } 

    private _init() {
        this._gameObjects.push(new Player(), new Tunnel())
        this._level = new Level(1)
        this._state = this.STATE_NOT_INIT
    }

    private _gameloop() {
        if(this._state === this.STATE_INIT) {
            this._init()
        }

        if(this._level){
            this._level.update()
        }

        for(let object of this._gameObjects){
            object.update()
            
            //Logic behind collision should be refactored to a seperate function
            if(object instanceof Player) {
                for (let otherObject of this._gameObjects) {
                    if(otherObject instanceof Wall) {

                        let boxObj = object.getBoundingBox()
                        let boxOthObj = otherObject.getBoundingBox()
                    
                        if(boxObj.intersectsBox(boxOthObj)) {           
                            object.die()
                        }
                    }
                }     
            }
        }
           
        this._renderer.render(this._scene, this._camera)
        requestAnimationFrame(() => this._gameloop())
    }

    public addGameObject(object : GameObject) : void {
        this._gameObjects.push(object)
    }
    
    public removeGameObject(target : GameObject) : void {
        for (let object of this._gameObjects) {
            if(target === object){
                let index = this._gameObjects.indexOf(target)
                this._gameObjects.splice(index, 1)
                target.remove()
            }
        }
    }
}