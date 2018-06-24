/// <reference path="typings/index.d.ts" />
import GameObject from './GameObjects/GameObject'
import Screen from './UI/Screen'
import ScoreDisplay from './UI/ScoreDisplay'
import GameStateManager from './GameStates/GameStateManager'
import Score from './Score'

export default class Game {
    private static _object: Game
    private _gameStateManager: GameStateManager = GameStateManager.getManager()
    private renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer()
    private _scene: THREE.Scene = new THREE.Scene()
    private _camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    private _gameObjects: Array<GameObject> = new Array<GameObject>()
    private _score: Score = new Score
    private _screen: Screen | null = null
    private _scoreDisplay: ScoreDisplay | null = null


    public get score(): number {
        return this._score.total
    }

    public set score(newScore: number) {
        this._score.total = newScore
        if(this._scoreDisplay) {
            this._scoreDisplay.score = this._score.total
        }
    }

    public get screen(): Screen | null {
        return this._screen; 
    }

    public set screen(screen: Screen | null) {
        this._screen = screen
    }

    public get scoreDisplay(): ScoreDisplay | null {
        return this._scoreDisplay
    }

    public set scoreDisplay(scoreDisplay: ScoreDisplay | null) {
        this._scoreDisplay = scoreDisplay
    }

    public get gameObjects(): Array<GameObject> {
        return this._gameObjects
    }

    public get gameStateManager(): GameStateManager {
        return this._gameStateManager
    }

    public get camera(): THREE.Camera {
        return this._camera;
    }

    public get scene(): THREE.Scene {
        return this._scene;
    }

    private constructor() {
        console.count("[Game] Game construct!")

        // let pointLight = new THREE.PointLight(0xff0000, 1, 100)
        const pointLight = new THREE.PointLight(0xffffff, 1, 100, 2);
        pointLight.position.set(0, 0, 50)
        this._scene.add(pointLight)

        this._camera.position.z = 50
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        document.body.appendChild(this.renderer.domElement)

        requestAnimationFrame(() => this.gameloop())
    }

    public static getGame(): Game {
        if (!Game._object) {
            Game._object = new Game()
        }

        return Game._object;
    }

    private gameloop(): void {
        this._gameStateManager.update()
        this.renderer.render(this._scene, this._camera)
        requestAnimationFrame(() => this.gameloop())
    }

    public addGameObject(object: GameObject): void {
        this._gameObjects.push(object)
    }

    public removeGameObject(target: GameObject): void {
        let index = this._gameObjects.indexOf(target)
        this._gameObjects.splice(index, 1)
    }
}
