/// <reference path="typings/index.d.ts" />
import Game from './Game'

export default abstract class GameObject {
    protected _mesh : THREE.Mesh
    protected _geometry : THREE.Geometry
    protected _game : Game = Game.getGame()

    public getGeometry() : THREE.Geometry {
        return this._geometry
    }

    constructor( geometry : THREE.Geometry, material : THREE.Material) {
        this._geometry = geometry
        this._mesh = new THREE.Mesh(geometry, material)

        //HMMM: this causes the paradox that makes it rather hard for me to create new gameObjects inside of the game
        this._game.getScene().add(this._mesh)
    }

    public remove() : void {
        this._game.getScene().remove(this._mesh)
    }

    public getPosition() : THREE.Vector3 {
        return this._mesh.position
    }

    public abstract update() : void 

}