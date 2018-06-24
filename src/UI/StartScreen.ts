/// <reference path="../typings/index.d.ts" />
import Screen from './Screen'

export default class StartScreen extends Screen {
    constructor() {
        super()
        this.addBtn('play')
    }

    public remove(): void {
        super.remove()
    }
}