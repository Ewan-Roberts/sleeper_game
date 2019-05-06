'use strict';
const { collisions    } = require('../../engine/pixi_containers');
const { damage_events } = require('../../engine/damage_handler');

const { Item } = require('./item_model');

class CollisionItem extends Item {
  constructor(options) {
    super(options);
    if(options.properties.shadow) {
      this.shadow = true;
      this.shade.anchor.y = 1;
      this.shade.anchor.x = 0;
    }

    this.health = 100;
    const on_damage = ({id, damage}) => {
      if(this.id !== id) return;
      this.health -= damage;
      if(this.health > 0) return;

      damage_events.removeListener('damage', on_damage);
      this.sprite.destroy();
    };
    damage_events.on('damage', on_damage);

    collisions.addChild(this.sprite);
  }
}

module.exports = {
  CollisionItem,
};
