'use strict';
const { Sprite } = require('pixi.js');
const { radian } = require('../utils/math');
const { Tween  } = require('./tween');

const { items } = require('./pixi_containers');
const { collisions } = require('./pixi_containers');
const { enemys } = require('./pixi_containers');
const { players } = require('./pixi_containers');

const objects  = collisions.children;
const enemies  = enemys.children;
const players1  = players.children;

class Arrow {
  constructor() {
    this.name = 'arrow';
    this.sprite = new Sprite.fromFrame('arrow');
    this.sprite.width  /= 6;
    this.sprite.height /= 6;
    this.sprite.anchor.set(0.65);

    this.tween = new Tween(this.sprite);
    items.addChild(this.sprite);
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

  arrow.tween.movement.on('update', () => {
    const arrow_point = arrow.sprite.getGlobalPosition();

    const collision_object = objects.find(object => object.containsPoint(arrow_point));
    if (collision_object) {
      arrow.tween.stop();
      if(collision_object.events) {
        collision_object.events.emit('damage', damage);
      }
      return;
    }

    const collision_enemies = enemies.find(enemy => enemy.containsPoint(arrow_point));
    if (collision_enemies) {
      if(collision_enemies.id === origin.id) return;

      arrow.tween.stop();
      collision_enemies.events.emit('damage', damage);
      return;
    }

    const collision_players = players1.find(player=> player.containsPoint(arrow_point));
    if (collision_players) {
      if(collision_players.id === origin.id) return;

      arrow.tween.stop();
      collision_players.events.emit('damage', damage);
      return;
    }
  });

  arrow.tween.start();
}

module.exports = {
  shoot_arrow,
};

