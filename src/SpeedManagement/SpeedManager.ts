import SpeedListener from './SpeedListener'
import ISpeedManager from './ISpeedManager'

export default class SpeedManager implements ISpeedManager {
    private static object: SpeedManager
    private speedListeners: Array<SpeedListener> = new Array<SpeedListener>()
    private _speed: number = 1

    public get speed(): number {
        return this._speed
    }

    private constructor() {  }

    public static getManager(): SpeedManager {
        if(!SpeedManager.object){
            SpeedManager.object = new SpeedManager()
        }

        return SpeedManager.object
    }
    
    public subscribe(listener: SpeedListener): void {
        this.speedListeners.push(listener)
    }

    public unsubscribe(listener: SpeedListener): void {
        let index = this.speedListeners.indexOf(listener)
        if(index != -1) {
            this.speedListeners.splice(index, 1)
            return
        }

        console.error('attempt to unsubscribe non subscribed object')
    }

    public changeSpeed(speed: number): void {
        this._speed = speed 

        for (let listener of this.speedListeners) {
            listener.onSpeedChange(this._speed)
        }
    }
}