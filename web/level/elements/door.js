'use strict';
const { collisions } = require('../../engine/pixi_containers');
const { tweenManager } = require('pixi.js');

const { Sprite, Texture } = require('pixi.js');
const { Button } = require('../../view/button');
const { Caption } = require('../../view/caption');
const PIXI = require('pixi.js');

const { damage_events } = require('../../engine/damage_handler');
const { Floor } = require('./floor');

class Door extends Sprite {
  constructor(data) {
    super(Texture.fromImage(data.image_name));
    this.id     = data.id;
    this.height = data.height;
    this.width  = data.width;
    this.rotation = data.rotation * (Math.PI/180);

    this.anchor.set(0, 1);
    this.position.copy(data);

    collisions.addChild(this);

    const {properties} = data;
    if(!properties) return;
    this.alpha = properties.alpha || 1;

    if(properties.clickable) {
      this.tween = tweenManager.createTween(this);
      this.on('click', () => {
        if(this.opened) return this.close();
        this.open();
      });
    }

    if(properties.dialog_on_click) {
      this.on('click', () => {
        Caption.render(properties.dialog_on_click);
        PIXI.sound.play('wood_thump');
      });
    }

    if(properties.label) this.button(properties);

    if(properties.door) this.pathfind_logic();
  }


  open() {
    if(this.in_motion) return;
    this.in_motion = true;
    this.tween.clear();
    this.tween.to({ rotation: this.rotation+2 });
    this.tween.time = 500;
    this.tween.start();
    this.tween.on('end', () => {
      this.opened = true;
      this.in_motion = false;
    });
  }

  close() {
    if(this.in_motion) return;
    this.in_motion = true;
    this.tween.clear();
    this.tween.to({ rotation: this.rotation-2 });
    this.tween.time = 500;
    this.tween.start();
    this.tween.on('end', () => {
      this.opened = false;
      this.in_motion = false;
    });
  }

  button(value) {
    const button = new Button(value);
    this.tint = 0xd3d3d3;
    this.on('mouseover', () => {
      this.tint = 0xffffff;
      if(button._destoyed) return;
      button.set_position(this);
      button.visible = true;
    });
    this.on('mouseout', () => {
      this.tint = 0xd3d3d3;
      if(button._destoyed) return;
      button.visible = false;
    });
  }

  pathfind_logic() {
    this.door = true;
    this.health = 50;

    damage_events.on('damage_tile', ({door_tile, damage}) => {
      door_tile.alpha = 0.6;
      if(door_tile.id === this.id) {
        if(this.health < 30) {
          delete door_tile.door;
          this.visible = false;
          const broken_door = new Floor({image_name: 'door_broken'});

          broken_door.position.copy(this);
        }
        this.health -= damage;
      }
    });

  }
}

module.exports = {
  Door,
};
