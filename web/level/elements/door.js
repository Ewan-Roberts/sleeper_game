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

    this.add_component(new Tween(this.sprite, this.shade));

    this.click = () => {
      const current_rotation = this.sprite.rotation;
      this.tween.no_path_from({ rotation: current_rotation });
      this.tween.no_path_to({ rotation: current_rotation+3 });
      this.tween.no_path_time = 2000;
      this.tween.no_path_start();

    };

    collision_container.addChild(this.sprite);
  }
}

module.exports = {
  Door,
};
