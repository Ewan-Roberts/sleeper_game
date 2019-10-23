const { extras        } = require('pixi.js');
const { sound         } = require('pixi.js');
const { players       } = require('../../engine/pixi_containers');
const { Animation     } = require('../attributes/animation');
const { Keyboard      } = require('../attributes/keyboard');
const { Mouse         } = require('../attributes/mouse');
const { MeleeBox    } = require('../../engine/melee');
const { Inventory     } = require('../attributes/inventory');
const { Vitals        } = require('../attributes/vitals');
const { human_frames  } = require('../animations/human');
const { damage_events } = require('../../engine/damage_handler');
const { item_events   } = require('../../engine/item_handler');
const { Item_Manager  } = require('../../items/item_manager');
const { Blood         } = require('../../effects/blood');
const { Nightmare     } = require('../../effects/environment');
const event             = require('events');

class Player extends extras.AnimatedSprite {
  constructor() {
    super(human_frames.nothing_idle);
    this.id   = 1;
    this.name = 'player';
    this.events = new event();

    this.width  = 23;
    this.height = 35;
    this.anchor.set(0.5);

    this.add_component(new Animation(this, human_frames));
    this.add_component(new Inventory());
    this.add_component(new Vitals());
    this.add_component(new MeleeBox());
    this.add_component(new Keyboard(this));
    this.add_component(new Mouse(this));

    this.vitals.health = 200;
    this.animation.prefix = 'nothing';
    this.animation.speed = 0.70;

    damage_events.on('damage', ({ id, damage }) => {
      if(this.id !== id) {
        return;
      }
      console.log('player hit');
      this.damage(damage);
    });

    item_events.on('give', (id, {
      'item': { name, condition },
    }) => {
      if(this.id !== id) {
        return;
      }
      const found_item = Item_Manager.get_item(name, { condition });
      this.inventory.give(found_item);
    });

    // GAME OVER
    this.events.on('killed', () => {
      Nightmare.on();
    });

    item_events.on('equip_weapon', (id, {
      'item': { image_name },
    }) => {
      if(this.id !== id) {
        return;
      }
      const found_item = Item_Manager.get_item(image_name);
      this.inventory.equip_weapon(found_item);

      this.animation.prefix = found_item.animation_name;
      this.animation.idle();
    });

    players.addChild(this);

    this._set_sounds();

    this.animation.events.on('walk', () => {
      if(!this.walk_sound.isPlaying) {
        this.walk_sound.play();
      }
    });

    this.animation.events.on('idle', () => {
      this.walk_sound.stop();
    });
  }

  _set_sounds() {
    this.walk_sound = sound.find('walk_normal', { 'loop': true });
    this.walk_sound.volume = 0.04;
  }

  damage(damage) {
    this.events.emit('hit');

    this.vitals.damage(damage);
    if(Math.random() >= 0.5) {
      Blood.random_at(this.position);
    }
    if(this.vitals.alive) {
      return;
    }

    this.events.emit('killed');

    damage_events.removeListener('damage', this.damage);
  }

  destroy() {
    players.removeChild(this);
    this.keyboard.destroy();
    this.mouse.destroy();
  }

  add_component(component) {
    this[component.name] = component;
  }
}

module.exports = {
  Player,
};

