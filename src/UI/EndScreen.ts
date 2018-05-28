/// <reference path="../typings/index.d.ts" />
import Screen from './Screen'

export default class EndScreen extends Screen {
    private clickCb = (e : MouseEvent) => { this.clickHandler(e) } // putting the callback in an attribute otherwise it won't be removed correctly

    constructor() {
        super()
        this.addBtn('restart')
        window.addEventListener('click', this.clickCb)
    }

    private clickHandler(e : MouseEvent) {
        let target = e.target as HTMLElement

        if(target.nodeName === 'BUTTON'){
            this.remove()
            this._game.playGame()
        }
    }

    public remove() : void {
        window.removeEventListener('click', this.clickCb)
        super.remove()
    }
}