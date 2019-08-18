const { collisions } = require('../../engine/pixi_containers');
const { items } = require('../../engine/pixi_containers');
const { Inventory  } = require('../../character/attributes/inventory');
const { Element    } = require('./model');
const { sound      } = require('pixi.js');
const { tweenManager } = require('pixi.js');
const { Button     } = require('../../view/button');
const { Caption    } = require('../../view/caption');

class Shrine extends Element {
  constructor(data) {
    super(data);
    this.inventory   = new Inventory();
    this.interactive = true;
    this.max = 100;

    collisions.addChild(this);
  }

  give_blood(vial) {
    if(vial) this.inventory.give_item(vial);
  }

  get enough_blood() {
    return (this.inventory.size > 1);
  }
}

class Generator extends Element {
  constructor(data) {
    super(data);
    this.inventory   = new Inventory();
    this.tint        = 0xA9A9A9;
    this.interactive = true;
    this._fuel = 0;

    this.label(data);

    items.addChild(this);

    this.tween = tweenManager.createTween();
    this._set_sounds();
    this.empty();

    this.on('click', () => this.state_handler());
  }

  empty() {
    this.button.action_label.text = 'Fill';
    this._fuel = 0;
    this.state = 'empty';
    this.running_sound.stop();
  }

  ready() {
    if(this._fuel <=0) return Caption.render('No fuel');
    this.button.action_label.text = 'Start';
    this.running_sound.stop();
    this.state = 'ready';
  }

  run() {
    this.button.action_label.text = 'Turn off';
    this.state = 'running';
    this.tween.time = 400 * this._fuel;
    this.tween.start();
    this.running_sound.play();
    this.tween.on('end', () => this.empty());
  }

  end(func) {
    this.tween.on('end', () => func);
  }

  state_handler() {
    switch(this.state) {
      case 'running' : return this.ready();
      case 'ready'   : return this.running();
      case 'empty'   : return this.ready();
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
    if((this._fuel + value) > this.max) {
      return Caption.render('No fuel');
    }

    this._fuel = value;
  }

  // TODO This is repeated in a few places
  label(data) {
    this.tint = 0xd3d3d3;
    this.button = new Button(this, data);
  }
}

module.exports = {
  Shrine,
  Generator,
};
