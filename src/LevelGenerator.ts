/// <reference path="typings/index.d.ts" />
import Game from './Game'
import Wall from './GameObjects/Wall/Wall'
import WallAnimation from './GameObjects/Wall/Animations/WallAnimation'
import WallAnimationLeft from './GameObjects/Wall/Animations/WallAnimationLeft'
import WallAnimationRight from './GameObjects/Wall/Animations/WallAnimationRight'
import IColorManager from './ColorManagement/IColorManager'
import ColorManager from './ColorManagement/ColorManager'
import ISpeedManager from './SpeedManagement/ISpeedManager'
import SpeedManager from './SpeedManagement/SpeedManager'

export default class LevelGenerator {
    private static object: LevelGenerator
    private difficulty: number
    private targetScore: number
    private timer: THREE.Clock = new THREE.Clock(false)
    private timeHistory: number = 0
    private game: Game = Game.getGame()
    private colorManager: IColorManager = ColorManager.getManager()
    private speedManager: ISpeedManager = SpeedManager.getManager()

    private constructor(difficulty: number) {
        this.difficulty = difficulty
        this.targetScore = this.calculateNextTargetScore()
        this.timer.start()
    }

    public static getGenerator(): LevelGenerator {
        if (!LevelGenerator.object) {
            LevelGenerator.object = new LevelGenerator(1)
        }

        return LevelGenerator.object
    }

    private addWall(): void {
        let wall = new Wall(this.colorManager.color)
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
        wall.speed = this.speedManager.speed
        this.game.addGameObject(wall)
        this.colorManager.subscribe(wall)
        this.speedManager.subscribe(wall)
    }

    private calculateNextTargetScore(): number {
        if (this.game.score === 0) {
            return Math.round(Math.random() * 4 + 8)
        }

        return this.targetScore + Math.round(Math.random() * 4 + 10)
    }

    private checkDifficultyUpdate(): void {
        if (this.game.score >= this.targetScore) {
            console.log('update dificulty')
            this.difficulty++
            this.targetScore = this.calculateNextTargetScore()
            this.colorManager.changeColor()
            this.speedManager.changeSpeed(this.speedManager.speed + 0.3)
            console.log(this.speedManager.speed)
        }
    }

    public update(): void {
        this.checkDifficultyUpdate()

        let roundedTime = Math.floor(this.timer.getElapsedTime())
        let spawnDelay;
        if(this.speedManager.speed >= 2) {
            spawnDelay = 2
        } else if(this.speedManager.speed >= 4 ) {
            spawnDelay = 1
        } else {
            spawnDelay = 3
        }

        if (roundedTime % spawnDelay == 0 && roundedTime != this.timeHistory) {
            this.timeHistory = roundedTime
            this.addWall()
        }
    }

}
