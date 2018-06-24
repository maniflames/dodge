import GamePlay from './GamePlay'
import Game from '../Game'
import Player from '../GameObjects/Player'
import GameState from './GameState'


export default class GamePause implements GameState {
    private pauseKeyCb = (e: KeyboardEvent) => { this.pauseKeyHandler(e) }
    private game: Game = Game.getGame()

    constructor() {
        document.addEventListener('keydown', this.pauseKeyCb)
    }

    public update(): void { }

    private pauseKeyHandler(e: KeyboardEvent): void {
        if(e.key != ' ') {
            return
        }

        document.removeEventListener('keydown', this.pauseKeyCb)
        for(let player of this.game.gameObjects){
            if(player instanceof Player) {
                player.addMouseTracking()
            }
        }
        this.game.gameStateManager.state = new GamePlay()
    }
}