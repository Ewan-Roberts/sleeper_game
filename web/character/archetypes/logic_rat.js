const { PathSprite    } = require('../types/path');
const { Animation     } = require('../attributes/animation');
const { rodent_frames } = require('../animations/rat');
const { Vitals        } = require('../attributes/vitals');
const { Inventory     } = require('../attributes/inventory');
const { Blood         } = require('../../effects/blood');
const { damage_events } = require('../../engine/damage_handler');
const { Button        } = require('../../view/button');

class LogicRat extends PathSprite {
  constructor(data) {
    super(data);
    this.add_component(new Animation(this, rodent_frames));
    this.width  = 60;
    this.height = 25;
    this.add_component(new Vitals());
    this.add_component(new Inventory(data));

    damage_events.on('damage', data => this.damage(data));

    this.animation.wait();
  }

  damage({id, damage}) {
    if(this.id !== id) return;
    console.log(damage);
    this.vitals.damage(damage);
    if(Math.random() >= 0.5) new Blood(this.position);

    if(this.vitals.alive) this.kill();
  }

  kill() {
    if(this.tween) this.tween.stop();
    this.inventory.populate();

    this.interactive = true;
    this.button = new Button(this, {
      label_action: 'Loot',
      label_description: 'Corpse',
      label_image: 'eye_icon',
    });

    this.click = () => {
      this.inventory.set_position(this);
      this.inventory.fade_in();
    };

    this.animation.kill();
    damage_events.removeListener('damage', this.damage);
  }
}

module.exports = {
  LogicRat,
};


