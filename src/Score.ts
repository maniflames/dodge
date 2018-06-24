export default class Score {
    private _total: number = 0

    public get total(): number {
        return this._total
    }

    public set total(newScore: number) {
        this._total = newScore
    }

    public reset(): void {
        this._total = 0; 
    }
}