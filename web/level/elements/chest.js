'use strict';
const { item_container } = require('../../engine/pixi_containers');

const { Lootable } = require('../../character/attributes/lootable');
const { Item     } = require('./item_model');

class Chest extends Item {
  constructor(options) {
    super(options.image_name);
    this.name = 'chest';

    if(options.shadow) {
      this.shadow = true;
      this.shade.anchor.y= 1;
      this.shade.anchor.x= 0;
    }

    if(options.container) {
      this.add_component(new Lootable(this));
      this.state  = 'closed';
      this.state_handling = true;
    }

    item_container.addChild(this.sprite);
  }
}

module.exports = {
  Chest,
};
