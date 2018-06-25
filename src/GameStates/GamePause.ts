import GamePlay from './GamePlay'
import Game from '../Game'
import Player from '../GameObjects/Player'
import GameState from './GameState'
import PauseScreen from '../UI/PauseScreen'
import AudioManager from '../AudioManagement/AudioManager'

export default class GamePause implements GameState {
    private pauseKeyCb = (e: KeyboardEvent) => { this.pauseKeyHandler(e) }
    private clickCb = (e: MouseEvent) => { this.clickHandler(e) }
    private game: Game = Game.getGame()
    private audioManager: AudioManager = AudioManager.getManager()

    constructor() {
        document.addEventListener('keydown', this.pauseKeyCb)
        document.addEventListener('click', this.clickCb)
        this.game.screen = new PauseScreen()
    }

    public update(): void { }

    private clickHandler(e: MouseEvent) {
        let target = e.target as HTMLElement
        if(target.nodeName === 'LI') {
            this.audioManager.toggleDisabled(target.getAttribute('category') as string)
            target.classList.toggle('disabled')
        }
    }

    private pauseKeyHandler(e: KeyboardEvent): void {
        if(e.key != ' ') {
            return
        }

        document.removeEventListener('keydown', this.pauseKeyCb)
        document.removeEventListener('click', this.clickCb)
        
        if(this.game.screen) {
            this.game.screen.remove()
        }

        for(let player of this.game.gameObjects){
            if(player instanceof Player) {
                player.addMouseTracking()
            }
        }

        this.game.gameStateManager.state = new GamePlay()
    }
}