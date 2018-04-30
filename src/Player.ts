/// <reference path="typings/index.d.ts" />
import GameObject from './GameObject'

export default class Player extends GameObject {
    constructor(){
        super(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial())
    }

    public update() : void {  
        this._mesh.rotation.x += 0.01 
    }
}