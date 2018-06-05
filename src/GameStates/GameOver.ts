import Game from '../Game'
import Wall from '../GameObjects/Wall/Wall'
import EndScreen from '../UI/EndScreen'

export default class GameOver implements GameState {
    private _game: Game

    constructor() {
        this._game = Game.getGame()

        for (let index = this._game.gameObjects.length - 1 ; index >= 0; index--) {
            if (this._game.gameObjects[index] instanceof Wall) {
                this._game.gameObjects[index].remove()
            }
            
        }

        this._game.screen = new EndScreen()
    }

    public update(): void { }
}