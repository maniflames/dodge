/// <reference path="../../typings/index.d.ts" />
import GameObject from '../GameObject'
import WallAnimation from './Animations/WallAnimation'
import ColorListener from '../../ColorManagement/ColorListener'
import SpeedListener from '../../SpeedManagement/SpeedListener'

export default class Wall extends GameObject implements ColorListener, SpeedListener {
    private _maxDistanceFromCamera: number = this.game.camera.position.z - 8
    private _animation: WallAnimation | null = null
    private _speed: number = 0

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

    public get speed(): number {
        return this._speed
    }

    public set speed(speed: number) {
        this._speed = speed
    }

    constructor(color: THREE.Color) {
        super(new THREE.BoxGeometry(10, 20, 1), new THREE.MeshLambertMaterial())
        this.onColorChange(color)
    }

    public onColorChange(color: THREE.Color): void {
        let material = this.mesh.material as THREE.MeshLambertMaterial
        material.color = color;
    }

    public onSpeedChange(speed: number): void {
        this._speed = speed
    }

    public update(): void {
        super.update()
        if(this._animation){
            this._animation.update()
        }  
    }
}