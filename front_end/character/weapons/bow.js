'use strict';

const PIXI = require('pixi.js');
const viewport = require('../../engine/viewport.js');

const angle = (anchor, point) => Math.atan2( anchor.y - point.y,anchor.x - point.x);

class Arrow {
  constructor() {
    this.sprite = new PIXI.Sprite.fromFrame('arrow');
    this.sprite.name = 'arrow';
    this.sprite.anchor.set(0.95);
    this.sprite.height *= 3;

    viewport.getChildByName('arrow_container').addChild(this.sprite);
  }
}

function create_rotated_arrow(origin, target) {
  const arrow = new Arrow();
  arrow.sprite.rotation = angle(target, origin);
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
      if(!object.hitable_with_arrow) return;

      if(object.containsPoint(arrow_point)){
        arrow_tween.stop();

        return;
      }
    });

    viewport.getChildByName('door_container').children.forEach(door => {
      if(door.containsPoint(arrow_point)) {
        arrow_tween.stop();

        arrow.rotation = angle(target, origin);
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
        arrow.rotation = angle(target, origin);
        critter.kill();
        return;
      }
    });
  });
}

module.exports = {
  arrow_management,
};

