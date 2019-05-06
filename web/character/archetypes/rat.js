'use strict';
const { collisions, guis } = require('../../engine/pixi_containers');

const { Graphics, tween, tweenManager }= require('pixi.js');

const { radian           } = require('../../utils/math');
const { random_number    } = require('../../utils/math');
const { distance_between } = require('../../utils/math');
const { Sight            } = require('../../utils/line_of_sight');
const { damage_events    } = require('../../engine/damage_handler');
const { pathfind         } = require('../../engine/pathfind');

const { Animal   } = require('../types/rat');
const { Melee    } = require('../attributes/melee');

// truncanting

// arr.length = 4;
// console.log(arr); //=> [11, 22, 33]

function break_at_door(path) {
  for (let i = 0; i < path.length; i++) {
    if(path[i].door) {
      path.length = i+1;
      return path;
    }
  }
  return path;
}

class Rat extends Animal {
  constructor({id}) {
    super();
    this.name = 'rat';
    this.id = id;
    this.sprite.id = id;
    this.health = 100;
    const on_damage = ({id, damage}) => {
      if(this.id !== id) return;
      this.health -= damage;
      if(this.health > 0) return;

      if(this.vitals.alive) {
        return this.vitals.damage(damage);
      }

      this.kill();
      damage_events.removeListener('damage', on_damage);
    };

    damage_events.on('damage', on_damage);

    this.inventory.add_melee_weapon_by_name('rat_teeth');
    this.inventory.switch_to_melee_weapon();
    this.add_component(new Melee(this));
  }

  get _target_far_away() {
    const distance = distance_between(this.enemy.sprite, this.sprite);

    return distance > 200;
  }

  on_damage2(amount) {
    if(this.vitals.alive) {
      return this.vitals.damage(amount);
    }

    this.kill();
  }

  kill() {
    if(!this.loot.items.length) this.loot.populate();

    this.loot.set_position(this.sprite);
    this.loot.show();
    if(this.tween)this.tween.stop();

    this.animation.kill();
  }

  enemy(character) {
    this.enemy = character;
  }

  _show_path(path) {
    const graphical_path = new Graphics();
    graphical_path.lineStyle(3, 0xffffff, 0.5);
    graphical_path.drawPath(path);

    guis.addChild(graphical_path);
  }

  async _pathfind() {
    this.animation.move();

    const normal_path = await pathfind.get_sprite_to_sprite_path(this.sprite, this.enemy.sprite);
    const door_path   = break_at_door(normal_path);
    const door_tile   = door_path[door_path.length - 1];

    const { damage } = this.inventory.equipped;
    damage_events.emit('damage_tile', {door_tile, damage});

    this.tween.path.lineTo(
      door_path[0].x,
      door_path[0].y
    );

    const random = () => random_number(30, 50);
    for (let i = 1; i < door_path.length; i++) {
      this.tween.path.arcTo(
        door_path[i-1].x + random(),
        door_path[i-1].y + random(),
        door_path[i].x,
        door_path[i].y,
        20);
    }
  }

  // NOTE: Keep this verbose and dumb
  logic_start() {
    this.tween = tweenManager.createTween(this.sprite);
    this.tween.time = 4000;
    this.tween.expire = true;
    this.tween.start();

    this.tween.on('end', async () => {
      this.tween.clear();
      this.tween.expire = true;

      if(!this.enemy.vitals.alive) throw 'game over';

      if(!this._target_far_away) {
        this.tween.time = 4000;
        this.tween.start();

        return this.melee.attack(this.enemy);
      }

      this.tween.path = new tween.TweenPath();
      this.tween.path.moveTo(this.sprite.x, this.sprite.y);

      if(Sight.lineOfSight(this.sprite, this.enemy.sprite, collisions.children)) {
        this.tween.path.lineTo(this.enemy.sprite.x, this.enemy.sprite.y);
      } else {
        await this._pathfind();
      }

      this.tween.time = this.tween.path.length
        ?this.tween.path.length*2000
        :2000;

      this._show_path(this.tween.path);
      this.tween.start();
    });

    this.tween.on('update', () => {
      if(!this.tween.path) return;
      this.sprite.rotation = radian(this.sprite, this.tween.path._tmpPoint);
    });
  }
}


module.exports = {
  Rat,
};
