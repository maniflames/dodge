/// <reference path="typings/index.d.ts" />
import GameObject from './GameObject'

export default class Game {
    private static _object : Game = new Game()
    private _renderer : THREE.WebGLRenderer  = new THREE.WebGLRenderer()
    private _scene : THREE.Scene = new THREE.Scene() 
    private _camera : THREE.PerspectiveCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    //TODO: change to Player when there is a player class and set to new Player 
    private _player : GameObject | null;

    public static getGame() : Game {
        return Game._object; 
    }

    public getScene() : THREE.Scene {
        return this._scene; 
    }

    public getPlayer() : GameObject | null {
        return this._player; 
    }

    public setPlayer(player : GameObject) : void {
        this._player = player; 
    }

    private constructor() { 
        this._player = null;
        this._renderer.setSize(window.innerWidth, window.innerHeight)
        document.body.appendChild(this._renderer.domElement)

        requestAnimationFrame(() => this._gameloop())
    } 

    private _gameloop() {
        //remove if statement below when there is a player class
        if(this._player){
            this._player.update()
        }
        
        this._camera.position.z = 5

        this._renderer.render(this._scene, this._camera)
        requestAnimationFrame(() => this._gameloop())
    }
}