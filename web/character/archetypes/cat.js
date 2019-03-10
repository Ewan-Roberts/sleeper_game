'use strict';

const { timer            } = require('../../engine/ticker');
const { Entity_Container } = require('../../engine/entity_container.js');
const { distance_between } = require('../../utils/math');

const event      = require('events');
const { Animal } = require('../types/rat');
const { Melee  } = require('../attributes/melee');
const { Blood  } = require('../../view/types/blood');
const { Tween  } = require('../../engine/tween');

class Cat extends Animal {
  constructor() {
    super();
    this.name = 'cat';

    this.sprite.events = new event();
    this.sprite.events.on('damage', amount => this.on_damage(amount));
    this.sprite.id = 3;

    this.inventory.add_melee_weapon_by_name('rat_teeth');
    this.inventory.equip_melee_weapon();
    this.add_component(new Melee(this));
    this.add_component(new Tween(this.sprite));

    this.blood = new Blood();

    this._logic        = timer.createTimer(800);
    this._logic.repeat = 20;
    this._logic.expire = true;
    this._logic.dead   = false;

    Entity_Container.add(this);
  }

  _walk_to_enemy() {
    this.animation.walk();

    this.pathfind.go_to_sprite(this.enemy.sprite);
  }

  _distance_to(point) {
    return distance_between(point, this.sprite);
  }

  get _target_far_away() {
    const distance = this._distance_to(this.enemy.sprite);

    return distance > 200;
  }

  on_damage(amount) {
    if(this._logic.dead) return;

    this.vitals.damage(amount);

    if(this.vitals.status === 'dead') {
      this.blood.add_at(this.sprite);
      this.kill();
    }
  }

  kill() {
    if(!this.loot.items.length) this.loot.populate();
    this.loot.create_icon();

    this.animation.kill();

    this.pathfind.stop();
    this._logic.stop();
    this._logic.remove();
    this._logic.dead = true;
  }

  enemy(character) {
    this.enemy = character;
  }

  logic_start() {
    if(!this.enemy) return new Error('no enemy');
    this._logic.start();
    // this._logic.on('repeat', () => {
    // if(!this.vitals.alive) this.kill();

    // if(this._target_far_away) return this._walk_to_enemy();

    // return this.melee.attack(this.enemy);
    // });
  }
}


module.exports = {
  Cat,
};
