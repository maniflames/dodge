/// <reference path="typings/index.d.ts" />
import GameObject from './GameObject'
import Player from './Player'
import Tunnel from './Tunnel'
import Wall from './Wall';

export default class Game {
    private static _object : Game = new Game()
    private STATE_INIT : string = "init" //not static because the assignment of static values to non-static values
    private STATE_NOT_INIT : String = "something" //doesn't go right for some reason :/ 
    private _state : String | null
    private _renderer : THREE.WebGLRenderer  = new THREE.WebGLRenderer()
    private _scene : THREE.Scene = new THREE.Scene() 
    private _camera : THREE.PerspectiveCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    private _player : Player | null
    private _tunnel : Tunnel | null
    private _wall : Wall | null

    public static getGame() : Game {
        return Game._object; 
    }

    public getScene() : THREE.Scene {
        return this._scene; 
    }

    private constructor() { 
        this._state = this.STATE_INIT
        //cannot GameObjects here, cannot get Scene from Game because it doesn't exist yet
        //but yeah singleton life 
        this._player = null  
        this._tunnel = null
        this._wall = null

        let pointLight = new THREE.PointLight( 0xff0000, 1, 100 );
        pointLight.position.set( 0, 0, 6 );
        this._scene.add( pointLight );  

        this._camera.position.z = 5
        this._renderer.setSize(window.innerWidth, window.innerHeight)
        document.body.appendChild(this._renderer.domElement)

        requestAnimationFrame(() => this._gameloop())
    } 

    private _init() {
        this._state = this.STATE_NOT_INIT
        this._player = new Player()
        this._tunnel = new Tunnel()
        this._wall = new Wall()
    }

    private _gameloop() {
        if(this._state === this.STATE_INIT) {
            this._init()
        }

        //should prob just make an array with all gameobjects and call update
       if(this._player){
           this._player.update()
        }

        if(this._tunnel) {
            this._tunnel.update()
        }

        if(this._wall){
            this._wall.update()
        }
           
        this._renderer.render(this._scene, this._camera)
        requestAnimationFrame(() => this._gameloop())
    }
}