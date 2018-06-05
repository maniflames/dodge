/// <reference path="../typings/index.d.ts" />
import Screen from './Screen'
import GameStateManager from '../GameStates/GameStateManager'
import GamePlay from '../GameStates/GamePlay'

export default class EndScreen extends Screen {
    private clickCb = (e : MouseEvent) => { this.clickHandler(e) } 
    private _gameStateManager: GameStateManager

    constructor() {
        super()
        this._gameStateManager = GameStateManager.getManager()
        this.addBtn('restart')
        window.addEventListener('click', this.clickCb)
    }

    private clickHandler(e : MouseEvent) {
        let target = e.target as HTMLElement

        if(target.nodeName === 'BUTTON'){
            this.remove()
            this._gameStateManager.state = new GamePlay()
        }
    }

    public remove() : void {
        window.removeEventListener('click', this.clickCb)
        super.remove()
    }
}