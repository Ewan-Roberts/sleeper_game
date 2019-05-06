'use strict';

const { players      } = require('../../engine/pixi_containers');
const { PlayerEvents } = require('../../engine/item_handler');
const { damage_events } = require('../../engine/damage_handler');

const { Character } = require('../character_model');
const { Human     } = require('../animations/human');
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
    this.id = 1;
    this.add_component(new Human(this));
    this.sprite.name = 'player';
    this.blood       = new Blood();

    this.add_component(new Light(this));
    this.add_component(new Tween(this.sprite));
    this.add_component(new Vitals(this));
    this.add_component(new Inventory());
    this.add_component(new Keyboard(this));
    this.add_component(new Mouse(this));
    this.add_component(new Status());

    players.addChild(this.sprite);

    this.health = 100;
    const on_damage = ({id, damage}) => {
      if(this.id !== id) return;
      this.health -= damage;
      if(this.health > 0) return;

      damage_events.removeListener('damage', on_damage);
      this.sprite.destroy();
    };

    damage_events.on('damage', on_damage);
    this.add_component(new PlayerEvents(this));
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
    players.removeChild(this.sprite);
  }
}

module.exports = {
  Player,
};
