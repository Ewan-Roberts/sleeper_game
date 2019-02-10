'use strict';

const { viewport  } = require('../../engine/viewport.js');
const { HUD       } = require('../../view/view_player_inventory');

const { Human     } = require('./animations/character');
const { Character } = require('../character_model');

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

    //player specific
    this.addComponent(new HUD());

    this.addComponent(new Human(this.sprite));
    this.addComponent(new Inventory());
    this.addComponent(new Predator(this));
    this.addComponent(new Mouse(this));
    this.addComponent(new Keyboard(this));
    this.addComponent(new Vitals());
    this.addComponent(new Status());

    viewport.addChild(this.sprite);
  }
}

module.exports = {
  Player,
};
