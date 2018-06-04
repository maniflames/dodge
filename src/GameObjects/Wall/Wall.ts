/// <reference path="../../typings/index.d.ts" />
import GameObject from '../GameObject'
import WallAnimation from './Animations/WallAnimation'

//TODO: change the way you pass the strategy to the default way and at a default 'still' animation 
//      passing the wall to the animation will be a lot less hacky and is the correct way of using the pattern anyway
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
        //TODO: Change this!!
        this._animation.update(this)
    }
}