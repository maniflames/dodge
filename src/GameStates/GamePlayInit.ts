import Game from "../Game"
import ScoreDisplay from "../UI/ScoreDisplay"
import Tunnel from "../GameObjects/Tunnel"
import Player from "../GameObjects/Player"
import GamePlay from "./GamePlay"
import ColorManager from "../ColorManagement/ColorManager"
import GameState from "./GameState"

export default class GamePlayInit implements GameState {
    private game: Game = Game.getGame()
    private colorManager: ColorManager = ColorManager.getManager()
    private done: Boolean = false

    constructor() {
        this.game.scoreDisplay = new ScoreDisplay()
        let tunnel = new Tunnel(this.colorManager.color)
        this.colorManager.subscribe(tunnel)
        this.game.addGameObject(tunnel)
        this.game.addGameObject(new Player())
        this.done = true
    }

    public update(): void { 
        if(this.done) {
            this.game.gameStateManager.state = new GamePlay()
        }
    }
} 