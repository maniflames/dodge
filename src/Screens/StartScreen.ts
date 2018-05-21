/// <reference path="../typings/index.d.ts" />
import Screen from './Screen'

//a lot more functionality could be moved to the parent screen class
export default class StartScreen extends Screen {
    private clickCb = (e : MouseEvent) => { this.clickHandler(e) } // putting the callback in an attribute otherwise it won't be removed correctly

    constructor() {
        super()
        this.addBtn('play')
        window.addEventListener('click', this.clickCb)
    }

    private clickHandler(e : MouseEvent) : void {
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