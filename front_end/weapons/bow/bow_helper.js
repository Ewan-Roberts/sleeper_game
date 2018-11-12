
const PIXI = require('pixi.js');
const sprite_helper = require('../../utils/sprite_helper.js');
const dialog_util = require('../../dialog/dialog_util.js');
const { kill_enemy } = require('../../enemies/enemy.js');

const arrow_container = new PIXI.Container();
arrow_container.name = 'arrow containter';
global.viewport.addChild(arrow_container);

// const arrowSounds = [
//   new Audio('audio/arrow_hit_00.wav'),
//   new Audio('audio/arrow_hit_01.wav'),
//   new Audio('audio/arrow_hit_02.wav'),
//   new Audio('audio/arrow_hit_03.wav'),
//   new Audio('audio/arrow_hit_04.wav'),
//   new Audio('audio/arrow_hit_05.wav'),
//   new Audio('audio/arrow_hit_06.wav'),
//   new Audio('audio/arrow_hit_07.wav'),
// ];

function create_arrow() {
  const arrow = PIXI.Sprite.fromFrame('arrow');
  arrow.name = 'arrow';
  
  if(global.is_development){
    // make em huge, easier to see  
    arrow.height *= 3
    //TODO needs to go into arrow container but its greyed out if you do
    global.viewport.addChild(arrow);
  } else {
    arrow.width /= 2;
    arrow.height /= 3;
    arrow_container.addChild(arrow);
  }
  
  return arrow;
}

function create_rotated_arrow(origin, target) {
  const arrow = create_arrow();
  arrow.rotation = sprite_helper.angle(origin, target);
  return arrow;
}

function create_embedded_arrow(rotation) {
  const arrow_embedded = PIXI.Sprite.fromFrame('arrow_embedded');

  arrow_embedded.anchor.set(0.9);
  arrow_embedded.rotation = rotation;
  return arrow_embedded;
}

function create_arrow_path(origin, target) {
  const arrow_path = new PIXI.tween.TweenPath()
    .moveTo(origin.x, origin.y)
    .lineTo(target.x, target.y);
  
  return arrow_path;
}

function create_arrow_tween(arrow, power, arrow_path) {
  const arrow_tween = PIXI.tweenManager.createTween(arrow);

  arrow_tween.path = arrow_path;
  arrow_tween.time = power;
  arrow_tween.easing = PIXI.tween.Easing.linear();
  arrow_tween.start();

  return arrow_tween;
}

// todo move enemy out out of global 
module.exports.arrowManagement = (power, origin, target) => {

  const arrow       = create_rotated_arrow(origin, target);
  const arrow_path  = create_arrow_path(origin,target);
  const arrow_tween = create_arrow_tween(arrow, power, arrow_path);
  
  arrow_tween.on('update', () => {

    for (let i = 0; i < global.enemy_container.children.length; i++) {
      const sprite_in_container = global.enemy_container.children[i];
      
      if(sprite_in_container.containsPoint(arrow.getGlobalPosition())){
        arrow_tween.stop();

        const arrow_in_enemy = create_embedded_arrow(arrow.rotation -=3.1);
        
        // TDOO can i retrofit this
        arrow.destroy();
        if(sprite_in_container.vitals.health < 40) {
          
          if(global.is_development) {
            dialog_util.renderText(sprite_in_container, 'I am dead home slice');

            kill_enemy(sprite_in_container);
          } else {
            dialog_util.renderText(sprite_in_container, 'I am hit');
            kill_enemy(sprite_in_container);
            sprite_in_container.destroy()
          }
        }

        sprite_in_container.vitals.health -= 40;
        sprite_in_container.addChild(arrow_in_enemy)
      }
    }

    for (let i = 0; i < global.collisionItems.children.length; i++) {
      const sprite_in_container = global.collisionItems.children[i];
  
      if(sprite_in_container.containsPoint(arrow.getGlobalPosition())){
        console.log('hit on collision item');
        arrow_tween.stop()
      }
    }
  });
};

// todo move enemy shout out of global 
module.exports.arrow_shoot_from_sprite_to_sprite = (power, origin, target) => {
  if(!global.is_development) return;
  
  const arrow       = create_rotated_arrow(origin, target);
  const arrow_path  = create_arrow_path(origin,target);
  const arrow_tween = create_arrow_tween(arrow, power, arrow_path);

  arrow_tween.on('update', () => {

    if(global.Player.sprite.containsPoint(arrow.getGlobalPosition())) {
      console.log('hitting player')
      arrow_tween.stop();

      global.Player.vitals.health -=40
      
      const arrow_in_player = create_embedded_arrow(arrow.rotation -=3.1);

      // TDOO can i retrofit this
      arrow.destroy();
      if(global.Player.vitals.health < 40) {
        
        if(global.is_development) {
          dialog_util.renderText(global.Player.sprite, 'I am dead home slice');
        } else {
          // end the game
          debugger;
        }
      }

      global.Player.vitals.health -= 40;
      global.Player.sprite.addChild(arrow_in_player)
    }
  })
};
