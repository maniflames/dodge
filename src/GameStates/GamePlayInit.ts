import Game from "../Game"
import ScoreDisplay from "../UI/ScoreDisplay"
import Tunnel from "../GameObjects/Tunnel"
import Player from "../GameObjects/Player"
import GameStateManager from "./GameStateManager"
import GamePlay from "./GamePlay"

export default class GamePlayInit implements GameState {
    private _game: Game
    private _gameStateManager: GameStateManager
    private _done: Boolean = false

    constructor() {
        this._game = Game.getGame()
        this._gameStateManager = GameStateManager.getManager()
        this._game.scoreDisplay = new ScoreDisplay()
        this._game.addGameObject(new Tunnel())
        this._game.addGameObject(new Player())
        this._done = true
    }

    public update(): void { 
        if(this._done) {
            this._gameStateManager.state = new GamePlay()
        }
    }
} 