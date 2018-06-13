export default class Score {
    private _total: number

    public get total(): number {
        return this._total
    }

    public set total(newScore: number) {
        this._total = newScore
    }

    constructor(){
        this._total = 0
    }

    public reset() {
        this._total = 0; 
    }
}