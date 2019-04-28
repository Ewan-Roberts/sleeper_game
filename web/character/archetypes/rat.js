'use strict';

const { distance_between } = require('../../utils/math');
const { Sight            } = require('../../utils/line_of_sight');
const { damage_events    } = require('../../engine/damage_handler');
const { collision_container} = require('../../engine/pixi_containers');

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
    this.tween.time  = 1000;
    this.tween.fired = false;
  }

  async _path_to_enemy() {
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

  async _walk_to_enemy() {
    this.animation.walk();

    this.tween.movement.clear();
    this.tween.from_path(this.sprite);
    this.tween.add_path([this.sprite,this.sprite, this.sprite,this.enemy.sprite]);
    this.tween.draw_path();
    this.tween.movement.path = this.tween.path;
    //this.tween.movement.repeat = 9;
    //this.tween.start();
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
      console.log('i see you');
      if(Sight.lineOfSight(this.sprite, this.enemy.sprite, collision_container.children)) {
        console.log('i see you');
        return this._walk_to_enemy();
      }

      if(this._target_far_away) return this._path_to_enemy();
      if(!this.enemy.vitals.alive) throw 'game over';
      this.tween.stop();
      return this.melee.attack(this.enemy);
    });
  }
}


module.exports = {
  Rat,
};
