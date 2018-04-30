/// <reference path="typings/index.d.ts" />
import Game from './Game'

export default abstract class GameObject {
    protected _mesh : THREE.Mesh
    protected _geometry : THREE.Geometry

    public getGeometry() : THREE.Geometry {
        return this._geometry
    }

    constructor( geometry : THREE.Geometry, material : THREE.Material) {
        this._geometry = geometry
        this._mesh = new THREE.Mesh(geometry, material)

        //HMMM: this causes the paradox that makes it rather hard for me to create new gameObjects inside of the game
        //(not sure if I should add the scene to static memory / move to a different object along with other setup THREE stuff)
        let game = Game.getGame(); 
        game.getScene().add(this._mesh)
    }

    public abstract update() : void 

}