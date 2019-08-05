const { collisions } = require('../../engine/pixi_containers');
const { items } = require('../../engine/pixi_containers');
const { Inventory  } = require('../../character/attributes/inventory');
const { Element    } = require('./model');
const { Sprite, Texture, DEG_TO_RAD } = require('pixi.js');
const { sound } = require('pixi.js');
const { tweenManager } = require('pixi.js');
const { Button    } = require('../../view/button');
const { Caption   } = require('../../view/caption');

class Shrine extends Element {
  constructor(data) {
    super(data);
    this.inventory   = new Inventory();
    this.interactive = true;

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

    this.anchor.set(0, 1);
    this.position.copy(data);
    this.label(data);

    items.addChild(this);

    this.tween = tweenManager.createTween();
    this._set_sounds();
    this.make_empty();

    this.on('click', () => this.state_handler());
  }

  make_empty() {
    this.button.action_label.text = 'Fill';
    this._fuel = 0;
    this.state = 'empty';
    this.running_sound.stop();
  }

  make_ready() {
    if(this._fuel <=0) return Caption.render('No fuel');
    this.button.action_label.text = 'Start';
    this.running_sound.stop();
    this.state = 'ready';
  }

  make_running() {
    this.button.action_label.text = 'Turn off';
    this.state = 'running';
    this.tween.time = 400 * this._fuel;
    this.tween.start();
    this.running_sound.play();
    this.tween.on('end', () => this.make_empty());
  }

  state_handler() {
    switch(this.state) {
      case 'running' : return this.make_ready();
      case 'ready'   : return this.make_running();
      case 'empty'   : return this.make_ready();
    }
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
