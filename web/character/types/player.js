'use strict';

const { player_container } = require('../../engine/pixi_containers');

const { Character } = require('../character_model');
const { Human     } = require('../animations/human');

const event        = require('events');
const { Keyboard  } = require('../attributes/keyboard');
const { Mouse     } = require('../attributes/mouse');
const { Inventory } = require('../attributes/inventory');
const { Vitals    } = require('../attributes/vitals');
const { Status    } = require('../attributes/status_bar');
const { Light     } = require('../attributes/light');
const { Tween     } = require('../../engine/tween');
const { Blood     } = require('../../effects/blood');

class Player extends Character {
  constructor() {
    super();
    this.name = 'player';

    this.add_component(new Human(this));
    this.sprite.events = new event();
    this.sprite.events.on('damage', amount => this.on_damage(amount));
    this.sprite.id = 3;
    this.blood     = new Blood();

    this.add_component(new Light(this));
    this.add_component(new Tween(this.sprite));
    this.add_component(new Vitals(this));
    this.add_component(new Inventory());
    this.add_component(new Keyboard(this));
    this.add_component(new Mouse(this));
    this.add_component(new Status());

    player_container.addChild(this.sprite);
  }

  on_damage(amount) {
    this.vitals.damage(amount);

    if(this.vitals.status === 'dead') {
      this.blood.add_at(this.sprite);

      this.sprite.destroy();
      return;
    }
  }

  destroy() {
    player_container.removeChild(this.sprite);
  }
}

module.exports = {
  Player,
};
