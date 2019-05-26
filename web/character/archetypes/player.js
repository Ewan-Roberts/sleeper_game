'use strict';

const { players      } = require('../../engine/pixi_containers');
const { PlayerEvents } = require('../../engine/item_handler');
const { Tween        } = require('../../engine/tween');
const { Character    } = require('../character_model');
const { Human        } = require('../animations/human');
const { Keyboard     } = require('../attributes/keyboard');
const { Mouse        } = require('../attributes/mouse');
const { Inventory    } = require('../attributes/inventory');
const { Vitals       } = require('../attributes/vitals');
const { Light        } = require('../attributes/light');

class Player extends Character {
  constructor() {
    super();
    this.name = 'player';
    this.id = 1;
    this.add_component(new Human(this));
    this.sprite.name = 'player';

    this.add_component(new Light(this));
    this.add_component(new Tween(this.sprite));
    this.add_component(new Inventory());
    this.add_component(new Vitals(this));
    this.add_component(new Keyboard(this));
    this.add_component(new Mouse(this));

    players.addChild(this.sprite);

    this.add_component(new PlayerEvents(this));
  }

  destroy() {
    players.removeChild(this.sprite);
  }
}

module.exports = {
  Player,
};
