import WallAnimation from './WallAnimation'
import Wall from '../Wall'
import WallAnimationRight from './WallAnimationRight';

export default class WallAnimationLeft implements WallAnimation {
    public wall: Wall
    private widthdrawing: boolean = false
    private startPositionX: number
    private endPositionX: number | boolean

    constructor(wall: Wall, endPositionX: number | boolean = 6, startPositionX: number = 15) {
        this.wall = wall
        this.startPositionX = startPositionX
        this.wall.position.x = this.startPositionX
        this.endPositionX = endPositionX
    }

    public depthAnimation(): void {
        if(this.wall.position.z < this.wall.maxDistance) {
            this.wall.position.z += (0.1 * this.wall.speed)
        } else if(this.endPositionX && this.wall.position.z >= this.wall.maxDistance) {
            this.wall.animation = new WallAnimationRight(this.wall, false, this.wall.position.x)
        }
    }

    public insertAnimation(): void {
        if( !this.endPositionX || (this.wall.position.x >= this.endPositionX && this.widthdrawing == false)) {
            this.wall.position.x -= (0.05 * this.wall.speed)
        } 
    }

    public update(): void {
        this.insertAnimation()
        this.depthAnimation()
    }
}