import Game from './Game'
import GameStateManager from './GameStates/GameStateManager'
import GameInit from './GameStates/GameInit'

window.addEventListener('load', () => {
    console.log('Page is loaded!');
    Game.getGame()
    GameStateManager.getManager().state = new GameInit()
})