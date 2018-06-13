import Game from "../Game"
import ScoreDisplay from "../UI/ScoreDisplay"
import Tunnel from "../GameObjects/Tunnel"
import Player from "../GameObjects/Player"
import GameStateManager from "./GameStateManager"
import GamePlay from "./GamePlay"
import ColorManager from "../ColorManagement/ColorManager"

export default class GamePlayInit implements GameState {
    private _game: Game
    private _gameStateManager: GameStateManager
    private _colorManager: ColorManager
    private _done: Boolean = false

    constructor() {
        this._game = Game.getGame()
        this._gameStateManager = GameStateManager.getManager()
        this._colorManager = ColorManager.getManager()
        this._game.scoreDisplay = new ScoreDisplay()
        let tunnel = new Tunnel(this._colorManager.color)
        this._colorManager.subscribe(tunnel)
        this._game.addGameObject(tunnel)
        this._game.addGameObject(new Player())
        this._done = true
    }

    public update(): void { 
        if(this._done) {
            this._gameStateManager.state = new GamePlay()
        }
    }
} 