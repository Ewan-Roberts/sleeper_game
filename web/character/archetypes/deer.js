'use strict';
const { tweenManager     } = require('pixi.js');
const { distance_between } = require('../../utils/math');
const { damage_events } = require('../../engine/damage_handler');

const { Animal } = require('../types/rat');
const { Melee  } = require('../attributes/melee');
const { Blood  } = require('../../effects/blood');

class Deer extends Animal {
  constructor() {
    super();
    this.name = 'rat';
    this.id = 2;

    this.inventory.add_melee_weapon_by_name('rat_teeth');
    this.inventory.equip_melee_weapon();
    this.add_component(new Melee(this));
    this.blood         = new Blood();
    this.escape_point  = global.place_bunny(this.sprite);

    this._logic        = tweenManager.createTween(this.sprite);
    this._logic.time   = 800;
    this._logic.repeat = 200;
    this._logic.expire = true;
    this._logic.dead   = false;

    this.health = 100;
    const on_damage = ({id, damage}) => {
      if(this.id !== id) return;
      this.health -= damage;
      if(this.health > 0) return;

      damage_events.removeListener('damage', on_damage);
      this.sprite.destroy();
    };

    damage_events.on('damage', on_damage);
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

    return distance > 400;
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

  _run_away_from_enemy() {
    this.animation.walk();

    const exit_point = global.place_bunny({x: 1500, y: 3000});
    exit_point.alpha = 0;
    this.pathfind.go_to_sprite(exit_point);
  }

  logic_start() {
    if(!this.enemy) return new Error('no enemy');
    this._logic.start();

    this._logic.on('repeat', () => {

      this.pathfind.hightlight_grid_around();
      // if(!this.vitals.alive) this.kill();

      if(this._target_far_away) return;
      this._run_away_from_enemy();

      // return this.melee.attack(this.enemy);
    });
  }
}


module.exports = {
  Deer,
};
