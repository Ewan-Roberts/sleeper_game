'use strict';

const { viewport  } = require('../../engine/viewport.js');
const { PlayerVisualModel } = require('../../engine/inventory_manager');

const character_animations = require('./animations/character');

const { Character } = require('../character_model');

const { Keyboard      } = require('../attributes/keyboard');
const { Mouse         } = require('../attributes/mouse');
const { Vitals        } = require('../attributes/vitals');
const { Predator      } = require('../attributes/predator');
const { Status_Meter  } = require('../attributes/status_bar');

class Player extends Character {
  constructor() {
    super();
    this.name = 'player';

    this.sprite = character_animations.animated.knife.walk;
    this.sprite.animations = character_animations;
    this.sprite.anchor.set(0.5);
    this.sprite.play();
    this.sprite.height /= 2;
    this.sprite.width /= 2;

    this.addComponent(new Predator(this));
    this.addComponent(new Mouse(this));
    this.addComponent(new Keyboard(this));
    this.addComponent(new PlayerVisualModel(this));
    this.addComponent(new Vitals());
    this.addComponent(new Status_Meter());

    viewport.addChild(this.sprite);
  }
}

module.exports = {
  Player,
};
