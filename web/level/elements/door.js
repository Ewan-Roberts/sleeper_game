'use strict';
const { collision_container } = require('../../engine/pixi_containers');

const { Item  } = require('./item_model');
const { Tween } = require('../../engine/tween');

class Door extends Item {
  constructor(options) {
    super(options.image_name);

    this.shadow = true;
    this.shade.anchor.y= 1;
    this.shade.anchor.x= 0;

    this.sprite_tween = new Tween(this.sprite);
    this.shade_tween = new Tween(this.shade);
    //boobs
    this.click = () => {
      const current_rotation = this.sprite.rotation;
      this.sprite_tween.from({ rotation: current_rotation });
      this.sprite_tween.to({ rotation: current_rotation+3 });
      this.sprite_tween.time = 2000;
      this.sprite_tween.start();

      this.shade_tween.from({ rotation: current_rotation });
      this.shade_tween.to({ rotation: current_rotation+3 });
      this.shade_tween.time = 2000;
      this.shade_tween.start();
    };

    collision_container.addChild(this.sprite);
  }
}

module.exports = {
  Door,
};
