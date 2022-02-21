# Week 2: Iterative Pattern

I drew multiple lines to create a tile which was then repeated by using TilingSprite() 

```typescript

let pattern = new PIXI.Container();
    pattern.addChild(left);
    pattern.addChild(right);

//converts the container into a texture
    let texture = app.renderer.generateTexture(pattern);

//TilingSprite lets you tile a texture
    let tile = new PIXI.TilingSprite(texture,app.renderer.width,app.renderer.height)


[http://scottmcdonnell.github.io/pixi-examples/index.html?s=basics&f=tiling-sprite.js&title=Tiling%20Sprite]()
