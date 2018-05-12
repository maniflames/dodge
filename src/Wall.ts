/// <reference path="typings/index.d.ts" />
import GameObject from './GameObject'
import WallAnimation from './WallAnimation'
import WallAnimationLeft from './WallAnimationLeft' //this will eventually move to level 
import WallAnimationRight from './WallAnimationRight' //this will eventually move to level since level 

export default class Wall extends GameObject {
    private _maxDistanceFromCamera : number
    private _animation : WallAnimation

    public getPosition() : THREE.Vector3 {
        return this._mesh.position
    }

    public getMaxDistance() : number {
        return this._maxDistanceFromCamera
    }

    //this is where the strategy is passed
    constructor(){
        super(new THREE.BoxGeometry(10, 20, 1), new THREE.MeshLambertMaterial())
        //TODO: decide
        //should I give access to the player position (z) so there are no mistakes that can be made?
        //(if you compare this with a distance greater that 10 a wall will never hit the player)
        this._maxDistanceFromCamera = this._game.getCamera().position.z - 8

        // this will be put into level since all logic based on spawning should be decided over there too
        Math.random() > 0.5 ? this._animation = new WallAnimationRight() : this._animation = new WallAnimationLeft()
        
    }


    public update() : void {
        this._animation.update(this)
    }
}