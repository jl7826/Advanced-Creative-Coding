import * as PIXI from "pixi.js"



const main = async () => {
    let app = new PIXI.Application();
    let container = new PIXI.Container();

    // Display application properly
    document.body.style.margin = '0';
    app.renderer.view.style.position = 'absolute';
    app.renderer.view.style.display = 'block';

    // View size = windows
    app.renderer.resize(window.innerWidth, window.innerHeight);


/*-------------------set up stuff------------- */
    
    //Basic stuff setup 
    let height = innerHeight / 14;

    let triGraphic = new PIXI.Graphics();
    triGraphic.beginFill(0x000000);
    triGraphic.drawPolygon([0, 0, innerWidth, 0, innerWidth, height]);
    
    let maskGraphic = new PIXI.Graphics();
    maskGraphic.beginFill(0x8bc5ff);
    maskGraphic.drawRect(0,0,400,400);

    let maskTexture = app.renderer.generateTexture(maskGraphic);
    let maskSprite = new PIXI.Sprite(maskTexture);
    let maskSprite1 = new PIXI.Sprite(maskTexture);
    

    //background drawing
    let bg = new PIXI.Graphics();
    bg.beginFill(0x00ff00);
    bg.drawPolygon([0, 0, innerWidth, 0, innerWidth, height]);
    bg.beginFill(0x0000ff);
    bg.drawPolygon([0, 0, 0, height, innerWidth, height]);
    bg.drawPolygon([0, height, innerWidth, height, 0, height * 2]);
    bg.beginFill(0x00ff00);
    bg.drawPolygon([0, height * 2, innerWidth, height * 2, innerWidth, height]);

    let bgArr = [];
    for (let i = 0; i < 11; i++){
        bgArr.push(new PIXI.Container().addChild(bg.clone()));
        bgArr[i].y = (height * 2) * (i + 1);
    }

    // let bgBlock = new PIXI.Container();
    // bgBlock.addChild(bg.clone());
    // bgBlock.y = height * 2;
    
    //MASKING
    let tri = [];

    for (let i = 0; i < 4; i++){
        tri.push(triGraphic.clone());
    }

    tri[1].scale.y = -1
    tri[1].scale.x = -1
    tri[1].position.y = height
    tri[1].position.x = innerWidth

    tri[2].scale.x = -1
    tri[2].position.y = height
    tri[2].position.x = innerWidth

    tri[3].scale.y = -1
    tri[3].position.y = height * 2

    let triBg = tri;
    for (let element of triBg){
        container.addChild(element);
    }


    container.addChild(bg)
    // container.addChild(bgBlock);

    for (let i = 0; i < 11; i++){
        container.addChild(bgArr[i])
    }

    container.addChild(maskSprite);
    
    


    //add our button to the stage
    app.stage.addChild(container);

    //add our app to html
    document.body.appendChild(app.view);

    app.ticker.add((delta) => {
        // use delta to create frame-independent transform

        let currentTime = new Date();

        let seconds = currentTime.getSeconds();
        let minutes = currentTime.getMinutes();
        let hours = currentTime.getHours();
        let ampm;

        if (hours < 12) {
            ampm = 'pm';
        } else if (hours >= 12){
            ampm = 'am';
        }

        maskSprite.mask = tri[1];
        maskSprite1.mask = tri[0];
    

        maskSprite.width = seconds * (innerWidth/60)
        maskSprite1.width = minutes * (innerWidth/60)


        

        

    });

}

main();

