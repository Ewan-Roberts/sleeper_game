'use strict';

const { world     } = require('../../engine/shadows');

const { Character } = require('../character_model');
const { Human     } = require('../animations/character');

const { Keyboard  } = require('../attributes/keyboard');
const { Mouse     } = require('../attributes/mouse');
const { Vitals    } = require('../attributes/vitals');
const { Predator  } = require('../attributes/predator');
const { Status    } = require('../attributes/status_bar');
const { Inventory } = require('../attributes/inventory');

class Player extends Character {
  constructor() {
    super();
    this.name = 'player';
    this.sprite.name = 'player';

    this.add_component(new Human(this.sprite));
    this.animation.weapon = 'bow';
    this.add_component(new Keyboard(this));
    this.add_component(new Mouse(this));
    this.add_component(new Vitals(this));
    this.add_component(new Predator(this));
    this.add_component(new Status());
    this.add_component(new Inventory());

    world.addChild(this.sprite);
  }
}

module.exports = {
  Player,
};
