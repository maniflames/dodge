export default class ScoreDisplay {
    private parentElement: HTMLDivElement
    private element: HTMLDivElement
    private _visible: boolean = false
    private _score: number = 0

    constructor() {
        this.parentElement = document.body as HTMLDivElement;
        this.element = document.createElement('div')
        this.element.classList.add('display')
        this.parentElement.appendChild(this.element)
        this.visible = false
    }

    set score(score: number) {
        this._score = score
        this.element.innerText = this._score.toString()
    }

    set visible(visible: boolean) {
        this._visible = visible
        if (this._visible) {
            this.element.style.display = 'block'
        } else {
            this.element.style.display = 'none'
        }
    }
}
