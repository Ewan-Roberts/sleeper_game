'use strict';
const { shroud_container } = require('../../engine/pixi_containers');

const { Item } = require('./item_model');

class Shroud extends Item {
  constructor(options) {
    super(options.image_name);

    this.sprite.fade_opacity = options.fade;
    this.sprite.alpha = 1;
    this.sprite.remove_on_enter = options.remove_on_enter;

    shroud_container.addChild(this.sprite);
  }
}

module.exports = {
  Shroud,
};
