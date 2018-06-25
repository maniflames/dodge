import Game from '../Game'
import StartScreen from '../UI/StartScreen'
import GamePlayInit from './GamePlayInit'
import GameState from './GameState'

export default class GameInit implements GameState {
    private game: Game = Game.getGame()
    private clickCb = (e : MouseEvent) => { this.clickHandler(e) } 
    private touch: HammerManager = new Hammer(document.body)

    constructor() {
        this.game.screen = new StartScreen()
        this.touch.on('tap', (e) => { this.clickHandler(e) })
        window.addEventListener('click', this.clickCb)
    }

    public update(): void { }


    private clickHandler(e: MouseEvent | HammerInput): void {

        window.removeEventListener('click', this.clickCb)
        if(this.game.screen) {
            this.game.screen.remove()
        } 


        this.touch.off('tap')
        this.game.gameStateManager.state = new GamePlayInit() 
    }
}