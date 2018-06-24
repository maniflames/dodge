import Game from '../Game'
import StartScreen from '../UI/StartScreen'
import GamePlayInit from './GamePlayInit'
import GameState from './GameState'

export default class GameInit implements GameState {
    private game: Game = Game.getGame()
    private clickCb = (e : MouseEvent) => { this.clickHandler(e) } 

    constructor() {
        this.game.screen = new StartScreen()
        window.addEventListener('click', this.clickCb)
    }

    public update(): void { }

    private clickHandler(e: MouseEvent): void {
        let target = e.target as HTMLElement

        if(target.nodeName === 'BUTTON') {
            window.removeEventListener('click', this.clickCb)
            if(this.game.screen) {
                this.game.screen.remove()
            } 

            this.game.gameStateManager.state = new GamePlayInit()
        }
    }
}