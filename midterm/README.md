# Midterm

## Random Walker

I tried to use random walk and perlin noise to make dynamic mask that reveals a picture from NASA's [APOD](https://api.nasa.gov)

### BUT

I could not successfullly load image from an url to my pixi app

so...the background is now a solid color that can be manipulated with dat.gui

You can click anywhere on the page to generate new set of lines
You can change the thickness of new lines with dat.gui

## Things that did not work

### Using image from an external URL as pixi texture
```
    let space = new PIXI.Sprite(
        app.loader.resources[spaceUrl].texture
    );
    master.addChild(space)
    //results in error when I try to add the sprite to the app
```

### Changing the background to random color upon mouse drag
```
function onDrag(){

    if (mouseState){
        console.log('dragging')
        let hexCode = (Math.random()*0xFFFFFF<<0).toString(16)
        console.log(hexCode)
        let tempColor = '0x' + hexCode
        bg.clear()
        bg.beginFill(tempColor);
        //color won't change
        bg.drawRect(0,0,window.innerWidth,window.innerHeight);
    }
    
}
```

## Reference or Helpful Links
[perlin.js](https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-946/perlin.js)

[tutorial: generative art with random walker using p5.js](https://www.generativehut.com/post/random-walkers)

[coding train: random walker](https://www.youtube.com/watch?v=bqF9w9TTfeo&list=PLfVCePkKDSvNtBFzpdwN6D8pLHHL0W8U3&index=11)

[coding train: perlin noise](https://www.youtube.com/watch?v=y7sgcFhk6ZM&list=PLRqwX-V7Uu6bgPNQAdxQZpJuJCjeOr7VD&index=3)

[cool pixi.js noise project](https://codepen.io/ThomasClaude/pen/GQMbaJ)

