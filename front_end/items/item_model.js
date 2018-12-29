'use strict';

const viewport = require('../engine/viewport.js');

class Item {
  set_position(point) {
    this.sprite.position.set(point.x, point.y);
  }

  with_character_collision() {
    viewport.getChildByName('collision_items').addChild(this.sprite);
  }

  with_projectile_collision() {
    this.sprite.hitable_with_arrow = true;
  }

  without_projectile_collision() {
    this.sprite.hitable_with_arrow = false;
  }

  without_character_collision() {
    viewport.getChildByName('non_collision_items').addChild(this.sprite);
  }

  moveable() {
    this.sprite.moveable = true;
  }

  immovable() {
    this.sprite.moveable = false;
  }

}

module.exports = {
  Item,
};
