import Game from '../../../Game'
import WallAnimation from './WallAnimation'
import Wall from '../Wall'

export default class WallAnimationLeft implements WallAnimation {
    public wall: Wall
    private _widthdrawing: boolean = false
    private _game: Game = Game.getGame()
    private _startPositionX: number = -15
    private _endPositionX: number | boolean

    constructor(wall: Wall, endPosition: number | boolean = -6) {
        this.wall = wall
        this.wall.position.x = this._startPositionX
        this._endPositionX = endPosition
    }

    public depthAnimation(): void {
        if (this.wall.position.z < this.wall.maxDistance) {
            this.wall.position.z += 0.1
        } else if(this._endPositionX) {
            this._widthdrawing = true
            this.widthdrawAnimation()
        }
    }

    public insertAnimation(): void {
        if ( !this._endPositionX || (this.wall.position.x <= this._endPositionX && this._widthdrawing == false)) {
            this.wall.position.x += 0.05
        }
    }

    public widthdrawAnimation(): void {
        this.wall.position.x -= 0.2

        if (this.wall.position.x < this._startPositionX) {
            this.wall.remove(); 
        }
    }

    public update(): void {
        this.insertAnimation()
        this.depthAnimation()
    }
}