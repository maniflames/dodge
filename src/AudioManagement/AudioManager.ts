import Sound from './Sound'

export default class AudioManager {
    private static object: AudioManager
    private sounds: Array<Sound> = new Array<Sound>()
    private _categories: Array<string> = new Array<string>();
    private _disabled: Array<string> = new Array<string>()

    public get categories(): Array<string> {
        return this._categories
    }

    public get disabled(): Array<string> {
        return this._disabled
    }

    private constructor() { 
        this.categories.push('music')
        this.categories.push('sfx')

        this.sounds.push(new Sound('main', '/audio/Pim_Poy.wav', 'music', true ))
        this.sounds.push(new Sound('gameover', '/audio/Pim_Poy_Pocket.wav', 'music', true))
        this.sounds.push(new Sound('levelup', '/audio/SFX_Powerup_01.wav', 'sfx', false))
    }

    public static getManager(): AudioManager {
        if(!AudioManager.object){
            AudioManager.object = new AudioManager()
        }

        return AudioManager.object
    }

    public play(name: string) {
        if(!this.getSound(name)) {
            console.error('sound not found')
            return
        }

        let sound = this.getSound(name) as Sound

        if(this.disabled.indexOf(sound.category) > -1) {
            return
        }

        sound.howl.play()
    }

    public stop(name: string) {
        if(!this.getSound(name)){
            console.error('sound not found')
            return
        }

        let sound = this.getSound(name) as Sound
        sound.howl.stop()
    }

    public toggleDisabled(category: string) {
        if(this._categories.indexOf(category) === -1){
            console.error('category doesnt exists')
        }

        if(this._disabled.indexOf(category) === -1){
            this._disabled.push(category)
            for(let sound of this.sounds) {
                if(sound.category === category){
                    sound.howl.stop()
                }   
            }
        } else {
            this._disabled.splice(this._disabled.indexOf(category), 1)

            if(category === 'music'){
                let mainTrack = this.getSound('main') as Sound
                mainTrack.howl.play()
            }
        }
    }

    private getSound(name: string): Sound | boolean {
        let result;
        this.sounds.forEach((sound) => {
            if(sound.name === name) {
                result = sound
                return
            }
        })

        if(!result) {
            result = false
        }

        return result
    }
}