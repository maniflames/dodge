export default class Sound {
    private _name: string;
    private _howl: Howl;
    private _category: string; 
    
    public get name(): string {
        return this._name;
    }

    public get howl(): Howl {
        return this._howl;
    }
    public set howl(value: Howl) {
        this._howl = value;
    }

    public get category(): string {
        return this._category;
    }

    constructor(name: string, path: string, category: string, autoReplay: boolean) {
        this._name = name
        this._category = category
        this._howl = new Howl({src: [path], loop: autoReplay})
    }   
}