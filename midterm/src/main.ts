import * as PIXI from "pixi.js";
import * as dat from 'dat.gui'
import { Application, BatchGeometry, Container, LineStyle } from "pixi.js";
import { Walk } from "./walk";
import { Model } from "./model"

// let spaceUrl = await nasaRequest();

// console.log(spaceUrl)

// const load = (app: PIXI.Application) => {
//     return new Promise<void>((resolve) => {
//         app.loader.add(spaceUrl).load(() => {
//             resolve();
//         });
//     });
//   };

const load = (app: PIXI.Application) => {
    return new Promise<void>((resolve) => {
        app.loader.add('/assets/cat.jpg').load(() => {
            resolve();
        });
    });
  };

// let mouseState = false;

let walkArr:any[] = [];
let count = 100;

for (let i = 0; i < count; i++){
    walkArr.push(new Walk());
}

let model = new Model();

let bg = new PIXI.Graphics();

const main = async () => {
    // Actual app
    let app = new PIXI.Application();

    // Display application properly
    document.body.style.margin = '0';
    app.renderer.view.style.position = 'absolute';
    app.renderer.view.style.display = 'block';

    // View size = windows
    app.renderer.resize(window.innerWidth, window.innerHeight);

    // Handle window resizing
    window.addEventListener('resize', (_e) => {
        app.renderer.resize(window.innerWidth, window.innerHeight);
    });

    await load(app);

    let master = new PIXI.Container();
    master.interactive = true

    // let space = new PIXI.Sprite(
    //     app.loader.resources[spaceUrl].texture
    // );
    // master.addChild(space)

    let cat = new PIXI.Sprite(
        app.loader.resources['/assets/cat.jpg'].texture
    );

    master.addChild(cat)

    let mask = new PIXI.Container();

    bg.beginFill(0x87ceeb)
    bg.drawRect(0,0,window.innerWidth,window.innerHeight);

   master.addChild(bg)

    for (let i = 0; i < count; i++){
        mask.addChild(walkArr[i].walker)
    }

    bg.mask = mask;
    cat.mask = mask;

    master.addChild(mask);

    master.hitArea = new PIXI.Rectangle(0,0, window.innerWidth, window.innerHeight)

    app.stage.addChild(master)

    document.body.appendChild(app.view);

    master.on('pointerdown', onClick);
    // master.on('pointerup', onMouseUp)
    // master.on('mousemove', onDrag);

    const gui = new dat.GUI()
    gui.add(model.getInstance().data, 'lineWidth', 0, 10)
    gui.addColor(model.getInstance().data, 'bgColor')

    app.ticker.add(update)

};

function update(delta:number){
    
    for (let i = 0; i < count; i++){
        walkArr[i].draw();
    }

    let tempColor = model.data.bgColor.slice(1)
    tempColor = '0x' + tempColor;
    
    bg.beginFill(tempColor);
    bg.drawRect(0,0,window.innerWidth,window.innerHeight);

}

function onClick(e:any){

    let pos = e.data.global;

    for (let i = 0; i < count; i++){
        walkArr[i].onMousePoint(pos.x,pos.y);
    }

    // mouseState = true;

}

// function onMouseUp(){
//     mouseState = false;
// }

// function onDrag(){

//     if (mouseState){
//         console.log('dragging')
//         let hexCode = (Math.random()*0xFFFFFF<<0).toString(16)
//         console.log(hexCode)
//         let tempColor = '0x' + hexCode
//         bg.clear()
//         bg.beginFill(tempColor);
//         bg.drawRect(0,0,window.innerWidth,window.innerHeight);
//     }
    
// }

// async function nasaRequest(){
//     let api_key = "gFzgvygu1RmJhNaLtpKv6j3nGbKl6Q3NlrdYnNlK";
//     let response = await fetch (`https://api.nasa.gov/planetary/apod?api_key=${api_key}`);
//     let data = await response.json();
//     return data.url
// }

main();
