'use strict';

const { distance_between } = require('../../utils/math');
const { damage_events    } = require('../../engine/damage_handler');

const event      = require('events');
const { Animal } = require('../types/rat');
const { Melee  } = require('../attributes/melee');
const { Blood  } = require('../../effects/blood');
const { pathfind_sprite } = require('../../engine/pathfind');
const { Tween  } = require('../../engine/tween');

function break_at_door(path) {
  const arr = [];

  for (let i = 0; i < path.length; i++) {
    arr.push(path[i]);

    if(path[i].door) return arr;
  }
  return arr;
}

class Rat extends Animal {
  constructor() {
    super();
    this.name = 'rat';

    this.sprite.events = new event();
    this.sprite.events.on('damage', amount => this.on_damage(amount));

    this.inventory.add_melee_weapon_by_name('rat_teeth');
    this.inventory.switch_to_melee_weapon();
    this.add_component(new Melee(this));

    this.blood       = new Blood();
    this.tween       = new Tween(this.sprite);
    this.tween.time  = 4000;
    this.tween.fired = false;
  }

  async _walk_to_enemy() {
    this.animation.walk();

    const normal_path = await pathfind_sprite.get_sprite_to_sprite_path(this.sprite, this.enemy.sprite);
    const door_path   = break_at_door(normal_path);
    const door_tile   = door_path[door_path.length - 1];
    this.tween.movement.clear();
    this.tween.from_path(this.sprite);
    this.tween.add_path(door_path);
    this.tween.draw_path();

    const { damage } = this.inventory.equipped;
    damage_events.emit('damage', {door_tile, damage});

    this.tween.movement.repeat = 9;
    this.tween.start();
  }

  get _target_far_away() {
    const distance = distance_between(this.enemy.sprite, this.sprite);

    return distance > 500;
  }

  on_damage(amount) {
    this.vitals.damage(amount);

    if(!this.vitals.alive) {
      this.blood.add_at(this.sprite);
      this.kill();
    }
  }

  kill() {
    if(!this.loot.items.length) this.loot.populate();

    this.loot.set_position(this.sprite);
    this.loot.show();
    this.tween.stop();

    this.animation.kill();
    this.vitals.kill();
  }

  enemy(character) {
    this.enemy = character;
  }

  logic_start() {
    if(!this.enemy) return new Error('no enemy');
    if(this.tween.fired) return;
    this.tween.fired = true;
    this.tween.start();
    this.tween.movement.repeat = 9;

    this.tween.movement.on('repeat', () => {
      if(!this.vitals.alive) this.kill();

      if(this._target_far_away) return this._walk_to_enemy();

      this.tween.stop();
      return this.melee.attack(this.enemy);
    });
  }
}


module.exports = {
  Rat,
};
