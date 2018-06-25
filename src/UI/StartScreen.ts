/// <reference path="../typings/index.d.ts" />
import Screen from './Screen'

export default class StartScreen extends Screen {
    constructor() {
        super()
        let title = document.createElement('h1')
        title.innerHTML = 'dodge'

        let instruction = document.createElement('h3')
        instruction.classList.add('blink')
        instruction.innerHTML = 'tap anywhere to start'

        this.domElement.appendChild(title)
        this.domElement.appendChild(instruction)
    }

    public remove(): void {
        super.remove()
    }
}