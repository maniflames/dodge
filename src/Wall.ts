/// <reference path="typings/index.d.ts" />
import GameObject from './GameObject'

export default class Wall extends GameObject {
    _widthdrawing : boolean
    _startPositionX : number = -15
    _endPositionX : number

    constructor(){
        super(new THREE.BoxGeometry(10, 20, 1), new THREE.MeshLambertMaterial())
        this._mesh.position.set(this._startPositionX, 0, -20)
        this._endPositionX = -5
        this._widthdrawing = false
    }

    private _depthAnimation() : void {
        //TODO: decide
        //should I give access to the player position (z) so there are no mistakes that can be made?
        //(if you compare this with a distance greater that 10 a wall will never hit the player)
        if(this._mesh.position.z < this._game.getCamera().position.z - 8){
            this._mesh.position.z += 0.1
        } else {
            this._widthdrawing = true
            this._widthdrawAnimation()
        }
    }

    private _insertAnimation() : void {
        if(this._mesh.position.x <= this._endPositionX && this._widthdrawing == false){
            this._mesh.position.x += 0.05 
        } 
    }

    private _widthdrawAnimation() : void {
        this._mesh.position.x -= 0.2

        if(this._mesh.position.x < this._startPositionX){
            this._game.removeGameObject(this)
        }    
    }

    update() : void {
        this._insertAnimation()
        this._depthAnimation()
    }
}