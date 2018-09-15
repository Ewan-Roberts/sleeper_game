const PIXI = require('pixi.js'),
      io = require('socket.io-client'),
      Viewport = require('pixi-viewport'),
      tween = require('pixi-tween'),
      Layer = require('pixi-layers'),
      debug = require("./level/debug/debug_layout.js"),
      player = require("./player/player.js");

global.socket = io.connect();

global.socket.on("thing", res => console.log(res))

// add the viewport to the stage
global.app = new PIXI.Application({ 
    width: window.innerWidth,   // default: 800
    height: window.innerHeight, // default: 600
    antialias: false,           // default: false
    autoResize: true,
    backgroundColor: 0xC1C1C1
});
 
document.body.appendChild(global.app.view);

global.viewport = new Viewport({
    screenWidth: window.innerWidth,
    screenHeight: window.innerHeight,
    worldWidth: window.innerWidth,
    worldHeight: window.innerHeight
});

global.app.stage.addChild(viewport);
global.viewport.drag().decelerate();

global.collisionItems = new PIXI.Container();
global.movableItems = new PIXI.Container();
global.doors = new PIXI.Container();
global.layer = new PIXI.display.Layer();
global.layer.group.enableSort = true;

global.viewport.addChild(global.collisionItems,global.movableItems,global.doors)


//LOADER AND ORDER
// bedroom.add_floor()
// .then(()=>console.log("loaded floor"))
// .then(()=>items.add_items())
// .then(()=>console.log("items loaded"))
// .then(()=>player.add_player())
// .then(()=>console.log("player loaded"))
// .then(()=>player.add_player())

debug.add_floor()


// setInterval(global.viewport)

app.ticker.add(delta => {

    PIXI.tweenManager.update();
    // // door_test.rotation += 0.01
    // $(".fps").html("FPS: "+(app.ticker.FPS).toFixed(1));
    // raycast.clear()
    // //fill for shadows
    // raycast.beginFill(0xfffffff,0.14);
    // const uniqueAngles = [];
    // let intersects = [];
    // for(let j=0;j<uniquePoints.length;j++){const uniquePoint = uniquePoints[j];const angle = Math.atan2(uniquePoint.y-global.Player.sprite.y,uniquePoint.x-global.Player.sprite.x);uniquePoint.angle = angle;uniqueAngles.push(angle-0.00001,angle-0.00001,angle+0.00001);}
    // for(let k=0;k<uniqueAngles.length;k++){const angle = uniqueAngles[k];const dx = Math.cos(angle);const dy = Math.sin(angle);const ray = {a:{x:global.Player.sprite.x,y:global.Player.sprite.y},b:{x:global.Player.sprite.x+dx,y:global.Player.sprite.y+dy}};let closestIntersect = null;for(let i=0;i<segments.length;i++){var intersect = getIntersection(ray,segments[i]);if(!intersect) continue;if(!closestIntersect || intersect.param<closestIntersect.param){closestIntersect=intersect;}}if(!closestIntersect) continue;closestIntersect.angle = angle;intersects.push(closestIntersect);}
    // intersects = intersects.sort((a,b)=>a.angle-b.angle);
    // raycast.moveTo(intersects[0].x,intersects[0].y);
    // raycast.lineStyle(1, 0xffd900, 1);
    // for (let i = 1; i < intersects.length; i++) raycast.lineTo(intersects[i].x,intersects[i].y);

});






















