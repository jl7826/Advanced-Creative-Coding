import { Container, Graphics } from "pixi.js";
import { Model } from "./model"
import { perlin } from './script'

export class Walk {

    walker : Graphics;
    walkData : {
        x : number,
        y : number,
        xvector : number,
        yvector : number
    };
    model : Model

    constructor(){

        this.model = new Model()

        this.walker = new Graphics();

        this.walkData = {
            x : this.model.data.x,
            y : this.model.data.y,
            xvector : getRndInteger(-10,10),
            yvector : getRndInteger(-10,10)
        };

    }

    draw(){
        let prex = this.walkData.x;
        let prey = this.walkData.y;

        // @ts-ignore
        this.walkData.xvector += noise.simplex2(this.walkData.y, this.walkData.x);
        // @ts-ignore
        this.walkData.yvector += noise.simplex2(this.walkData.x, this.walkData.y);

        this.walkData.x += this.walkData.xvector;
        this.walkData.y += this.walkData.yvector;

        this.walker.lineStyle(this.model.data.lineWidth, 0xffffff, 1);
        this.walker.moveTo(prex, prey);
        this.walker.lineTo(this.walkData.x, this.walkData.y);

    }

    onMousePoint(_x : number, _y : number){
        this.walkData.x = _x
        this.walkData.y = _y
    }

}

function getRndInteger(min:number, max:number) {
    return Math.floor(Math.random() * (max - min)) + min;
}