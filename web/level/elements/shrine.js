const { collisions } = require('../../engine/pixi_containers');
const { items } = require('../../engine/pixi_containers');
const { Inventory  } = require('../../character/attributes/inventory');
const { Sprite, Texture, DEG_TO_RAD } = require('pixi.js');
const { sound } = require('pixi.js');
const { tweenManager } = require('pixi.js');
const { Button    } = require('../../view/button');
const { Caption   } = require('../../view/caption');

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
    this._fuel = 0;
    this.active = false;

    this.anchor.set(0, 1);
    this.position.copy(data);
    this.label(data);
    this.fuel_level = 0;

    items.addChild(this);

    this.tween = tweenManager.createTween();
    this._set_sounds();

    this.click = () => this.turn_on();
  }


  state_handler() {
    // if empty allow to be filled (label update)
    // If it has fuel turn on (label update)
    // After the fuel runs out turn off (label update)
    // if clicked show fuel bar (label update)
  }

  _set_sounds() {
    this.running_sound = sound.find('generator_sound');
    this.running_sound.volume = 0.1;
    this.running_sound.loop = true;
  }

  get fuel() {
    return this._fuel;
  }

  set fuel(value) {
    this._fuel = value;
  }

  turn_on() {
    if(this._fuel <= 0) return Caption.render('Its empty');
    if(this.active) return;
    this.active = true;

    this.running_sound.play();

    this.tween.time = 900 * this._fuel;
    this.tween.start();
    this.tween.on('end', () => {
      this._fuel = 0;
      this.active = false;
      this.running_sound.stop();
    });
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
