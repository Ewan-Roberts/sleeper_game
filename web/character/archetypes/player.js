'use strict';

const { extras, Texture } = require('pixi.js');
const { players         } = require('../../engine/pixi_containers');
const { PlayerEvents    } = require('../../engine/item_handler');
const { Keyboard        } = require('../attributes/keyboard');
const { Mouse           } = require('../attributes/mouse');
const { Inventory       } = require('../attributes/inventory');
const { Vitals          } = require('../attributes/vitals');
const { Animation       } = require('../animations/human');
const { damage_events   } = require('../../engine/damage_handler');
const event               = require('events');

const create_texture = (name, i) => Array(i).fill(name).map((filler,j) => Texture.fromFrame(j<10?filler+'0'+j:filler+j));
const nothing_idle = create_texture('Armature_nothing_idle_', 37);
// Make a singleton
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

    this.add_component(new Animation(this));
    this.add_component(new Inventory());
    this.add_component(new Vitals());
    this.add_component(new Keyboard(this));
    this.add_component(new Mouse(this));
    this.add_component(new PlayerEvents(this));

    players.addChild(this);

    damage_events.on('damage', this.on_damage);
  }

  on_damage({id, damage}) {
    if(this.id !== id) return;
    this.events.emit('hit');
    if(this.vitals.alive) return this.vitals.damage(damage);

    this.events.emit('killed');
    if(id === 1) return;
    if(!this.inventory.items.length) this.inventory.populate();
    if(this.tween) this.tween.stop();

    this.animation.kill();

    damage_events.removeListener('damage', this.on_damage);
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

