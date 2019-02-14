'use strict';

const PIXI = require('pixi.js');

const { visual_effects_container } = require('../engine/pixi_containers');

class icon {
  static add_image_at(image, point) {
    this.icon = PIXI.Sprite.fromFrame(image);
    this.icon.anchor.set(0.5);
    this.icon.alpha  = 1;
    this.icon.height = 20;
    this.icon.width  = 20;
    this.icon.position.set(point.x +20, point.y-20);

    visual_effects_container.addChild(this.icon);
  }

  static remove() {
    visual_effects_container.removeChild(this.icon);
  }

}

module.exports = {
  icon,
};
