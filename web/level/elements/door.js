'use strict';
const { collisions } = require('../../engine/pixi_containers');

const { Item   } = require('./item_model');
const { Tween  } = require('../../engine/tween');
const { Button } = require('../../view/button');
const { damage_events } = require('../../engine/damage_handler');
const { wood_thump } = require('../../engine/sound');
const { BackgroundVisualItem } = require('./visual_object');

class Door extends Item {
  constructor(options) {
    super(options);

    if(options.properties.label) {
      this.sprite.interactive = true;
      this.button = new Button(options.properties);
      this.button.visible = false;
      this.sprite.on('mouseover', () => {
        this.button.set_position(this.sprite);
        this.button.visible = true;
      });
      this.sprite.on('mouseout', () => {
        this.button.visible = false;
      });
    }

    if(options.properties.clickable) {
      this.sprite_tween = new Tween(this.sprite);
      this.click = () => {
        const current_rotation = this.sprite.rotation;
        this.sprite_tween.from({ rotation: current_rotation });
        this.sprite_tween.to({ rotation: current_rotation+2 });
        this.sprite_tween.smooth();
        this.sprite_tween.time = 1000;
        this.sprite_tween.start();
        if(this.button) this.button.remove();
      };
    }

    if(options.properties.door) {
      this.sprite.door = true;
      this.health = options.properties.health || 50;

      damage_events.on('damage_tile', ({door_tile, damage}) => {
        door_tile.alpha = 1;
        if(door_tile.id === this.id) {
          if(this.health < 30) {
            delete door_tile.door;
            this.sprite.visible = false;
            const broken_door = new BackgroundVisualItem({
              properties: {
                image_name: 'door_broken',
              },
            });
            //wood_thump.volume = 0.3;
            //wood_thump.speed = 5;
            //wood_thump.play();

            broken_door.set_position(this.sprite);
          }
          this.health -= damage;
        }
      });
    }

    collisions.addChild(this.sprite);
  }
}

module.exports = {
  Door,
};
