/// <reference path="typings/index.d.ts" />
import Game from './Game';

export default class GameObject {
    public mesh : THREE.Mesh;
    constructor( geometry : THREE.Geometry, material : THREE.Material) {
        this.mesh = new THREE.Mesh(geometry, material)
        //HMMM: this causes the paradox that makes it rather hard for me to create new gameObjects inside of the game
        //I need to find a fix for this first (not sure if I should add the scene to static memory)
        let game = Game.getGame(); 

        game.getScene().add(this.mesh)
        //TODO: move this to player class
        game.setPlayer(this) 
    }

    public update() : void {
        this.mesh.rotation.x += 0.01
    }

}