/// <reference path="../typings/index.d.ts" />
import GameObject from '../GameObject'
import WallAnimation from './Animations/WallAnimation'

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
    constructor(animation : WallAnimation){
        super(new THREE.BoxGeometry(10, 20, 1), new THREE.MeshLambertMaterial())
        this._animation = animation
        //TODO: decide
        //should I give access to the player position (z) so there are no mistakes that can be made?
        //(if you compare this with a distance greater that 10 a wall will never hit the player)
        this._maxDistanceFromCamera = this._game.getCamera().position.z - 8
    }


    public update() : void {
        super.update()
        this._animation.update(this)
    }
}