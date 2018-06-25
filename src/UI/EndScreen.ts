/// <reference path="../typings/index.d.ts" />
import Screen from './Screen'

export default class EndScreen extends Screen {
    
    constructor(score: number) {
        super()
        let title = document.createElement('h1')
        title.innerHTML = 'game over'

        let endScore = document.createElement('h3')
        endScore.innerHTML = '' + score

        let instruction = document.createElement('h3')
        instruction.classList.add('blink')
        instruction.innerHTML = 'tap anywhere to restart'

        this.domElement.appendChild(title)
        this.domElement.appendChild(endScore)
        this.domElement.appendChild(instruction)

    }

}