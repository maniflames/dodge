/// <reference path="typings/index.d.ts" />
import GameObject from './GameObject'

export default class Tunnel extends GameObject {
    constructor() {
        super(new THREE.CylinderGeometry(10, 10, 90, 32, 1, true), new THREE.MeshLambertMaterial())
        this._mesh.material.side = THREE.DoubleSide
        this._mesh.rotation.x = 1.57
    }

    public update() : void {
        //probably some awesome color changing stuff in the future? 
    }
}