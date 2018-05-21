/// <reference path="../typings/index.d.ts" />
import Game from '../Game'

export default abstract class Screen { 
    protected _domElement : HTMLElement
    protected _game : Game = Game.getGame() 

    constructor(){
        this._domElement = document.createElement('div')
        this._domElement.classList.add('screen')
        document.body.appendChild(this._domElement)
    }

    protected addBtn(text : string) {
        let btn = document.createElement('button')
        btn.classList.add('btn')
        btn.innerHTML = text
        this._domElement.appendChild(btn)
    }

    public remove() : void {
        document.body.removeChild(this._domElement)
    }
}