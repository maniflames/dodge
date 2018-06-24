import SpeedListener from "./SpeedListener"

export default interface ISpeedManager {
    speed: number
    subscribe(object: SpeedListener): void
    unsubscribe(object: SpeedListener): void
    changeSpeed(speed: number): void
}