'use strict';
const PIXI                 = require('pixi.js');

const { radian           } = require('../utils/math');
const { arrow_container  } = require('./pixi_containers');
const { Entity_Container } = require('./entity_container.js');

class Arrow {
  constructor() {
    this.sprite = new PIXI.Sprite.fromFrame('arrow');
    //const arrow_embedded = PIXI.Sprite.fromFrame('arrow_embedded');
    this.sprite.name = 'arrow';
    this.sprite.anchor.set(0.95);
    this.sprite.height *= 2;

    arrow_container.addChild(this.sprite);
  }
}

function create_rotated_arrow(origin, target) {
  const arrow = new Arrow();
  arrow.sprite.rotation = radian(target, origin);
  return arrow.sprite;
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

/*
 * @params {Character} - origin model
 * @params {Point}     - point (x,y)
 * @params {number}    - power
 */
function shoot_arrow_with_collision(origin, point) {
  const { speed, damage } = origin.inventory.ranged_weapon;
  const arrow       = create_rotated_arrow(origin.sprite, point);
  const arrow_path  = create_arrow_path(origin.sprite, point);
  const arrow_tween = create_arrow_tween(arrow, speed, arrow_path);

  const entities = Entity_Container.get();
  arrow_tween.on('update', () => {
    const arrow_point = arrow.getGlobalPosition();
    const enemy = entities.find(entity => entity.sprite.containsPoint(arrow_point));
    if(enemy) {
      arrow_tween.stop();
      enemy.vitals.damage(damage);

      arrow.destroy();
      return;
    }
  });
}

/*
 * @params {Character} - origin model
 * @params {Character} - target model
 * @params {number}    - power
 */
function shoot_arrow(origin, target) {
  const { speed, damage } = origin.inventory.ranged_weapon;
  const arrow       = create_rotated_arrow(origin.sprite, target.sprite);
  const arrow_path  = create_arrow_path(origin.sprite, target.sprite);
  const arrow_tween = create_arrow_tween(arrow, speed, arrow_path);

  arrow_tween.on('update', () => {
    const arrow_point = arrow.getGlobalPosition();

    if(target.sprite.containsPoint(arrow_point)) {
      arrow_tween.stop();
      arrow.destroy();
      target.vitals.damage(damage);
      return;
    }
  });
}

module.exports = {
  shoot_arrow,
  shoot_arrow_with_collision,
};

