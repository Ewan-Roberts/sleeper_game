'use strict';
const { collisions } = require('../../engine/pixi_containers');

const { Sprite, Texture } = require('pixi.js');
const { Tween  } = require('../../engine/tween');
const { Button } = require('../../view/button');

const { damage_events        } = require('../../engine/damage_handler');
const { Floor } = require('./floor');

class Door extends Sprite {
  constructor(data) {
    const {image_name} = data;
    super(Texture.fromImage(image_name));

    this.height = data.height;
    this.width  = data.width;
    this.rotation = data.rotation * (Math.PI/180);
    this.alpha    = data.properties && data.properties.alpha || 0.3;

    this.anchor.set(0, 1);
    this.position.copy(data);
    this.interactive = true;

    if(data.properties.label) {
      this.interactive = true;
      this.button = new Button(data.properties);
      this.button.visible = false;
      this.on('mouseover', () => {
        this.button.set_position(this);
        this.button.visible = true;
      });
      this.on('mouseout', () => {
        this.button.visible = false;
      });
    }

    if(data.properties.clickable) {
      this.tween = new Tween(this);
      this.click = () => {
        const current_rotation = this.rotation;
        this.tween.from({ rotation: current_rotation });
        this.tween.to({ rotation: current_rotation+2 });
        this.tween.smooth();
        this.tween.time = 1000;
        this.tween.start();
        if(this.button) this.button.remove();
      };
    }

    if(data.properties.door) {
      this.door = true;
      this.health = data.properties.health || 50;

      damage_events.on('damage_tile', ({door_tile, damage}) => {
        door_tile.alpha = 0.6;
        if(door_tile.id === this.id) {
          if(this.health < 30) {
            delete door_tile.door;
            this.visible = false;
            const broken_door = new Floor({
              image_name: 'door_broken',
            });

            broken_door.position.copy(this);
          }
          this.health -= damage;
        }
      });
    }

    collisions.addChild(this);
  }
}

module.exports = {
  Door,
};
