/// <reference path="../../typings/index.d.ts" />
import GameObject from '../GameObject'
import WallAnimation from './Animations/WallAnimation'
import ColorListener from '../../ColorManagement/ColorListener'

export default class Wall extends GameObject implements ColorListener {
    private _maxDistanceFromCamera: number = this.game.camera.position.z - 8
    private _animation: WallAnimation | null = null

    public get animation(): WallAnimation | null {
        return this._animation
    }

    public set animation(animation: WallAnimation | null) {
        this._animation = animation
    }

    public get position(): THREE.Vector3 {
        return this.mesh.position
    }

    public get maxDistance(): number {
        return this._maxDistanceFromCamera
    }

    constructor(color: THREE.Color) {
        super(new THREE.BoxGeometry(10, 20, 1), new THREE.MeshLambertMaterial())
        this.onColorChange(color)
    }

    public onColorChange(color: THREE.Color): void {
        let material = this.mesh.material as THREE.MeshLambertMaterial
        material.color = color;
    }

    public update(): void {
        super.update()
        if(this._animation){
            this._animation.update()
        }  
    }
}