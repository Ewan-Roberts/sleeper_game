'use strict';
const event = require('events');
const { collision_container } = require('../../engine/pixi_containers');

const { Item  } = require('./item_model');
const { Tween } = require('../../engine/tween');

class Door extends Item {
  constructor(options) {
    super(options.image_name);

    this.health = 100;
    this.shadow = true;
    this.shade.anchor.y= 1;
    this.shade.anchor.x= 0;

    this.sprite_tween = new Tween(this.sprite);
    this.shade_tween  = new Tween(this.shade);
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
    this.sprite.events = new event();
    if(options.door) {
      this.sprite.door = true;

      this.sprite.events.on('door', () => {
        console.log('hri');
        if(this.health < 0) {
          this.sprite.visible = false;
        }
        this.health -= 60;
      });
    }

    collision_container.addChild(this.sprite);
  }
}

module.exports = {
  Door,
};
