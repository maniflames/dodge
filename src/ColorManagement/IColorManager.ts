import ColorListener from "./ColorListener"

export default interface IColorManager {
    subscribe(object: ColorListener): void
    unsubscribe(object: ColorListener): void
    changeColor(): void
}