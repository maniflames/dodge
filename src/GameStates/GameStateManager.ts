import GameState from "./GameState"

export default class GameStateManager {
    private static object: GameStateManager
    private _state: GameState | null = null

    public get state(): GameState | null {
        return this._state
    }

    public set state(state: GameState | null) {
        this._state = state
    }

    private constructor() {  }

    public static getManager(): GameStateManager {
        if(!GameStateManager.object){
            GameStateManager.object = new GameStateManager()
        }

        return GameStateManager.object
    }
    
    public update(): void {
        if(this._state) {
            this._state.update()
        }
    }
}