/// <reference path="typings/index.d.ts" />
import Game from './Game'
import Wall from './GameObjects/Wall/Wall'
import WallAnimation from './GameObjects/Wall/Animations/WallAnimation'
import WallAnimationLeft from './GameObjects/Wall/Animations/WallAnimationLeft'
import WallAnimationRight from './GameObjects/Wall/Animations/WallAnimationRight'
import ColorListener from './ColorManagement/ColorListener'
import Tunnel from './GameObjects/Tunnel'
import ColorManager from './ColorManagement/ColorManager'
//TODO: Change speed based on difficulty 

//a level only takes care of how and which objects are spawned into the game 
//you should be able to give a difficulty to a level and the level will act based on difficulty
export default class LevelGenerator {
    private static _object: LevelGenerator
    private _difficulty: number
    private _targetScore: number
    private _timer: THREE.Clock = new THREE.Clock(false)
    private _timeHistory: number = 0
    private _game: Game = Game.getGame()
    private _colorManager: ColorManager = ColorManager.getManager()

    private constructor(difficulty: number) {
        this._difficulty = difficulty
        this._targetScore = this._calculateNextTargetScore()
        this._timer.start()
    }

    public static getGenerator(): LevelGenerator {
        if(!LevelGenerator._object){
            LevelGenerator._object = new LevelGenerator(1)
        }

        return LevelGenerator._object
    }

    private _addWall(): void {
        let wall = new Wall(this._colorManager.color)
        let animation: WallAnimation

        //TODO: difficulty influences wall selection
        //STEP 1: Difficulty category selection
            //STEP 2: Direction Selection
        
        const n = Math.floor(Math.random() * 4)
        switch (n) {
            case 0:
                animation = new WallAnimationLeft(wall)
                break

            case 1:
                animation = new WallAnimationRight(wall)
                break

            case 2:
                animation = new WallAnimationLeft(wall, false)
                break

            case 3:
                animation = new WallAnimationRight(wall, false)
                break

            default:
                animation = new WallAnimationLeft(wall)
                break
        }

        wall.animation = animation
        this._game.addGameObject(wall)
        this._colorManager.subscribe(wall)
    }

    private _calculateNextTargetScore(): number {
        if(this._game.score === 0){
            return Math.round(Math.random() * 4 + 8)
        }

        return this._targetScore + Math.round(Math.random() * 10 + 20)
    }

    private _checkDifficultyUpdate(): void {
        if(this._game.score >= this._targetScore) {
            console.log('update dificulty')
            this._difficulty++
            this._targetScore = this._calculateNextTargetScore()
            this._colorManager.changeColor()
        }
    }

    public update(): void {
        this._checkDifficultyUpdate()

        //when it comes to speed flooring the time will cause a lot of trouble ... 
        //still thinking what would be better
        //since delta is updated every time I call getElapsedTime maybe I should just create my own delta? 
        let roundedTime = Math.floor(this._timer.getElapsedTime())

        if (roundedTime % 3 == 0 && roundedTime != this._timeHistory) {
            this._timeHistory = roundedTime
            this._addWall()
        }
    }

}
