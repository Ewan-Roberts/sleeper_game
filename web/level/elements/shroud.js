'use strict';
const { shroud_container } = require('../../engine/pixi_containers');

const { Item } = require('./item_model');

class Shroud extends Item {
  constructor(options) {
    super(options);

    this.sprite.interactive = true;
    this.sprite.fade_opacity = options.properties.fade;
    this.sprite.remove_on_enter = options.properties.remove_on_enter;
    this.anchor = 0;

    shroud_container.addChild(this.sprite);
  }
}

module.exports = {
  Shroud,
};
