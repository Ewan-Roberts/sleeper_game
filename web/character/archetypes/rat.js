'use strict';
const { Graphics, tween, tweenManager }= require('pixi.js');

const { collisions, guis } = require('../../engine/pixi_containers');
const { enemys           } = require('../../engine/pixi_containers');
const { Character        } = require('../character_model');
const { radian           } = require('../../utils/math');
const { random_number    } = require('../../utils/math');
const { distance_between } = require('../../utils/math');
const { Sight            } = require('../../utils/line_of_sight');
const { damage_events    } = require('../../engine/damage_handler');
const { pathfind         } = require('../../engine/pathfind');
const { Zombie           } = require('../animations/zombie');
const { Inventory        } = require('../attributes/inventory');
const { Vitals           } = require('../attributes/vitals');
const { Lootable         } = require('../attributes/lootable');
const { Melee            } = require('../attributes/melee');

function break_at_door(path) {
  for (let i = 0; i < path.length; i++) {
    if(path[i].door) {
      path.length = i+1;
      return path;
    }
  }
  return path;
}

class Rat extends Character {
  constructor({id}) {
    super();
    this.name = 'zombie';
    this.id = id;
    this.add_component(new Zombie(this));
    this.add_component(new Vitals(this));
    this.add_component(new Inventory({
      equip: 'rat_teeth',
    }));
    this.add_component(new Lootable(this));
    this.add_component(new Melee(this));

    enemys.addChild(this.sprite);
    damage_events.on('damage', data => this.on_damage(data));
  }

  get _target_far_away() {
    const distance = distance_between(this.target.sprite, this.sprite);

    return distance > 200;
  }

  on_damage({id, damage}) {
    if(this.id !== id) return;
    if(this.vitals.alive) return this.vitals.damage(damage);

    this.kill();
    damage_events.removeListener('damage', this.on_damage);
  }

  kill() {
    if(!this.loot.items.length) this.loot.populate();

    this.loot.show();
    if(this.tween) this.tween.stop();

    this.animation.kill();
  }

  target(character) {
    this.target = character;
  }

  _show_path(path) {
    const graphical_path = new Graphics();
    graphical_path.lineStyle(3, 0xffffff, 0.5);
    graphical_path.drawPath(path);

    guis.addChild(graphical_path);
  }

  async _pathfind() {
    this.animation.move();

    const normal_path = await pathfind.get_sprite_to_sprite_path(this.sprite, this.target.sprite);
    const door_path   = break_at_door(normal_path);
    const door_tile   = door_path[door_path.length - 1];

    const { damage } = this.inventory.equipped;
    damage_events.emit('damage_tile', {door_tile, damage});

    this.tween.path.lineTo(
      door_path[0].x,
      door_path[0].y
    );

    //const random = () => random_number(30, 50);

    for (let i = 1; i < door_path.length; i++) {
      this.tween.path.arcTo(
        door_path[i-1].x,
        door_path[i-1].y,
        door_path[i].x,
        door_path[i].y,
        20);
    }

    this.tween.time = door_path.length*100;
  }

  // NOTE: Keep this verbose and dumb
  logic_start() {
    this.tween = tweenManager.createTween(this.sprite);
    this.tween.time = 1000;
    this.tween.expire = true;
    this.tween.start();

    this.tween.on('end', async () => {
      this.tween.clear();
      this.tween.expire = true;

      if(!this.target.vitals.alive) throw 'game over';

      if(!this._target_far_away) {
        this.tween.time = 1000;
        this.tween.start();

        damage_events.emit('damage', {id: this.target.id, damage: 50});
        this.animation.attack();

        this.animation.face_point(this.target.sprite);
        return;
      }

      this.tween.path = new tween.TweenPath();
      this.tween.path.moveTo(this.sprite.x, this.sprite.y);

      if(Sight.lineOfSight(this.sprite, this.target.sprite, collisions.children)) {
        this.tween.path.lineTo(this.target.sprite.x, this.target.sprite.y);
        this.animation.move();
        this.tween.time = 200;
      } else {
        await this._pathfind();
      }

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
