import IColorManager from "./IColorManager"
import ColorListener from "./ColorListener"

export default class ColorManager implements IColorManager {
    private static _object: ColorManager
    private _color: THREE.Color
    private _colorListeners: Array<ColorListener> = new Array<ColorListener>()

    public get color(): THREE.Color {
        return this._color
    }

    private constructor() {
        this._color = this._generateColor()
    }

    public static getManager(): ColorManager {
        if(!ColorManager._object){
            ColorManager._object = new ColorManager()
        }

        return ColorManager._object
    }
    
    public subscribe(object: ColorListener): void {
        console.log('subscribed!')
        this._colorListeners.push(object)
        console.log(this._colorListeners)
    }

    public unsubscribe(object: ColorListener): void {
        let index = this._colorListeners.indexOf(object)
        console.warn(this._colorListeners)
        if(index != -1) {
            this._colorListeners.splice(index, 1)
            return
        }

        console.error('attempt to unsubscribe non subscribed object')
    }

    public changeColor(): void {
        let color = this._generateColor()
        for (let object of this._colorListeners) {
            this._color = color
            object.onColorChange(color)
        }
    }

    private _generateColor(): THREE.Color {
        return new THREE.Color(Math.random(), Math.random(), Math.random()) 
    }
}