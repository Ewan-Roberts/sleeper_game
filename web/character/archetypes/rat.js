'use strict';
const PIXI = require('pixi.js');

const { distance_between } = require('../../utils/math');
const { Sight            } = require('../../utils/line_of_sight');
const { damage_events    } = require('../../engine/damage_handler');
const { collision_container, gui_container} = require('../../engine/pixi_containers');

const event      = require('events');
const { Animal } = require('../types/rat');
const { Melee  } = require('../attributes/melee');
const { pathfind_sprite } = require('../../engine/pathfind');
//const { Tween  } = require('../../engine/tween');

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

  }

  get _target_far_away() {
    const distance = distance_between(this.enemy.sprite, this.sprite);

    return distance > 200;
  }

  on_damage(amount) {
    if(this.vitals.alive) {
      return this.vitals.damage(amount);
    }

    this.kill();
  }

  kill() {
    if(!this.loot.items.length) this.loot.populate();

    this.loot.set_position(this.sprite);
    this.loot.show();
    this.tween.stop();

    this.animation.kill();
  }

  enemy(character) {
    this.enemy = character;
  }

  _show_path(path) {
    const graphical_path = new PIXI.Graphics();
    graphical_path.lineStyle(3, 0xffffff, 0.5);
    graphical_path.drawPath(path);

    gui_container.addChild(graphical_path);
  }

  async _pathfind() {
    const normal_path = await pathfind_sprite.get_sprite_to_sprite_path(this.sprite, this.enemy.sprite);
    const door_path   = break_at_door(normal_path);
    const door_tile   = door_path[door_path.length - 1];

    const { damage } = this.inventory.equipped;
    damage_events.emit('damage', {door_tile, damage});

    this.tween.path.lineTo(
      door_path[0].x,
      door_path[0].y
    );
    for (let i = 1; i < door_path.length; i++) {
      this.tween.path.arcTo(
        door_path[i-1].x,
        door_path[i-1].y,
        door_path[i].x,
        door_path[i].y,
        2);
    }
  }

  // NOTE: Keep this verbose and dumb
  logic_start() {
    this.tween = PIXI.tweenManager.createTween(this.sprite);
    this.tween.time = 2000;
    this.tween.expire = true;
    this.tween.start();

    this.tween.on('end', async () => {
      this.tween.clear();
      this.tween.expire = true;

      if(!this.enemy.vitals.alive) throw 'game over';

      if(!this._target_far_away) {
        this.tween.time = 2000;
        this.tween.start();

        return this.melee.attack(this.enemy);
      }

      this.tween.path = new PIXI.tween.TweenPath();
      this.tween.path.moveTo(this.sprite.x, this.sprite.y);

      if(Sight.lineOfSight(this.sprite, this.enemy.sprite, collision_container.children)) {
        this.tween.path.lineTo(this.enemy.sprite.x, this.enemy.sprite.y);
      } else {
        await this._pathfind();
      }

      this.tween.time = this.tween.path.length
        ?this.tween.path.length*1000
        :2000;

      this._show_path(this.tween.path);
      this.tween.start();
    });
  }
}


module.exports = {
  Rat,
};
