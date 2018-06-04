/// <reference path="../typings/index.d.ts" />
import Game from '../Game'

export default abstract class GameObject {
    protected _mesh : THREE.Mesh
    protected _geometry : THREE.Geometry
    protected _game : Game = Game.getGame()
    protected _boundingBox : THREE.Box3

    public getGeometry() : THREE.Geometry {
        return this._geometry
    }

    public getBoundingBox() : THREE.Box3 {
        return this._boundingBox
    }

    constructor( geometry : THREE.Geometry, material : THREE.Material) {
        this._geometry = geometry
        this._mesh = new THREE.Mesh(geometry, material)
        //Using .setFromObject over geometry.computeBoundingBox because you have to 
        //recompute the boundingBox manually while you can recompute .setFromObject by calling it again
        //https://github.com/mrdoob/three.js/issues/1170 
        this._boundingBox = new THREE.Box3().setFromObject(this._mesh)
        
        //HMMM: this causes the paradox that makes it rather hard for me to create new gameObjects inside of the game
        this._game.getScene().add(this._mesh)
    }

    public remove() : void {
        this._game.getScene().remove(this._mesh)
        this._game.removeGameObject(this)
    }

    public getPosition() : THREE.Vector3 {
        return this._mesh.position
    }

    public update() : void {
        this._boundingBox.setFromObject(this._mesh)
    }

}