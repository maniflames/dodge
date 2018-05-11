/// <reference path="typings/index.d.ts" />
import GameObject from './GameObject'
import Game from './Game'

export default class Player extends GameObject {
    mouse : THREE.Vector2 = new THREE.Vector2();
    raycaster : THREE.Raycaster = new THREE.Raycaster(); 
    game : Game = Game.getGame()

    constructor(){
        super(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial())
        this._mesh.position.z = this.game.getCamera().position.z - 6
    5;
        window.addEventListener('mousemove', (e) => {this._traceMouse(e) }); 
    }

    private _traceMouse(e : MouseEvent) : void {
        console.log(e.x + " " + e.y);

        // normalized mouse coordinates
        // https://threejs.org/docs/#api/core/Raycaster

        // What I want to do is map canvas coordinates to world coordinates.
        // Since I don't have to move with the depth z can be completely igmnored
        // Everyting is based on the tunnel, which has a radius of 10 and is positioned at 0.0 with a rotation
        // even though the radius is 10 the in screen mapping can differ depeding on the current camera - player distance & the current screen with/height the max is 10
        // remember that the coordinate 10 is not on screen as well. the top  & bottom are closer than the sides of the tunnel (not sure why tbh, it's probably the presepective)
        //0,0 of the browser is upperleft that should be in te middle
        //(((width/height)/2) * 10)
        let canvasToWorld = ((window.innerWidth/window.innerHeight)/2) * 7;

        this.mouse.x = (e.x / window.innerWidth) * 2 - 1; 
        this.mouse.y = - (e.y / window.innerHeight)  * 2 + 1;

        // console.log(this.mouse.x + " " + this.mouse.y); 


        this._mesh.position.x = this.mouse.x * canvasToWorld; 
        this._mesh.position.y = this.mouse.y * ((window.innerWidth/window.innerHeight)/2) * 3.8; 

        // this._mesh.position.x = 2.2
        // this._mesh.position.y = 0

        // this.raycaster.setFromCamera(this.mouse, this.game.getCamera())
    }

    public update() : void {  
        this._mesh.rotation.x += 0.01 
    }
}