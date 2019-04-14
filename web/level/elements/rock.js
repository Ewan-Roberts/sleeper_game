'use strict';
const { collision_container } = require('../../engine/pixi_containers');

const { Item } = require('./item_model');

class Rock extends Item {
  constructor(options) {
    super(options.image_name);
    this.name = 'rock';

    this.sprite.fade_opacity = options.fade;

    collision_container.addChild(this.sprite);
  }
}

module.exports = {
  Rock,
};
