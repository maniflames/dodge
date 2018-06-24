import Game from '../Game'
import GameOver from '../GameStates/GameOver'
import LevelGenerator from '../LevelGenerator'
import GameObject from '../GameObjects/GameObject'
import Player from '../GameObjects/Player'
import Wall from '../GameObjects/Wall/Wall'
import GamePause from './GamePause'
import ColorManager from '../ColorManagement/ColorManager'
import GameState from './GameState'
import IColorManager from '../ColorManagement/IColorManager'

export default class GamePlay implements GameState {
    private game: Game = Game.getGame()
    private levelGenerator: LevelGenerator = LevelGenerator.getGenerator() 
    private colorManager: IColorManager = ColorManager.getManager()
    private pauseKeyCb = (e: KeyboardEvent) => { this.pauseKeyHandler(e) }

    constructor() {
        document.addEventListener('keydown', this.pauseKeyCb)
    }

    public update():void {
        this.levelGenerator.update()
        
        for (let obj1 of this.game.gameObjects) {
            obj1.update()

            if(obj1 instanceof Wall){
                if(this.checkOutOfBounds(obj1)){
                    if(this.game.scoreDisplay){
                        this.game.score++
                    }   
                    this.colorManager.unsubscribe(obj1)
                    obj1.remove()
                }
            }
            
            for (let obj2 of this.game.gameObjects) {
                if(obj1 instanceof Player && obj2 instanceof Wall){
                    if(this.checkCollision(obj1, obj2)) {
                        this.colorManager.unsubscribe(obj2)
                        document.removeEventListener('keydown', this.pauseKeyCb)
                        obj1.remove()
                        this.game.gameStateManager.state = new GameOver()
                    }    
                }
            }
        }
        
    }

    private checkCollision(obj1: GameObject, obj2: GameObject): boolean {
        let boxObj = obj1.boundingBox
        let boxOthObj = obj2.boundingBox

        if (boxObj.intersectsBox(boxOthObj)) {
            return true
        }

        return false
    }

    private checkOutOfBounds(wall: Wall): boolean {
        if(wall.position.x > 15 || wall.position.x < -15 ) {
            return true
        }

        return false
    }

    private pauseKeyHandler(e: KeyboardEvent): void {
        if(e.key != ' '){
            return
        }

        for(let player of this.game.gameObjects) {
            if(player instanceof Player) {
                player.removeMouseTracking()
            }
        }

        document.removeEventListener('keydown', this.pauseKeyCb)
        this.game.gameStateManager.state = new GamePause(); 
    }
}