export class Model {
    private static instance: Model

    data: any = {
        lineWidth : 1,
        x : window.innerWidth / 2,
        y : window.innerHeight / 2,
        bgColor : '#87ceeb'
    };

    constructor() {
        if (Model.instance) {
            return Model.instance;
        }
        Model.instance = this;
    }

    getInstance(): Model{
        return Model.instance
    }
}