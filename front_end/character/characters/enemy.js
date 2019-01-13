'use strict';

const { viewport  } = require('../../engine/viewport');
const { construct } = require('../../engine/constructor');

const { Character } = require('../character_model');
const { Vitals    } = require('../attributes/vitals');
const { Predator  } = require('../attributes/predator');

const enemy_container = viewport.getChildByName('enemy_container');

class Enemy extends construct(Character, Vitals, Predator) {
  constructor() {
    super();
    this.name = 'enemy';

    enemy_container.addChild(this.sprite);
  }
}


module.exports = {
  Enemy,
};
