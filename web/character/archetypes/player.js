const { extras, Texture, sound } = require('pixi.js');
const { players         } = require('../../engine/pixi_containers');
//const { PlayerEvents    } = require('../../engine/item_handler');
const { Animation       } = require('../attributes/animation');
const { Keyboard        } = require('../attributes/keyboard');
const { Mouse           } = require('../attributes/mouse');
const { Inventory       } = require('../attributes/inventory');
const { Vitals          } = require('../attributes/vitals');
const { human_frames    } = require('../animations/human');
const { damage_events   } = require('../../engine/damage_handler');
const { item_events     } = require('../../engine/item_handler');
const { Item_Manager    } = require('../../items/item_manager');
const { Blood           } = require('../../effects/blood');
const event               = require('events');

const create_texture = (name, i) => Array(i).fill(name).map((filler,j) => Texture.fromFrame(j<10?filler+'0'+j:filler+j));
const nothing_idle = create_texture('Armature_nothing_idle_', 37);

class Player extends extras.AnimatedSprite {
  constructor() {
    super(nothing_idle);
    this.id   = 1;
    this.name = 'player';
    this.events = new event();

    this.width  = 23;
    this.height = 35;
    this.anchor.set(0.5);
    this.animationSpeed = 0.30;

    this.add_component(new Animation(this, human_frames));
    this.animation.prefix = 'nothing';

    this.add_component(new Inventory());
    this.add_component(new Vitals());
    this.add_component(new Keyboard(this));
    this.add_component(new Mouse(this));

    damage_events.on('damage', ({id, damage}) => {
      if(this.id !== id) return;
      this.damage(damage);
    });

    item_events.on('give', ({id,item}) => {
      if(this.id !== id) return;
      const found_item = Item_Manager.get_item(item.image_name);
      this.inventory.give_item(found_item);
    });

    item_events.on('equip_weapon', ({id,item}) => {
      if(this.id !== id) return;
      const found_item = Item_Manager.get_item(item.image_name);
      this.inventory.equip_weapon(found_item);

      this.animation.prefix = found_item.animation_name;
      this.animation.idle();
    });

    players.addChild(this);

    this._set_sounds();

    this.animation.events.on('walk', () => {
      if(!this.walk_sound.isPlaying) {
        // this.walk_sound.play();
      }
    });

    this.animation.events.on('idle', () => {
      // this.walk_sound.stop();
    });
  }

  _set_sounds() {
    //this.walk_sound = sound.find('walk_normal', {loop: true});
    //this.walk_sound.volume = 0.04;
  }

  damage(damage) {
    this.events.emit('hit');

    this.vitals.damage(damage);
    if(Math.random() >= 0.5) new Blood(this.position);
    if(this.vitals.alive) return;

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

