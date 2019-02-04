'use strict';

const { viewport  } = require('../../engine/viewport.js');
const { construct } = require('../../engine/constructor');
const { Keyboard  } = require('../../engine/keyboard');
const { Mouse     } = require('../../engine/mouse');
const { PlayerVisualModel } = require('../../engine/inventory_manager');

const character_animations = require('./animations/character');

const { Character } = require('../character_model');
const { Vitals    } = require('../attributes/vitals');
const { Predator  } = require('../attributes/predator');

class Player extends construct(Character, Keyboard, Mouse, PlayerVisualModel, Vitals, Predator) {
  constructor() {
    super();
    this.name = 'player';

    this.sprite = character_animations.animated.knife.walk;
    this.sprite.animations = character_animations;
    this.sprite.anchor.set(0.5);
    this.sprite.play();
    this.sprite.height /= 2;
    this.sprite.width /= 2;

    this.head('old_bandana');
    this.hat('old_helmet');
    this.chest('old_clothes');
    this.shoes('old_boots');
    this.background('merc_portrait');
    this.primary_weapon('wrench_blade');
    this.secondary_weapon('rusty_knife');
    this.inventory_slot('rat_leg_bone', 0);
    this.inventory_slot('rat_femur', 1);
    this.inventory_slot('meat', 2);
    this.inventory_slot('skull_cap_bone', 3);

    viewport.addChild(this.sprite);
  }

  add_controls() {
    viewport.on('mouseup', event => this.mouse_up(event));
    viewport.on('mousemove', event => this.mouse_move(event));
    viewport.on('mousedown', event => this.mouse_down(event));

    global.window.addEventListener('keydown', event => this.key_down(event));
    global.window.addEventListener('keyup', () => this.key_up());
  }
}

module.exports = {
  Player,
};
