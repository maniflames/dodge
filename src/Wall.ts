/// <reference path="typings/index.d.ts" />
import GameObject from './GameObject'

export default class Wall extends GameObject {
    constructor(){
        super(new THREE.BoxGeometry(7, 15, 1), new THREE.MeshLambertMaterial())
        this._mesh.position.set(-10, 0, -20)
    }

    private _depthAnimation() : void {
        if(this._mesh.position.z < 0){
            this._mesh.position.z += 0.03
        }
    }

    private _sideAnimation() : void {
        if(this._mesh.position.x <= -5){
            this._mesh.position.x += 0.05 
        } 
    }

    update() : void {
        this._sideAnimation()
        this._depthAnimation()
    }
}