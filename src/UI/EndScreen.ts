/// <reference path="../typings/index.d.ts" />
import Screen from './Screen'


export default class EndScreen extends Screen {
    
    constructor() {
        super()
        this.addBtn('restart')
    }

    public remove() : void {
        super.remove()
    }
}