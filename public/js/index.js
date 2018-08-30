const   PIXI = require('pixi.js'),
        io = require('socket.io-client'),
        Viewport = require('pixi-viewport'),
        tween = require('pixi-tween'),
        Layer = require('pixi-layers'),
        // light = require('./lights/lights.js'),
        // bedroom = require("./level/bedroom/level_layout.js"),
        debug = require("./level/debug/debug_layout.js"),
        // items = require("./level/bedroom/items.js"),
        player = require("./player/player.js")

        // ,core = require("./front_end.js")

global.socket = io.connect();

global.socket.on("thing", res => console.log(res))

// global.socket.on("container_contents", items => {

//     // console.log(items)

//     // items.contents[0].img.height = items.contents[0].img.height *2
//     // items.contents[0].img.width = items.contents[0].img.height*2 
//     // $("#slot_1").attr("src",items.contents[0].img);
//     // $("#slot_2").attr("src",items.contents[1].img);

// })

global.socket.on("player_data", res => {

    console.log("HIH2")

})

global.bedroom_segments = [];
global.bedroom_segments = [

    // Border
    {a:{x:0,y:0}, b:{x:3550,y:0}},
    {a:{x:3550,y:0}, b:{x:3550,y:5000}},
    {a:{x:3550,y:5000}, b:{x:0,y:5000}},
    {a:{x:0,y:5000}, b:{x:0,y:0}},

];

// add the viewport to the stage
global.app = new PIXI.Application({ 
    width: window.innerWidth/2,         // default: 800
    height: window.innerHeight/2,        // default: 600
    antialias: false,    // default: false
});


global.app.renderer.backgroundColor = 0xC1C1C1
global.app.renderer.autoResize = true;
document.body.appendChild(global.app.view);

global.viewport = new Viewport({
    screenWidth: window.innerWidth/2,
    screenHeight: window.innerHeight/2,
    worldWidth: window.innerWidth/2,
    worldHeight: window.innerHeight/2
});

global.app.stage.addChild(viewport);
viewport.drag().decelerate();

global.collisionItems = new PIXI.Container();
global.movableItems = new PIXI.Container();
global.doors = new PIXI.Container();
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






















