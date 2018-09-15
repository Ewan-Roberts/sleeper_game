'use strict';

const player = require("../../player/player.js"),
enemy = require("../../enemies/enemy.js"),
items = require("./debug_items.js"),
doorHelper = require("../../utils/doorHelper.js"),
level_utils = require("../level_utils.js"),
filterUtil = require("../../visual_effects/filterUtils.js"),
dialogUtil = require("../../dialog/dialogUtil.js"),
network_players = require("../../network/network_players.js"),
sprite_animations = require("../../visual_effects/sprite_animations.js"),
rain = require("../../weather/rain.js"),
cutscene_intro = require("../../cutscene/cutscene_intro.js"),
rat  = require("../../animals/rat.js");

global.collisionItems = new PIXI.Container();
global.eventTriggers = new PIXI.Container();

function createPad(x,y) {

  const pad = PIXI.Sprite.fromImage('images/black_dot.png')
  pad.width = 200;
  pad.height = 100;
  pad.position.set(x,y);
  return pad;
  
}

module.exports.add_floor = () => {
        
  PIXI.loader
  .add('black_wall','images/black_wall.png')
  .load((loader,res)=>{

    const slanted_wall = PIXI.Sprite.fromImage('images/black_wall.png')
    slanted_wall.rotation = 0.4
    slanted_wall.position.set(100,100)

    const collision_wall = PIXI.Sprite.fromImage('images/black_wall.png');
    collision_wall.position.set(100,600);
    collision_wall.name = "collision_wall";

    const door = PIXI.Sprite.fromImage('images/black_wall.png')
    door.width /=2
    door.position.set(-100,-200)

    const rat_pad = createPad(-700,200)
    rat_pad.alpha = 0.4;
    rat_pad.fired = false;
    rat_pad.action = () =>{
      
      if(!rat_pad.fired){
        rat_pad.fired = true
        rat.load_rat().then(()=>rat.mouseMove({x:100,y:300},{x:0,y:400}))
      }
      
    }
 
    const enemy_pad = createPad(-950,200)
    enemy_pad.alpha = 0.2;
    enemy_pad.fired = false;
    enemy_pad.action = () =>{
      
      if(!enemy_pad.fired){
        enemy_pad.fired = true
        enemy.enemy_frames().then(()=>enemy.projectileAttack(global.Player.sprite))
      }
      
    }

    const level_load_pad = createPad(-450,200)
    level_load_pad.alpha = 0.6;
    level_load_pad.fired = false;
    level_load_pad.action = () =>{
      
      if(!level_load_pad.fired){
        level_load_pad.fired = true
        level_utils.importBedroomData()
      }
      
    }

    const glitch_pad = createPad(-700,50)
    glitch_pad.alpha = 0.4;
    glitch_pad.fired = false;
    glitch_pad.action = () =>{
      
      if(!glitch_pad.fired){
        glitch_pad.fired = true
        filterUtil.glitch()
      } else {
        filterUtil.clear()
      }
      
    }

    const dialog_pad = createPad(-450,50)
    dialog_pad.alpha = 0.6;
    dialog_pad.fired = false;
    dialog_pad.action = () =>{
      
      if(!dialog_pad.fired){
        dialog_pad.fired = true
        dialogUtil.renderText(global.Player.sprite, 'I am some dialog')
      } else {
        rain.start_rain(0,3400,400,850)
      }
      
    }

    const effect_pad = createPad(-200,200)
    effect_pad.fired = false;
    effect_pad.alpha = 0.8;
    effect_pad.action = () =>{
      
      if(!effect_pad.fired){
        effect_pad.fired = true
        filterUtil.fade_in_black()
      } else {
        filterUtil.fade_out_black()
      }
      
    }

    const animation_pad = createPad(-700,-100)
    animation_pad.fired = false;
    animation_pad.alpha = 0.6;
    animation_pad.action = () =>{
      
      if(!animation_pad.fired){
        animation_pad.fired = true
        sprite_animations.load_flag()
      }
      
    }

    const load_park_pad = createPad(-950,-100)
    load_park_pad.fired = false;
    load_park_pad.alpha = 0.4;
    load_park_pad.action = () =>{
      
      if(!load_park_pad.fired){
        load_park_pad.fired = true
        level_utils.importParkData()
      }
      
    }

    const network_pad = createPad(-450,-100)
    network_pad.fired = false;
    network_pad.alpha = 0.8;
    network_pad.action = () =>{
      
      if(!network_pad.fired){
        network_pad.fired = true
        network_players.load_network_sprite()
      }
      
    }

    const enemy_pathing =createPad(-200,-200)
    enemy_pathing.fired = false;
    enemy_pathing.alpha = 0.8;
    enemy_pathing.action = () =>{
      
      if(!enemy_pathing.fired){

        enemy_pathing.fired = true
        enemy.enemy_frames()
        .then(()=>{
          const level_path_data = level_utils.importEnemyPathData();
          enemy.enemy_path(level_path_data)
        })

      }
      
    }

    const clear_pad = createPad(-200,50)
    clear_pad.fired = false;
    clear_pad.alpha = 0.8;
    clear_pad.action = () =>{

      if(!clear_pad.fired){

        clear_pad.fired = true;
        cutscene_intro.start()
        
      } else {
        filterUtil.clear();
      }
    }

    global.eventTriggers.addChild(
      rat_pad,
      enemy_pad,
      level_load_pad,
      effect_pad,
      clear_pad,
      glitch_pad,
      dialog_pad,
      network_pad,
      animation_pad,
      load_park_pad,
      enemy_pathing
    )

    global.doors.addChild(door);

    global.viewport.updateLayersOrder = function () {
      global.viewport.children.sort(function(a,b) {
          a.zIndex = a.zIndex || 0;
          b.zIndex = b.zIndex || 0;
          return b.zIndex - a.zIndex;
      });
    };

    
    global.viewport.addChild(global.eventTriggers)
    global.collisionItems.zIndex = 1;
    global.collisionItems.addChild(slanted_wall,collision_wall);

    global.viewport.updateLayersOrder();
    player.add_player();
    items.add_items();

  })

}        