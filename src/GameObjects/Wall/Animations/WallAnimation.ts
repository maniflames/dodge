import Wall from '../Wall'

export default interface WallAnimation {
    wall: Wall 
    update(): void 
}