import Game from '../../Game'
import WallAnimation from './WallAnimation'
import Wall from '../Wall'

export default class WallAnimationLeft implements WallAnimation {
    private _widthdrawing : boolean = false
    private _init : boolean = true
    private _game : Game = Game.getGame()
    private _startPositionX : number = -15
    private _endPositionX : number = -6

    public depthAnimation(wall : Wall) : void {
        let position = wall.getPosition()
        
        if(position.z < wall.getMaxDistance()){
            position.z += 0.1
        } else {
            this._widthdrawing = true
            this.widthdrawAnimation(wall)
        }
    }

    public insertAnimation(wall : Wall) : void {
        let position = wall.getPosition()

        if(this._init){
            position.x = this._startPositionX
            this._init = false
        }
 
        if(position.x <= this._endPositionX && this._widthdrawing == false){
            position.x += 0.05 
        } 
    }

    public widthdrawAnimation(wall : Wall) : void {
        let position = wall.getPosition()
        
        position.x -= 0.2

        if(position.x < this._startPositionX){
            this._game.removeGameObject(wall)
        }    
    }

    public update(wall : Wall) : void {
        this.insertAnimation(wall)
        this.depthAnimation(wall)
    }
}