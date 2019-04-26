'use strict';
const { collision_container } = require('../../engine/pixi_containers');

const { Item  } = require('./item_model');
const { Tween } = require('../../engine/tween');
const { damage_events } = require('../../engine/damage_handler');

class Door extends Item {
  constructor(options) {
    console.log(options);
    super(options.properties.image_name);
    this.id = options.id;
    this.sprite.id = options.id;

    if(options.properties.clickable) {
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
    }

    this.sprite.door = true;
    this.health = 50;

    damage_events.on('damage', ({door_tile, damage}) => {
      door_tile.alpha = 1;
      if(door_tile.id === this.id) {
        this.health -= damage;
        if(this.health < 30) {
          delete door_tile.door;
          this.sprite.visible = false;
        }
        console.log(this.id);
      }
    });

    collision_container.addChild(this.sprite);
  }
}

module.exports = {
  Door,
};
