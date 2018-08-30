
const $     = require('jQuery'),
player      = require("../../player/player.js"),
triggers    = require("../../triggers/triggers.js"),
items      = require("./debug_items.js")

// Intersects  = require('yy-intersects');

global.collisionItems = new PIXI.Container();

global.bedroom_segments = [

  // Border
  {a:{x:0,y:0}, b:{x:3550,y:0}},
  {a:{x:3550,y:0}, b:{x:3550,y:5000}},
  {a:{x:3550,y:5000}, b:{x:0,y:5000}},
  {a:{x:0,y:5000}, b:{x:0,y:0}},

];

const addToSegments = item => {

  global.collisionItems.push(
    {a:{x:item.x,y:item.y+item.height},             b:{x:item.x,y:item.y}},
    {a:{x:item.x,y:item.y},                         b:{x:item.x+item.width,y:item.y}},
    {a:{x:item.x+item.width,y:item.y+item.height},  b:{x:item.x,y:item.y+item.height}},
    {a:{x:item.x+item.width,y:item.y+item.height},  b:{x:item.x+item.width,y:item.y}},
  )

}



const b = new Bump(PIXI);

module.exports.add_floor = () => {
        
  PIXI.loader
  .add('black_wall','images/black_wall.png')
  .load((loader,res)=>{

    const base_rect = PIXI.Sprite.fromImage('images/black_wall.png')
    base_rect.interactive = true
    base_rect.worldVisible = true
    base_rect.rotation = 0.5
    // base_rect.y = 100

    const collision_wall = PIXI.Sprite.fromImage('images/black_wall.png')
    collision_wall.position.set(-1000,600)
    collision_wall.interactive = true
    collision_wall.worldVisible = true
    // collision_wall.rotation = 0.8


    const door = PIXI.Sprite.fromImage('images/black_wall.png')
    // door.position.set(-100,-200)
    door.width /=2
    door.position.x = -100
    door.position.y = -200
    door.interactive = true
    door.worldVisible = true
    // collision_wall.rotation = 0.8

    global.doors.addChild(door)

    // triggers.createTriggerPad(200, 200, 250, 250)
    // .then(pad=>{
        
        
    //     global.viewport.addChild(pad)

    //     pad.on('pointerdown', ()=> {
        
    //         console.log('click')
    
    //     }); 
        
    // })

    global.collisionItems.addChild(base_rect,collision_wall)
    
    player.add_player()
    items.add_items()


    // console.log(wall2)

    // app.ticker.add(delta => {

    // })

  })

}        