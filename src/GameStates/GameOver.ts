import Game from '../Game'
import GamePlayInit from '../GameStates/GamePlayInit'
import Wall from '../GameObjects/Wall/Wall'
import EndScreen from '../UI/EndScreen'
import GameState from './GameState'

export default class GameOver implements GameState {
    private game: Game = Game.getGame()
    private clickCb = (e : MouseEvent) => { this.clickHandler(e) }

    constructor() {
        if(this.game.scoreDisplay){
            this.game.scoreDisplay.remove()
        }

        for (let index = this.game.gameObjects.length - 1 ; index >= 0; index--) {
            if (this.game.gameObjects[index] instanceof Wall) {
                //I should probably unsubscribe from both color and speed
                this.game.gameObjects[index].remove()
            }
        }

        this.game.screen = new EndScreen()
        window.addEventListener('click', this.clickCb)
    }

    public update(): void { }

    private clickHandler(e : MouseEvent) {
        let target = e.target as HTMLElement

        if(target.nodeName === 'BUTTON'){
            window.removeEventListener('click', this.clickCb)
            if(this.game.screen){
                this.game.screen.remove()
            }

            this.game.gameStateManager.state = new GamePlayInit()
        }
    }
}