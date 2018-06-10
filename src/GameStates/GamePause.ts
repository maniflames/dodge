import GameStateManager from '../GameStates/GameStateManager'
import GamePlay from './GamePlay'
import Game from '../Game'
import Player from '../GameObjects/Player'


export default class GamePause implements GameState {
    private _pauseKeyCb = (e: KeyboardEvent) => { this._pauseKeyHandler(e) }
    private _game: Game
    private _gameStateManager: GameStateManager

    constructor() {
        this._game = Game.getGame()
        this._gameStateManager = GameStateManager.getManager()
        document.addEventListener('keydown', this._pauseKeyCb)
    }

    public update(): void { }

    private _pauseKeyHandler(e: KeyboardEvent) {
        if(e.key != ' ') {
            return
        }

        document.removeEventListener('keydown', this._pauseKeyCb)
        for(let player of this._game.gameObjects){
            if(player instanceof Player) {
                player.addMouseTracking()
            }
        }
        this._gameStateManager.state = new GamePlay()
    }
}