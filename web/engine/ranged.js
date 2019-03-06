'use strict';
const PIXI                 = require('pixi.js');

const { radian              } = require('../utils/math');
const { Tween               } = require('./tween');

const { arrow_container     } = require('./pixi_containers');
const { collision_container } = require('./pixi_containers');
const { enemy_container     } = require('./pixi_containers');
const { critter_container   } = require('./pixi_containers');

class Arrow {
  constructor() {
    this.name = 'arrow';

    this.sprite = new PIXI.Sprite.fromFrame('arrow');
    this.sprite.anchor.set(0.65);
    this.tween  = new Tween(this.sprite);

    arrow_container.addChild(this.sprite);
  }

  set rotation(value) {
    this.sprite.rotation = value;
  }
}

function shoot_arrow(speed, damage, origin, point) {
  const arrow    = new Arrow();
  arrow.rotation = radian(point, origin);
  arrow.tween.from(origin);
  arrow.tween.to(point);
  arrow.tween.time = speed;

  const objects  = collision_container.children;
  const enemies  = enemy_container.children;
  const critters = critter_container.children;

  function boxesIntersect(ab, bb) {
    return ab.x + ab.width > bb.x &&
      ab.x < bb.x + bb.width &&
      ab.y + ab.height > bb.y &&
      ab.y < bb.y + bb.height;
  }
  // TODO this is a fresh load of bullshit
  arrow.tween.movement.on('update', () => {
    const collision_object = objects.find(object =>
      object.containsPoint(arrow.sprite.getGlobalPosition()));
    if (collision_object) {
      collision_object.events.emit('damage', damage);
      arrow.tween.stop();
    }

    const collision_critter = critters.find(critter =>
      critter.containsPoint(arrow.sprite.getGlobalPosition()));
    if (collision_critter) {
      arrow.tween.stop();
      collision_critter.events.emit('damage', damage);
    }

    const collision_enemies = enemies.find(enemy => boxesIntersect(arrow.sprite, enemy));
    if (collision_enemies) {
      if(collision_enemies.id === origin.id) return;

      arrow.tween.stop();
      collision_enemies.events.emit('damage', damage);
    }
  });

  arrow.tween.start();
}

module.exports = {
  shoot_arrow,
};

