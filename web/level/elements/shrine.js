const { collisions } = require('../../engine/pixi_containers');
const { items } = require('../../engine/pixi_containers');
const { Inventory  } = require('../../character/attributes/inventory');
const { Sprite, Texture, DEG_TO_RAD } = require('pixi.js');
const { Button    } = require('../../view/button');

class Shrine extends Sprite {
  constructor(data) {
    super(Texture.fromImage(data.image_name || 'bunny'));
    this.id          = data.id;
    this.inventory   = new Inventory();
    this.height      = data.height;
    this.width       = data.width;
    this.rotation    = data.rotation * DEG_TO_RAD;
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

class Generator extends Sprite {
  constructor(data) {
    super(Texture.fromImage(data.image_name || 'bunny'));
    this.id          = data.id;
    this.inventory   = new Inventory();
    this.height      = data.height;
    this.width       = data.width;
    this.rotation    = data.rotation * DEG_TO_RAD;
    this.tint        = 0xA9A9A9;
    this.interactive = true;

    this.anchor.set(0, 1);
    this.position.copy(data);
    this.on('click', ()=>console.log('hting'));
    this.label(data);

    items.addChild(this);
  }

  give_blood(vial) {
    if(vial) this.inventory.give_item(vial);
  }

  get enough_blood() {
    return (this.inventory.size > 1);
  }

  label(data) {
    this.tint = 0xd3d3d3;
    this.button = new Button(data);
    this.on('mouseover', () => {
      this.tint = 0xffffff;
      this.button.set_position(this);
      this.button.visible = true;
    });
    this.on('mouseout', () => {
      this.tint = 0xd3d3d3;
      this.button.visible = false;
    });
    this.on('click', () => {
      this.tint = 0xd3d3d3;
      this.button.visible = false;
    });
  }
}

module.exports = {
  Shrine,
  Generator,
};
