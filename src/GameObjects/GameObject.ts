/// <reference path="../typings/index.d.ts" />
import Game from '../Game'

export default abstract class GameObject {
    protected game: Game = Game.getGame()
    protected _boundingBox: THREE.Box3 = new THREE.Box3()
    protected _geometry: THREE.Geometry
    protected mesh: THREE.Mesh

    public get geometry(): THREE.Geometry {
        return this._geometry
    }

    public get boundingBox(): THREE.Box3 {
        return this._boundingBox
    }
    
    public get position(): THREE.Vector3 {
        return this.mesh.position
    }

    constructor(geometry: THREE.Geometry, material: THREE.Material) {
        this._geometry = geometry
        this.mesh = new THREE.Mesh(geometry, material)

        //Using .setFromObject over geometry.computeBoundingBox because you have to 
        //recompute the boundingBox manually while you can recompute .setFromObject by calling it again
        //https://github.com/mrdoob/three.js/issues/1170 
        
        //Hmmmm this causes the paradox that makes it rather hard for me to create new gameObjects inside of the game
        this.game.scene.add(this.mesh)
    }

    public remove(): void {
        this.game.scene.remove(this.mesh)
        this.game.removeGameObject(this)
    }

    public update(): void {
        this._boundingBox.setFromObject(this.mesh)
    }

}