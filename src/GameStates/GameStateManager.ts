export default class GameStateManager {
    private static _object: GameStateManager
    private _state: GameState | null = null

    public get state(): GameState | null {
        return this._state
    }

    public set state(state: GameState | null) {
        this._state = state
    }

    private constructor() {  }

    public static getManager(): GameStateManager {
        if(!GameStateManager._object){
            GameStateManager._object = new GameStateManager()
        }

        return GameStateManager._object
    }
    
    public update(): void {
        if(this._state) {
            this._state.update()
        }
    }
}