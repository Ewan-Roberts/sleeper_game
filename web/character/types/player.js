'use strict';

const { world     } = require('../../engine/shadows');

const { Character } = require('../character_model');
const { Human     } = require('../animations/human');

const { Keyboard  } = require('../attributes/keyboard');
const { Mouse     } = require('../attributes/mouse');
const { Inventory } = require('../attributes/inventory');
const { Vitals    } = require('../attributes/vitals');
const { Status    } = require('../attributes/status_bar');
const { Tween     } = require('../../engine/tween');

class Player extends Character {
  constructor() {
    super();
    this.name = 'player';

    this.add_component(new Human(this));

    this.add_component(new Tween(this.sprite));
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
