const { extras, Texture } = require('pixi.js');
const { players         } = require('../../engine/pixi_containers');
//const { PlayerEvents    } = require('../../engine/item_handler');
const { Keyboard        } = require('../attributes/keyboard');
const { Mouse           } = require('../attributes/mouse');
const { Inventory       } = require('../attributes/inventory');
const { Vitals          } = require('../attributes/vitals');
const { PlayerAnimation } = require('../animations/human');
const { damage_events   } = require('../../engine/damage_handler');
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

    this.width  /= 6;
    this.height /= 6;
    this.anchor.set(0.5);
    this.animationSpeed = 0.70;

    this.add_component(new PlayerAnimation(this));
    this.add_component(new Inventory());
    this.add_component(new Vitals());
    this.add_component(new Keyboard(this));
    this.add_component(new Mouse(this));

    this.events.on('give_item', item => this.inventory.give_item(item));
    this.events.on('check_items', callback => {
      const result = this.inventory.take_items('blood');
      callback(result);
    });

    this.events.on('equip_weapon', item => {
      const found_item = Item_Manager.get_item_by_image_name(item.image_name);
      this.inventory.equip_weapon(found_item);

      this.animation.prefix = found_item.animation_name;
      this.animation.idle();
    });

    players.addChild(this);

    damage_events.on('damage', data => this.damage(data));
  }

  damage({id, damage}) {
    if(this.id !== id) return;
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

