const { collisions   } = require('../../engine/pixi_containers');
const { items        } = require('../../engine/pixi_containers');
const { Inventory    } = require('../../character/attributes/inventory');
const { Element      } = require('./model');
const { sound        } = require('pixi.js');
const { tweenManager } = require('pixi.js');
const { Button       } = require('../../view/button');
const { Caption      } = require('../../view/caption');

class Shrine extends Element {
  constructor(data) {
    super(data);
    this.inventory   = new Inventory();
    this.interactive = true;
    this.buttonMode  = true;
    this.max         = 100;

    collisions.addChild(this);
  }

  give_blood(vial) {
    if(vial) {
      this.inventory.give(vial);
    }
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
    this.buttonMode  = true;
    this._fuel = 0;
    this._disable = false;

    this.label(data);

    items.addChild(this);

    this.tween = tweenManager.createTween();
    this._set_sounds();
    this.empty();

    this.on('click', () => this.state_handler());
  }

  get is_empty() {
    return (this._fuel <= 0);
  }

  disable() {
    this._disable = true;
    return this;
  }


  empty() {
    this.button.action_label.text = 'Fill';
    this._fuel = 0;
    this.state = 'empty';
    this.running_sound.stop();
  }

  ready() {
    if(this._fuel <= 0) {
      return Caption.render('Its empty...');
    }
    this.button.action_label.text = 'Start';
    this.state                    = 'ready';
    this.running_sound.stop();
  }

  run() {
    this.button.action_label.text = 'Turn off';
    this.state                    = 'running';
    this.tween.time               = 4000 * this._fuel;
    this.tween.start();
    this.running_sound.play();
    this.tween.on('end', () => this.empty());
  }

  end(func) {
    this.tween.on('end', func);
  }

  state_handler() {
    if(this._disable) {
      return;
    }
    switch (this.state) {
      case 'running' : return this.ready();
      case 'ready'   : return this.run();
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
  label({
    label_action,
    label_description,
    label_image,
  }) {
    this.tint = 0xd3d3d3;
    this.button = new Button(this, {
      label_action,
      label_description,
      label_image,
    });
  }
}

module.exports = {
  Shrine,
  Generator,
};
