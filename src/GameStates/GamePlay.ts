import Game from '../Game'
import GameStateManager from '../GameStates/GameStateManager'
import GameOver from '../GameStates/GameOver'
import ScoreDisplay from '../UI/ScoreDisplay'
import LevelGenerator from '../LevelGenerator'
import GameObject from '../GameObjects/GameObject'
import Player from '../GameObjects/Player'
import Wall from '../GameObjects/Wall/Wall'
import GamePause from './GamePause'
import ColorManager from '../ColorManagement/ColorManager'

export default class GamePlay implements GameState {
    private _game: Game
    private _gameStateManager: GameStateManager
    private _levelGenerator: LevelGenerator
    private _colorManager: ColorManager
    private _pauseKeyCb = (e: KeyboardEvent) => { this._pauseKeyHandler(e) }

    constructor() {
        this._game = Game.getGame()
        this._gameStateManager = GameStateManager.getManager()
        this._levelGenerator = LevelGenerator.getGenerator() 
        this._colorManager = ColorManager.getManager()
        document.addEventListener('keydown', this._pauseKeyCb)
    }

    public update():void {
        this._levelGenerator.update()
        
        for (let obj1 of this._game.gameObjects) {
            obj1.update()

            if(obj1 instanceof Wall){
                if(this._checkOutOfBounds(obj1)){
                    if(this._game.scoreDisplay){
                        this._game.score++
                    }   
                    this._colorManager.unsubscribe(obj1)
                    obj1.remove()
                }
            }
            
            for (let obj2 of this._game.gameObjects) {
                if(obj1 instanceof Player && obj2 instanceof Wall){
                    if(this._checkCollision(obj1, obj2)) {
                        this._colorManager.unsubscribe(obj2)
                        document.removeEventListener('keydown', this._pauseKeyCb)
                        obj1.remove()
                        this._gameStateManager.state = new GameOver()
                    }    
                }
            }
        }
        
    }

    private _checkCollision(obj1: GameObject, obj2: GameObject): boolean {
        let boxObj = obj1.getBoundingBox()
        let boxOthObj = obj2.getBoundingBox()

        if (boxObj.intersectsBox(boxOthObj)) {
            return true
        }

        return false
    }

    private _checkOutOfBounds(wall: Wall): boolean {
        if(wall.position.x > 15 || wall.position.x < -15 ) {
            return true
        }

        return false
    }

    private _pauseKeyHandler(e: KeyboardEvent) {
        if(e.key != ' '){
            return
        }

        for(let player of this._game.gameObjects) {
            if(player instanceof Player) {
                player.removeMouseTracking()
            }
        }

        document.removeEventListener('keydown', this._pauseKeyCb)
        this._gameStateManager.state = new GamePause(); 
    }
}