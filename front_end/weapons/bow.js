'use strict';

const PIXI = require('pixi.js');
const viewport = require('../engine/viewport.js');
const { createjs } = require('@createjs/tweenjs');

const arrow_container = new PIXI.Container();
arrow_container.name = 'arrow containter';
arrow_container.zIndex = -10;
viewport.addChild(arrow_container);

function getCenter(o, dimension, axis) {
  if (o.anchor !== undefined) {
    if (o.anchor[axis] !== 0) {
      return 0;
    }
    return dimension / 2;
  }
  return dimension;
}

function get_angle_from_point_to_point(sprite, point){ return Math.atan2(
    (point.y) - (sprite.y + getCenter(sprite, sprite.height, 'y')),
    (point.x) - (sprite.x + getCenter(sprite, sprite.width, 'x'))
  );
};

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


class Arrow {
  constructor() {
    this.sprite = new PIXI.Sprite.fromFrame('arrow');
    this.sprite.name = 'arrow';
    this.sprite.anchor.set(0.95);
    this.sprite.height *= 3;
    this.sprite.zIndex = -40;
    arrow_container.addChild(this.sprite);
  }

}

function create_rotated_arrow(origin, target) {
  const arrow = new Arrow();
  arrow.sprite.rotation = get_angle_from_point_to_point(origin, target);
  return arrow.sprite;
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
function arrow_management(power, origin, target) {
  const arrow       = create_rotated_arrow(origin, target);
  const arrow_path  = create_arrow_path(origin,target);
  const arrow_tween = create_arrow_tween(arrow, power, arrow_path);

  arrow_tween.on('update', () => {
    const arrow_point = arrow.getGlobalPosition();
    viewport.getChildByName('enemy_container').children.forEach(enemy => {
      if(enemy.containsPoint(arrow_point)){
        arrow_tween.stop();

        const arrow_in_enemy = create_embedded_arrow(arrow.rotation);
        arrow.destroy();
        enemy.speak('I am hit');
        enemy.addChild(arrow_in_enemy);

        return;
      }
    });

    viewport.getChildByName('collision_items').children.forEach(object => {
      if(object.containsPoint(arrow_point)){
        arrow_tween.stop();

        return;
      }
    });

    viewport.getChildByName('door_container').children.forEach(door => {
      if(door.containsPoint(arrow_point)) {
        arrow_tween.stop();

        arrow.rotation = get_angle_from_point_to_point(origin, target);
        arrow.width = 600;

        door.rotation += 0.05;
        door.toLocal(new PIXI.Point(0,0), arrow, arrow.position);
        door.addChild(arrow);

        return;
      }
    });

    viewport.getChildByName('critter_container').children.forEach(critter => {
      if(critter.containsPoint(arrow_point)) {
        arrow_tween.stop();
        arrow.rotation = get_angle_from_point_to_point(origin, target);
        arrow.width = 600;
        const tween = createjs.Tween.get(critter);
        tween.pause();
        tween.paused = true;
        tween.wait(2000);
        critter.rotation += 0.05;
        critter.toLocal(new PIXI.Point(0,0), arrow, arrow.position);
        critter.addChild(arrow);
        critter.stop();

        return;
      }
    });
  });
}

// todo move enemy out out of global
function arrow_shoot_from_sprite_to_sprite(origin, target, power) {
  if(!global.is_development) return;

  const arrow       = create_rotated_arrow(origin, target);
  const arrow_path  = create_arrow_path(origin, target);
  const arrow_tween = create_arrow_tween(arrow, power || 2000, arrow_path);

  arrow_tween.on('update', () => {
    const arrow_point = arrow.getGlobalPosition();

    if(global.Player.sprite.containsPoint(arrow_point)) {
      arrow_tween.stop();

      global.Player.vitals.health -=40;

      const arrow_in_player = create_embedded_arrow(arrow.rotation -=3.1);

      // TDOO can i retrofit this
      arrow.destroy();
      // if(global.Player.vitals.health < 40) {

      //   if(global.is_development) {
      //     dialog_util.renderText(global.Player.sprite, 'I am dead home slice');
      //   } else {
      //     // end the game
      //     debugger;
      //   }
      // }

      global.Player.vitals.health -= 40;
      global.Player.sprite.addChild(arrow_in_player);
    }

    for (let i = 0; i < global.collisionItems.children.length; i++) {
      const sprite_in_container = global.collisionItems.children[i];
      if(sprite_in_container.containsPoint(arrow_point)){
        arrow_tween.stop();
      }
    }
  });
}

module.exports = {
  arrow_shoot_from_sprite_to_sprite,
  arrow_management,
};

