'use strict';

const PIXI = require('pixi.js');
const { distance_between    } = require('../../utils/math');
const { collision_container } = require('../../engine/pixi_containers');

const event      = require('events');
const { Animal } = require('../types/rat');
const { Melee  } = require('../attributes/melee');
const { Blood  } = require('../../effects/blood');
const { pathfind_sprite } = require('../../engine/pathfind');
const { Tween  } = require('../../engine/tween');

function break_at_door(path) {
  const arr = [];

  for (let i = 0; i < path.length; i++) {
    if(path[i].door) {
      arr.push(path[i]);
      return arr;
    }

    arr.push(path[i]);
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

    this.blood         = new Blood();
    this.tween         = new Tween(this.sprite);
    this._logic        = PIXI.tweenManager.createTween(this.sprite);
    this._logic.time   = 2000;
    this._logic.repeat = 2;
    this._logic.expire = true;
    this._logic.dead   = false;
    this._logic.fired  = false;
  }

  async _walk_to_enemy() {
    this.animation.walk();
    const normal_path = await pathfind_sprite.get_sprite_to_sprite_path(this.sprite, this.enemy.sprite);
    const to_door     = break_at_door(normal_path);
    const door_tile   = to_door[to_door.length - 1];

    const door = collision_container.children.find(child => child.id === door_tile.id);
    if(door.events) door.events.emit('damage');
    if(door.health < 100) delete door_tile.door;

    this.tween.time = 30000;
    this.tween.from_path(this.sprite);
    this.tween.add_path(to_door);
    this.tween.draw_path();
    this.tween.start();

    //this.pathfind.go_to_sprite(this.enemy.sprite);
  }

  _distance_to(point) {
    return distance_between(point, this.sprite);
  }

  get _target_far_away() {
    const distance = this._distance_to(this.enemy.sprite);

    return distance > 500;
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
    if(this._logic.fired) return;
    this._logic.fired = true;
    this._logic.start();

    this._logic.on('repeat', () => {
      if(!this.vitals.alive) this.kill();

      if(this._target_far_away) return this._walk_to_enemy();

      return this.melee.attack(this.enemy);
    });
  }
}


module.exports = {
  Rat,
};
