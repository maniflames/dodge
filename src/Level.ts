/// <reference path="typings/index.d.ts" />
import Game from './Game'
import Wall from './GameObjects/Wall/Wall'
import WallAnimation from './GameObjects/Wall/Animations/WallAnimation'
import WallAnimationLeft from './GameObjects/Wall/Animations/WallAnimationLeft'
import WallAnimationRight from './GameObjects/Wall/Animations/WallAnimationRight'

//a level only takes care of how and which objects are spawned into the game 
//you should be able to give a difficulty to a level and the level will act based on difficulty
export default class Level {
    private _difficulty: number
    private _timer: THREE.Clock = new THREE.Clock(false)
    private _timeHistory: number = 0
    private _game: Game = Game.getGame()
    private _score: number = 0

    constructor(difficulty: number) {
        this._difficulty = difficulty
        this._timer.start()
    }

    private _addWall(): void {
        let wall = new Wall()
        let animation: WallAnimation
        
        const n = Math.floor(Math.random() * 4);
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
                break;
        }

        wall.animation = animation
        this._game.addGameObject(wall)
    }

    public nextLevel(): void {
        this._difficulty++
    }

    public update(): void {
        //when it comes to speed flooring the time will cause a lot of trouble ... 
        //still thinking what would be better
        //since delta is updated every time I call getElapsedTime maybe I should just create my own delta? 
        let roundedTime = Math.floor(this._timer.getElapsedTime())

        if (roundedTime % 3 == 0 && roundedTime != this._timeHistory) {
            this._timeHistory = roundedTime
            this._addWall()
            if (this._game.scoreDisplay) {
                this._game.scoreDisplay.visible = true
                this._game.scoreDisplay.score = this._score++
            }
        }
    }

}
