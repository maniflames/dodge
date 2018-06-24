import ColorListener from "./ColorListener"

export default interface IColorManager {
    color: THREE.Color
    subscribe(object: ColorListener): void
    unsubscribe(object: ColorListener): void
    changeColor(): void
}