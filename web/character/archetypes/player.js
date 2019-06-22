'use strict';

const { extras, Texture } = require('pixi.js');
const { players         } = require('../../engine/pixi_containers');
const { PlayerEvents    } = require('../../engine/item_handler');
const { Keyboard        } = require('../attributes/keyboard');
const { Mouse           } = require('../attributes/mouse');
const { Inventory       } = require('../attributes/inventory');
const { Vitals          } = require('../attributes/vitals');
const { Animation       } = require('../animations/human');

const create_texture = (name, i) => Array(i).fill(name).map((filler,j) => Texture.fromFrame(j<10?filler+'0'+j:filler+j));
const nothing_idle = create_texture('Armature_nothing_idle_', 37);

class Player extends extras.AnimatedSprite {
  constructor() {
    super(nothing_idle);
    this.id   = 1;
    this.name = 'player';

    this.width  /= 6;
    this.height /= 6;
    this.anchor.set(0.5);
    this.animationSpeed = 0.70;

    this.add_component(new Animation(this));
    this.add_component(new Inventory());
    this.add_component(new Vitals(this));
    this.add_component(new Keyboard(this));
    this.add_component(new Mouse(this));
    this.add_component(new PlayerEvents(this));

    players.addChild(this);
  }

  destroy() {
    players.removeChild(this);
    this.keyboard.destroy();
    this.mouse.destroy();
  }

  add_component(component) {
    this[component.name] = component;
  }
}

module.exports = {
  Player,
};

