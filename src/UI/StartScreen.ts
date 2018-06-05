/// <reference path="../typings/index.d.ts" />
import Screen from './Screen'
import GameStateManager from '../GameStates/GameStateManager'
import GamePlay from '../GameStates/GamePlay'

//a lot more functionality could be moved to the parent screen class
export default class StartScreen extends Screen {
    private clickCb = (e : MouseEvent) => { this.clickHandler(e) } // putting the callback in an attribute otherwise it won't be removed correctly
    private _gameStateManager: GameStateManager

    constructor() {
        super()
        this._gameStateManager = GameStateManager.getManager()
        this.addBtn('play')
        window.addEventListener('click', this.clickCb)
    }

    private clickHandler(e : MouseEvent) : void {
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