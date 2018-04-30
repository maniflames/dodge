/// <reference path="typings/index.d.ts" />
import GameObject from './GameObject'

export default class Tunnel extends GameObject {
    constructor() {
        super(new THREE.CylinderGeometry(10, 5, 40, 32, 1, true), new THREE.MeshLambertMaterial())
        this._mesh.material.side = THREE.BackSide
        this._mesh.position.z = -5
        this._mesh.rotation.x = 1.5 
    }

    public update() : void {
        //probably some awesome color changing stuff in the future? 
    }
}