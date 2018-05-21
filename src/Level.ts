/// <reference path="typings/index.d.ts" />
import Game from './Game'
import Wall from './Wall/Wall'
import WallAnimation from './Wall/Animations/WallAnimation'
import WallAnimationLeft from './Wall/Animations/WallAnimationLeft'
import WallAnimationRight from './Wall/Animations/WallAnimationRight'

//a level only takes care of how and which objects are spawned into the game 
//you should be able to give a difficulty to a level and the level will act based on difficulty
export default class Level {
    private _difficulty : number
    private _timer : THREE.Clock = new THREE.Clock(false)
    private _timeHistory : number = 0
    private _game : Game = Game.getGame()

    constructor(difficulty : number){
        this._difficulty = difficulty
        this._timer.start()
    }

    private _addWall() : void {
        let animation : WallAnimation 
        Math.random() > 0.5 ? animation = new WallAnimationRight() : animation = new WallAnimationLeft()
        this._game.addGameObject(new Wall(animation))
    }

    public nextLevel() : void {
        this._difficulty++
    }

    public update() : void {
        //when it comes to speed flooring the time will cause a lot of trouble ... 
        //still thinking what would be better
        //since delta is updated every time I call getElapsedTime maybe I should just create my own delta? 
        let roundedTime = Math.floor(this._timer.getElapsedTime())

        if(roundedTime % 3 == 0 && roundedTime != this._timeHistory){
            this._timeHistory = roundedTime
            this._addWall()
        }
    }

}