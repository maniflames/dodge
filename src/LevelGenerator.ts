/// <reference path="typings/index.d.ts" />
import Game from './Game'
import Wall from './GameObjects/Wall/Wall'
import WallAnimation from './GameObjects/Wall/Animations/WallAnimation'
import WallAnimationLeft from './GameObjects/Wall/Animations/WallAnimationLeft'
import WallAnimationRight from './GameObjects/Wall/Animations/WallAnimationRight'
import ColorManager from './ColorManagement/ColorManager'
//TODO: Change speed based on difficulty 

//a level only takes care of how and which objects are spawned into the game 
//you should be able to give a difficulty to a level and the level will act based on difficulty
export default class LevelGenerator {
    private static object: LevelGenerator
    private difficulty: number
    private targetScore: number
    private timer: THREE.Clock = new THREE.Clock(false)
    private timeHistory: number = 0
    private game: Game = Game.getGame()
    private colorManager: ColorManager = ColorManager.getManager()

    private constructor(difficulty: number) {
        this.difficulty = difficulty
        this.targetScore = this._calculateNextTargetScore()
        this.timer.start()
    }

    public static getGenerator(): LevelGenerator {
        if(!LevelGenerator.object){
            LevelGenerator.object = new LevelGenerator(1)
        }

        return LevelGenerator.object
    }

    private _addWall(): void {
        let wall = new Wall(this.colorManager.color)
        let animation: WallAnimation

        //TODO: difficulty influences wall selection
        //STEP 1: Difficulty category selection
            //STEP 2: Direction Selection

        //TODO: Manage Spawnhistory so a wall can only appear twice in a row
        
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
        this.game.addGameObject(wall)
        this.colorManager.subscribe(wall)
    }

    private _calculateNextTargetScore(): number {
        if(this.game.score === 0){
            return Math.round(Math.random() * 4 + 8)
        }

        return this.targetScore + Math.round(Math.random() * 10 + 20)
    }

    private _checkDifficultyUpdate(): void {
        if(this.game.score >= this.targetScore) {
            console.log('update dificulty')
            this.difficulty++
            this.targetScore = this._calculateNextTargetScore()
            this.colorManager.changeColor()
        }
    }

    public update(): void {
        this._checkDifficultyUpdate()

        //TODO: Implement spawn based on dificulty 
        let roundedTime = Math.floor(this.timer.getElapsedTime())

        if (roundedTime % 2 == 0 && roundedTime != this.timeHistory) {
            this.timeHistory = roundedTime
            this._addWall()
        }
    }

}
