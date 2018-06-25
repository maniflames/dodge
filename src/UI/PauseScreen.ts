import Screen from './Screen'
import AudioManager from '../AudioManagement/AudioManager'

//I dislike the idea 
export default class PauseScreen extends Screen {
    private audioManager: AudioManager = AudioManager.getManager()

    constructor() {
        super()
        let title = document.createElement('h1')
        title.innerHTML = 'paused'

        let options = document.createElement('ul')
        options.classList.add('options')

        for(let category of this.audioManager.categories) {
            let li = document.createElement('li')
            li.classList.add(category)
            li.setAttribute('category', category)
            if(this.audioManager.disabled.indexOf(category) > -1) {
                li.classList.add('disabled')
            }
            options.appendChild(li)
        }

        this.domElement.appendChild(title)
        this.domElement.appendChild(options)
    }
}