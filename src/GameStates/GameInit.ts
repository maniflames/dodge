import Game from '../Game'
import StartScreen from '../UI/StartScreen'
import GameStateManager from './GameStateManager'
import GamePlayInit from './GamePlayInit'

export default class GameInit implements GameState {
    private _game: Game
    private _gameStateManager: GameStateManager
    private clickCb = (e : MouseEvent) => { this.clickHandler(e) } 

    constructor() {
        this._game = Game.getGame()
        this._gameStateManager = GameStateManager.getManager()
        this._game.screen = new StartScreen()
        window.addEventListener('click', this.clickCb)
    }

    public update(): void { }

    private clickHandler(e : MouseEvent) : void {
        let target = e.target as HTMLElement

        if(target.nodeName === 'BUTTON'){
            window.removeEventListener('click', this.clickCb)
            if(this._game.screen){
                this._game.screen.remove()
            } 

            this._gameStateManager.state = new GamePlayInit()
        }
    }
}