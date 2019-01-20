'use strict';

const PIXI = require('pixi.js');
const { viewport  } = require('../../engine/viewport.js');
const { construct } = require('../../engine/constructor');

const character_animations = require('../animations/character');

const { Character } = require('../character_model');
const { Keyboard  } = require('../../input/keyboard');
const { Mouse     } = require('../../input/mouse');
const { Vitals    } = require('../attributes/vitals');
const { Inventory } = require('../attributes/inventory');

class Player extends construct(Character, Keyboard, Mouse) {
  constructor() {
    super();
    console.log(this)

    this.sprite = new PIXI.extras.AnimatedSprite(character_animations.knife.idle);
    this.sprite = new PIXI.extras.AnimatedSprite(character_animations.knife.idle);
    this.sprite.animations = character_animations;
    this.sprite.anchor.set(0.5);
    this.sprite.animationSpeed = 0.4;
    this.sprite.play();
    this.name = 'player';
    this.sprite.height /= 2;
    this.sprite.width /= 2;
    this.sprite.status = new Vitals();
    this.sprite.inventory = new Inventory();

    viewport.addChild(this.sprite);
  }

  add_controls() {
    viewport.on('mouseup', (event) => {
      this.mouse_up(event);
    });

    viewport.on('mousemove', (event) => {
      this.mouse_move(event);
    });

    viewport.on('mousedown', (event) => {
      this.mouse_down(event);
    });

    global.document.addEventListener('keydown', (event) => {
      this.key_down(event);
    });

    global.document.addEventListener('keyup', () => {
      this.key_up();
    });
  }
}

module.exports = {
  Player,
};
