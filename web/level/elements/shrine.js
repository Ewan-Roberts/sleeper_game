'use strict';

const { collisions } = require('../../engine/pixi_containers');
const { Inventory  } = require('../../character/attributes/inventory');
const { Sprite, Texture } = require('pixi.js');

class Shrine extends Sprite {
  constructor(data) {
    super(Texture.fromImage(data.image_name || 'bunny'));
    this.id          = data.id;
    this.inventory   = new Inventory();
    this.height      = data.height;
    this.width       = data.width;
    this.rotation    = data.rotation * (Math.PI/180);
    this.tint        = 0xA9A9A9;
    this.interactive = true;

    this.anchor.set(0, 1);
    this.position.copy(data);

    collisions.addChild(this);
  }

  give_blood(vial) {
    if(vial) this.inventory.give_item(vial);
  }

  get enough_blood() {
    return (this.inventory.size > 1);
  }
}

module.exports = {
  Shrine,
};
