'use strict';

const { viewport  } = require('../../engine/viewport.js');
const { construct } = require('../../engine/constructor');
const { Keyboard  } = require('../../engine/keyboard');
const { Mouse     } = require('../../engine/mouse');

const character_animations = require('./animations/character');

const { find_weapon_by_name } = require('../../items/item_data');

const { Character } = require('../character_model');
const { Vitals    } = require('../attributes/vitals');
const { Inventory } = require('../attributes/inventory');
const { Predator  } = require('../attributes/predator');

class Player extends construct(Character, Keyboard, Mouse, Inventory, Vitals, Predator) {
  constructor() {
    super();
    this.sprite = character_animations.animated.knife.walk;
    this.sprite.animations = character_animations;
    this.sprite.anchor.set(0.5);
    this.sprite.play();

    const knife = find_weapon_by_name('rusty_knife');
    this.equip_item(knife);

    this.name = 'player';
    this.sprite.height /= 2;
    this.sprite.width /= 2;
    this.sprite.inventory = new Inventory();

    viewport.on('mouseup', (event) => {
      this.mouse_up(event);
    });

    viewport.on('mousemove', (event) => {
      this.mouse_move(event);
    });

    viewport.on('mousedown', (event) => {
      this.mouse_down(event);
    });

    global.window.addEventListener('keydown', (event) => {
      this.key_down(event);
    });

    global.window.addEventListener('keyup', () => {
      this.key_up();
    });

    viewport.addChild(this.sprite);
  }
}

module.exports = {
  Player,
};
