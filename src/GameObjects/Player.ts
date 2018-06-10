/// <reference path="../typings/index.d.ts" />
import GameObject from './GameObject'
import Game from '../Game'

export default class Player extends GameObject {
    private _mouse: THREE.Vector2 = new THREE.Vector2()
    private _trackCb = (e: MouseEvent) => { this._traceMouse(e) }
    
    constructor() {
        super(new THREE.BoxGeometry(1.5, 1.5, 1.5), new THREE.MeshBasicMaterial({ color: 0x9cb3d8 }))
        this._mesh.position.z = this._game.getCamera().position.z - 10
        this.addMouseTracking()
    }

    //NOTE: I recently found an issue that discussed the math of finding the FOV
    //Using these calculations might enable me to place the player directly under the mouse no matter how big the screen
    //This would mean I have to implement collision between the player & the tunnel
    //Current calculations make it impossible to reach the tunnel in the first place
    //https://github.com/mrdoob/three.js/issues/1239
    private _traceMouse(e: MouseEvent): void {
        //normalized mouse coordinates
        //returns number between -1 & 1 representing position on screen 
        //where 0,0 is the middle
        //https://threejs.org/docs/#api/core/Raycaster
        this._mouse.x = (e.x / window.innerWidth) * 2 - 1
        this._mouse.y = - (e.y / window.innerHeight) * 2 + 1

        //the whole positioning of the game is based on the tunnel which has a radius of 10
        //the edges (y) of the tunnel on the current z index of the player are not 100% on screen 
        //the visibility of edges (x) of the tunnel depends on the width of the screen
        //the corners of the screen are not 100% available because the edge of the tunnel cuts them of on the current z index of the player
        let worldXEdge = 6
        let worldYEdge = 6

        //I am still not sure why but a transformation of specifically the screen width has a huge impact on player movement
        //it could be because of the calculations of the perspective camera since a higher width means that more of the world is shown to the player
        //for a viewport where x < 900px there need to be smaller world edges
        //NOTE: if I ever have some time left I could plot the desired edges of at certain viewport draw a graph and create a forumla for this
        //viewports are way easier for now :3 

        //TODO: find a way to refactor this if possible
        //not sure how yet, a switch only allows 1 value but there should be a prettier way out there to do this
        if (window.innerWidth <= 900 && window.innerWidth > 600) {
            worldXEdge = 5
        } else if (window.innerWidth <= 600 && window.innerWidth > 500) {
            worldXEdge = 3
        } else if (window.innerWidth <= 500 && window.innerWidth > 400) {
            worldXEdge = 2
        } else if (window.innerWidth <= 400 && window.innerWidth > 299) {
            worldXEdge = 1.5
        } else if (window.innerWidth < 300) {
            //TODO: 
            //device not supported, screen too small
            //exit game
        }

        this._mesh.position.x = this._mouse.x * worldXEdge
        this._mesh.position.y = this._mouse.y * worldYEdge
    }

    public addMouseTracking() {
        document.addEventListener('mousemove', this._trackCb)
    }

    public removeMouseTracking() {
        document.removeEventListener('mousemove', this._trackCb)
    }

    public remove(): void {
        this.removeMouseTracking()
        super.remove()
    }

    public update(): void {
        super.update()
    }
}
