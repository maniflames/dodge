import Game from '../../../Game'
import WallAnimation from './WallAnimation'
import Wall from '../Wall'
import WallAnimationRight from './WallAnimationRight';

export default class WallAnimationLeft implements WallAnimation {
    public wall: Wall
    private _widthdrawing: boolean = false
    private _init: boolean = true
    private _game: Game = Game.getGame()
    private _startPositionX: number
    private _endPositionX: number | boolean

    constructor(wall: Wall, endPositionX: number | boolean = 6, startPositionX: number = 15) {
        this.wall = wall
        this._startPositionX = startPositionX
        this.wall.position.x = this._startPositionX
        this._endPositionX = endPositionX
    }

    public depthAnimation() : void {
        if(this.wall.position.z < this.wall.maxDistance) {
            this.wall.position.z += 0.1
        } else if(this._endPositionX && this.wall.position.z >= this.wall.maxDistance) {
            this.wall.animation = new WallAnimationRight(this.wall, false, this.wall.position.x)
        }
    }

    public insertAnimation() : void {
        if( !this._endPositionX || (this.wall.position.x >= this._endPositionX && this._widthdrawing == false)) {
            this.wall.position.x -= 0.05 
        } 
    }

    public update() : void {
        this.insertAnimation()
        this.depthAnimation()
    }
}