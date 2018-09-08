
const $     = require('jQuery'),
player      = require("../../player/player.js"),
triggers    = require("../../triggers/triggers.js"),
enemy    = require("../../enemies/enemy.js"),
items      = require("./debug_items.js"),
doorHelper      = require("../../utils/doorHelper.js"),
rat         = require("../../animals/rat.js");

global.collisionItems = new PIXI.Container();
global.eventTriggers = new PIXI.Container();

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

    const slanted_wall = PIXI.Sprite.fromImage('images/black_wall.png')
    slanted_wall.interactive = true
    slanted_wall.worldVisible = true
    slanted_wall.rotation = 0.5
    slanted_wall.position.set(100,100)

    const collision_wall = PIXI.Sprite.fromImage('images/black_wall.png');
    collision_wall.position.set(100,600);
    collision_wall.name = "collision_wall";
    collision_wall.interactive = true;
    collision_wall.worldVisible = true;

    const door = PIXI.Sprite.fromImage('images/black_wall.png')
    // door.position.set(-100,-200)
    door.width /=2
    door.position.x = -100
    door.position.y = -200
    door.interactive = true
    door.worldVisible = true
    // collision_wall.rotation = 0.8

    const rat_pad = PIXI.Sprite.fromImage('images/black_wall.png')
    rat_pad.width = 200;
    rat_pad.height = 100;
    rat_pad.position.set(-400,200);
    rat_pad.fired = false;
    rat_pad.action = () =>{
      
      if(!rat_pad.fired){

        rat_pad.fired = true
        rat.load_rat()
        .then(()=>{
          rat.mouseMove({x:100,y:300},{x:0,y:400})
        })
      }
      
    }
 
    const enemy_pad = PIXI.Sprite.fromImage('images/black_wall.png')
    enemy_pad.width = 200;
    enemy_pad.height = 100;
    enemy_pad.position.set(-800,200);
    enemy_pad.fired = false;
    enemy_pad.action = () =>{
      
      if(!enemy_pad.fired){

        enemy_pad.fired = true
        enemy.enemy_frames()
        .then(()=>{
          enemy.enemyMove({x:300,y:600},{x:-300,y:700})
        })
      }
      
    }

    const level_load_pad = PIXI.Sprite.fromImage('images/black_wall.png')
    level_load_pad.width = 200;
    level_load_pad.height = 100;
    level_load_pad.position.set(-1500,200);
    level_load_pad.fired = false;
    level_load_pad.action = () =>{
      
      if(!level_load_pad.fired){

        level_load_pad.fired = true
      }
      
    }

    global.eventTriggers.addChild(rat_pad,enemy_pad,level_load_pad)

    global.doors.addChild(door)

    // triggers.createTriggerPad(200, 200, 250, 250)
    // .then(pad=>{
        
        
    //     global.eventTriggers.addChild(pad)

    //     pad.on('pointerdown', ()=> {
        
    //         console.log('click')
    
    //     }); 
        
    // })

    global.viewport.addChild(global.eventTriggers)

    global.collisionItems.addChild(slanted_wall,collision_wall);
    
    player.add_player();
    items.add_items();

  })

}        