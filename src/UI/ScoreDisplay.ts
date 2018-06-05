export default class ScoreDisplay {
    private parentElement: HTMLDivElement
    private element: HTMLDivElement
    private _score: number = 0

    get score(): number {
        return this._score
    }

    set score(score: number) {
        this._score = score
        this.element.innerText = this._score.toString()
    }

    constructor() {
        this.parentElement = document.body as HTMLDivElement;
        this.element = document.createElement('div')
        this.element.classList.add('display')
        this.element.style.display = 'block'
        this.parentElement.appendChild(this.element)
        this.score = 0
    }
}
