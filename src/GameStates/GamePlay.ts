import Game from '../Game'
import ScoreDisplay from '../UI/ScoreDisplay'
import LevelGenerator from '../LevelGenerator'
import GameObject from '../GameObjects/GameObject'
import Tunnel from '../GameObjects/Tunnel'
import Player from '../GameObjects/Player'
import Wall from '../GameObjects/Wall/Wall'


export default class GamePlay implements GameState {
    private _game: Game
    private _levelGenerator: LevelGenerator

    constructor() {
        console.count('[GamePlay] Started new game')
        this._game = Game.getGame()
        this._game.scoreDisplay = new ScoreDisplay()
        this._levelGenerator = LevelGenerator.getGenerator() 
        this._game.addGameObject(new Tunnel())
        this._game.addGameObject(new Player())
        
    }

    public update():void {
        this._levelGenerator.update()
        
        for (let obj1 of this._game.gameObjects) {
            obj1.update()

            if(obj1 instanceof Wall){
                if(this._checkOutOfBounds(obj1)){
                    if(this._game.scoreDisplay){
                        this._game.scoreDisplay.score++ 
                    }   
                    obj1.remove()
                }
            }
            
            for (let obj2 of this._game.gameObjects) {
                if(obj1 instanceof Player && obj2 instanceof Wall){
                    if(this._checkCollision(obj1, obj2)) {
                        obj1.remove()
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
        if(wall.position.x > 15 || wall.position.x < -15 ){
            return true
        }

        return false
    }
}