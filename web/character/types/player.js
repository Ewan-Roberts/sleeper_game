'use strict';

const { world     } = require('../../engine/shadows');

const { Character } = require('../character_model');
const { Human     } = require('../animations/character');

const { Keyboard  } = require('../attributes/keyboard');
const { Mouse     } = require('../attributes/mouse');
const { Inventory } = require('../attributes/inventory');
const { Vitals    } = require('../attributes/vitals');
const { Status    } = require('../attributes/status_bar');

class Player extends Character {
  constructor() {
    super();
    this.name = 'player';
    this.sprite.name = 'player';

    this.add_component(new Human(this.sprite));
    //TODO this is good to not couple this to inventory looks weird think about it
    this.animation.weapon = 'bow';
    this.add_component(new Vitals(this));
    this.add_component(new Inventory());
    this.add_component(new Keyboard(this));
    this.add_component(new Mouse(this));
    this.add_component(new Status());

    world.addChild(this.sprite);
  }
}

module.exports = {
  Player,
};
