/// <reference path="../typings/index.d.ts" />
import Game from '../Game'

export default class Screen { 
    protected domElement: HTMLElement
    protected game: Game = Game.getGame() 

    constructor(){
        this.domElement = document.createElement('div')
        this.domElement.classList.add('screen')
        document.body.appendChild(this.domElement)
    }

    protected addBtn(text: string) {
        let btn = document.createElement('button')
        btn.classList.add('btn')
        btn.innerHTML = text
        this.domElement.appendChild(btn)
    }

    public remove(): void {
        document.body.removeChild(this.domElement)
    }
}