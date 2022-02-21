import * as PIXI from "pixi.js"

const main = async () => {
    // Actual app
    let app = new PIXI.Application();

    // Display application properly
    document.body.style.margin = '0';
    app.renderer.view.style.position = 'absolute';
    app.renderer.view.style.display = 'block';

    // View size = windows
    app.renderer.resize(window.innerWidth, window.innerHeight);

    const graphics = new PIXI.Graphics();
    graphics.x = window.innerWidth / 2 - graphics.width / 2;
    graphics.y = window.innerHeight / 2 - graphics.height / 2;
    app.stage.addChild(graphics);

    let left = new PIXI.Graphics();

    left.lineStyle(20, 0xffffff, 1);

    left.moveTo(0,150);
    left.lineTo(130,150);

    left.moveTo(170,150);
    left.lineTo(220,150);
    left.lineTo(220,0);

    left.moveTo(150,70);
    left.lineTo(150,280);
    left.moveTo(150,80);
    left.lineTo(200,80);

    left.moveTo(240,80);
    left.lineTo(300,80);

    left.moveTo(0,300);
    left.lineTo(220,300);
    left.lineTo(220,350);
    left.moveTo(220,390);
    left.lineTo(220,450);

    left.moveTo(150,330);
    left.lineTo(150,370);
    left.lineTo(300,370);

    let right = new PIXI.Graphics(left.geometry);
        right.x = 600
        right.y= 450
        right.angle = 180

    let pattern = new PIXI.Container();
    pattern.addChild(left);
    pattern.addChild(right);

    let texture = app.renderer.generateTexture(pattern);

    let tile = new PIXI.TilingSprite(texture,app.renderer.width,app.renderer.height)

    app.stage.addChild(tile);

    
    /*
    const container = new PIXI.Container();

    container.addChild(left)

    //ATTEMPT 2
    let texture = app.renderer.generateTexture(container)

    let tile1 = new PIXI.TilingSprite(texture,app.renderer.width,app.renderer.height);
    app.stage.addChild(tile1);

    // for (let i = 0; i < 10; i++){
    //     let pattern = new PIXI.Sprite(texture);
    //     pattern.x = (i % 5) * 600;
    //     pattern.y = Math.floor(i / 5) * 450;
    //     container.addChild(pattern);
    // }

    // for (let i = 1; i < 10; i+=2){
    //     let pattern2 = new PIXI.Sprite(texture);
    //     pattern2.anchor.set(1,1);
    //     pattern2.angle = 180;
    //     pattern2.x = i * 300;
    //     // pattern2.y = 450;
    //     container.addChild(pattern2);
    // }


    //ATTEMPT 1
    // app.stage.addChild(left);

    // for (let i = 1; i < 4; i++) {
    //     let dupLeft = new PIXI.Graphics(left.geometry);
    //     dupLeft.x = i * 600
    //     app.stage.addChild(dupLeft);

    //     let right = new PIXI.Graphics(left.geometry);
    //     right.x = i * 600
    //     right.y= 450
    //     right.angle = 180
    //     app.stage.addChild(right);
    //   }
*/

    document.body.appendChild(app.view);

};

main();

