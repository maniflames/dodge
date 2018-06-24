/// <reference path="../typings/index.d.ts" />
import GameObject from './GameObject'
import ColorListener from '../ColorManagement/ColorListener'

export default class Tunnel extends GameObject implements ColorListener {
    constructor(color: THREE.Color) {
        super(new THREE.CylinderGeometry(10, 10, 90, 32, 1, true), new THREE.MeshLambertMaterial())
        this.mesh.material.side = THREE.BackSide
        this.mesh.rotation.x = 1.57
        this.onColorChange(color)
    }

    public onColorChange(color: THREE.Color): void {
        let material = this.mesh.material as THREE.MeshLambertMaterial
        material.color = color;
    }

    public update() : void {
        //probably some awesome color changing stuff in the future? 
    }
}