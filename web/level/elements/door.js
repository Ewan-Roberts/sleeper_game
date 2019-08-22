const { items        } = require('../../engine/pixi_containers');
const { tweenManager } = require('pixi.js');
const { sound        } = require('pixi.js');

const { Element } = require('./model');
const { Button  } = require('../../view/button');
const { Caption } = require('../../view/caption');

const { damage_events } = require('../../engine/damage_handler');
const { random_bound  } = require('../../utils/math');
const { Vitals        } = require('../../character/attributes/vitals');
const { Floor         } = require('./floor');
const StateMachine      = require('javascript-state-machine');

class Door extends Element {
  constructor(data) {
    super(data);
    this.interactive = true;
    this.buttonMode = true;
    this.add_component(new Vitals());
    this.state = new StateMachine({
      init: 'closed',
      transitions: [
        { name: 'lock',   from: 'closed',  to: 'locked' },
        { name: 'unlock', from: 'locked',  to: 'closed' },
        { name: 'open',   from: 'closed',  to: 'opened' },

        { name: 'close',  from: 'opened',  to: 'closed' },
        { name: 'goto',   from: '*',       to: s => s },
      ],
    });

    items.addChild(this);

    if(data.clickable) {
      this.closable = data.closable;
      this.on('click', () => {
        if(this.state.is('motion')) {
          return;
        }

        if(this.state.is('opened')) {
          return this.close();
        }

        if(this.state.is('closed')) {
          return this.open();
        }
      });
    }

    this.rotation_on_interaction = data.open_rotation || 2;

    if(data.label) this.overlay(data);
    if(data.door)  this.pathfind_logic();

    damage_events.on('damage', ({id,damage}) => {
      if(this.id !== id) return;
      this.damage(damage);
    });

    this._set_sound();
  }

  open() {
    if(this.state.is('locked')) {
      Caption.render('Its locked');
      this.locked_door_effect.play();
      return;
    }
    if(this.state.is('motion')) return;

    this.state.open();
    this._open();
    return this;
  }

  close() {
    this.state.close();
    this._close();
    return this;
  }

  lock() {
    this.state.lock();
    return this;
  }

  unlock() {
    this.state.unlock();
    this.button.action_label.text = 'Open';
    return this;
  }

  damage(damage) {
    this.vitals.damage(damage);
    this.wood_thump.play();

    if(!this.vitals.alive) this.kill();
  }

  kill() {
    console.log('door destroy');
  }

  _set_sound() {
    // TODO better sound
    this.wood_thump = sound.find('thud_1');
    this.wood_thump.volume = 0.5;

    this.open_door_effect = sound.find('door_open_1');
    this.open_door_effect.volume = 0.3;

    this.locked_door_effect = sound.find('door_locked');
    this.locked_door_effect.volume = 0.1;
  }

  _open() {
    this.state.goto('motion');
    const rotation = this.rotation + 1.5;

    this.tween = tweenManager.createTween(this);
    this.open_door_effect.play();
    this.tween.to({ rotation });
    this.tween.time = random_bound(1000, 1300);
    this.tween.start();
    this.tween.expire = true;
    this.tween.on('end', () => {
      this.button.action_label.text = 'Close';
      this.state.goto('opened');
    });
  }

  _close() {
    this.state.goto('motion');
    this.open_door_effect.play();
    const rotation = this.rotation - 1.5;

    this.tween = tweenManager.createTween(this);
    this.tween.expire = true;
    this.tween.to({ rotation });
    this.tween.time = random_bound(1000, 1300);
    this.tween.start();
    this.tween.on('end', () => {
      this.button.action_label.text = 'Open';
      this.state.goto('closed');
    });
  }

  overlay(value) {
    this.button = new Button(this, value);
    this.tint = 0xd3d3d3;
  }

  pathfind_logic() {
    this.door = true;
    this.health = 50;

    damage_events.on('damage_tile', ({door_tile, damage}) => {
      door_tile.alpha = 0.6;
      if(door_tile.id === this.id) {
        if(this.health < 30) {
          delete door_tile.door;
          this.visible = false;
          const broken_door = new Floor({image_name: 'door_broken'});

          broken_door.position.copy(this);
        }
        this.health -= damage;
      }
    });
  }
  add_component(component) {
    this[component.name] = component;
  }

}

module.exports = {
  Door,
};
