'use strict';
const PIXI                 = require('pixi.js');

const { radian              } = require('../utils/math');
const { Tween               } = require('./tween');

const { arrow_container     } = require('./pixi_containers');
const { collision_container } = require('./pixi_containers');

class Arrow {
  constructor() {
    this.name = 'arrow';

    this.sprite = new PIXI.Sprite.fromFrame('arrow');
    this.sprite.anchor.set(0.95);
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

  const objects = collision_container.children;

  arrow.tween.movement.on('update', () => {
    const point = arrow.sprite.getGlobalPosition();

    const collision = objects.every(object => object.containsPoint(point));

    if(collision) arrow.tween.stop();
  });

  arrow.tween.start();
}

module.exports = {
  shoot_arrow,
};

