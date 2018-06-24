import IColorManager from "./IColorManager"
import ColorListener from "./ColorListener"

export default class ColorManager implements IColorManager {
    private static object: ColorManager
    private colorListeners: Array<ColorListener> = new Array<ColorListener>()
    private _color: THREE.Color

    public get color(): THREE.Color {
        return this._color
    }

    private constructor() {
        this._color = this.generateColor()
    }

    public static getManager(): ColorManager {
        if(!ColorManager.object){
            ColorManager.object = new ColorManager()
        }

        return ColorManager.object
    }
    
    public subscribe(listener: ColorListener): void {
        this.colorListeners.push(listener)
    }

    public unsubscribe(listener: ColorListener): void {
        let index = this.colorListeners.indexOf(listener)
        if(index != -1) {
            this.colorListeners.splice(index, 1)
            return
        }

        console.error('attempt to unsubscribe non subscribed object')
    }

    public changeColor(): void {
        let color = this.generateColor()
        for (let listener of this.colorListeners) {
            this._color = color
            listener.onColorChange(color)
        }
    }

    private generateColor(): THREE.Color {
        return new THREE.Color(Math.random(), Math.random(), Math.random()) 
    }
}