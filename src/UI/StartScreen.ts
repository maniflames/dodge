/// <reference path="../typings/index.d.ts" />
import Screen from './Screen'
import GameStateManager from '../GameStates/GameStateManager'
import GamePlayInit from '../GameStates/GamePlayInit'

//TODO: move statemanagement to the GameInit Class
export default class StartScreen extends Screen {

    constructor() {
        super()
        this.addBtn('play')
    }

    public remove() : void {
        super.remove()
    }
}