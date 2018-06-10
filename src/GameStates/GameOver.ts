import Game from '../Game'
import GameStateManager from '../GameStates/GameStateManager'
import GamePlayInit from '../GameStates/GamePlayInit'
import Wall from '../GameObjects/Wall/Wall'
import EndScreen from '../UI/EndScreen'

export default class GameOver implements GameState {
    private _game: Game
    private clickCb = (e : MouseEvent) => { this.clickHandler(e) } 
    private _gameStateManager: GameStateManager

    constructor() {
        this._game = Game.getGame()
        this._gameStateManager = GameStateManager.getManager()

        for (let index = this._game.gameObjects.length - 1 ; index >= 0; index--) {
            if (this._game.gameObjects[index] instanceof Wall) {
                this._game.gameObjects[index].remove()
            }
        }

        this._game.screen = new EndScreen()
        window.addEventListener('click', this.clickCb)
    }

    public update(): void { }

    private clickHandler(e : MouseEvent) {
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