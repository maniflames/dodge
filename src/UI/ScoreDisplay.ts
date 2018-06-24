export default class ScoreDisplay {
    private parentElement: HTMLElement = document.body as HTMLElement;
    private element: HTMLElement
    private _score: number = 0

    get score(): number {
        return this._score
    }

    set score(score: number) {
        this._score = score
        this.element.innerText = this._score.toString()
    }

    constructor() {
        this.element = document.createElement('div')
        this.element.classList.add('display')
        this.element.style.display = 'block'
        this.parentElement.appendChild(this.element)
        this.score = 0
    }

    public remove() {
        this.parentElement.removeChild(this.element)
    }
}
