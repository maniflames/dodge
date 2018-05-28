//this animation interface takes care of the wall animations for now.
//it should allow different stragegies for either moving in left or moving in right
import Wall from '../Wall'

export default interface WallAnimation {
    update(wall : Wall) : void 
}