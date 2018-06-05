import Game from '../Game'
import StartScreen from '../UI/StartScreen'

export default class GameInit implements GameState {
    private _game: Game

    constructor() {
        this._game = Game.getGame()
        this._game.screen = new StartScreen()
    }

    public update(): void { }
}