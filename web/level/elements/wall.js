'use strict';
const { collisions    } = require('../../engine/pixi_containers');
const { damage_events } = require('../../engine/damage_handler');

const { Item } = require('./item_model');

class Wall extends Item {
  constructor(data) {
    data.properties = {
      image_name : 'black_dot',
    };
    super(data);

    this.anchor = 0;
    if(data.options && data.options.hidden) {
      this.alpha = 0;
    }

    this.health = 100;
    const on_damage = ({id, damage}) => {
      if(this.id !== id) return;
      this.health -= damage;
      if(this.health > 0) return;

      this.sprite.destroy();
      damage_events.removeListener('damage', on_damage);
    };
    damage_events.on('damage', on_damage);

    collisions.addChild(this.sprite);
  }
}

module.exports = {
  Wall,
};


