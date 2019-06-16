'use strict';
const { Texture, tween, tweenManager, extras } = require('pixi.js');
const { collisions       } = require('../../engine/pixi_containers');
const { enemys           } = require('../../engine/pixi_containers');
const { radian           } = require('../../utils/math');
const { draw_path        } = require('../../utils/line');
const { distance_between, random_bound} = require('../../utils/math');
const { damage_events    } = require('../../engine/damage_handler');
const { pathfind         } = require('../../engine/pathfind');
const { Sight            } = require('../../utils/line_of_sight');
const { Zombie           } = require('../animations/zombie');
const { Inventory        } = require('../attributes/inventory');
const { Vitals           } = require('../attributes/vitals');
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

const dead = [ Texture.fromFrame('bird_8') ];

class Walker extends extras.AnimatedSprite {
  constructor(data) {
    super(dead);
    this.name = 'zombie';
    this.id   = data.id;
    this.interactive = true;

    this.add_component(new Zombie(this));
    this.add_component(new Inventory(this, data.properties));
    this.add_component(new Vitals(this));
    this.add_component(new Melee(this));
    this.position.copy(data);

    enemys.addChild(this);
  }

  get _target_far_away() {
    const distance = distance_between(this.target, this);
    return distance > 80;
  }

  target(character) {
    this.target = character;
  }

  async _pathfind() {
    this.animation.move();

    let normal_path;
    try {
      normal_path = await pathfind.get_sprite_to_sprite_path(this, this.target);
    } catch(err) {
      console.log(err);
    }
    if(!normal_path) {
      this.tween.time = 500;
      return;
    }
    const door_path = break_at_door(normal_path);
    const door_tile = door_path[door_path.length - 1];

    const { damage } = this.inventory.equipped;
    damage_events.emit('damage_tile', {door_tile, damage});

    this.tween.path.lineTo(
      door_path[0].x + 50,
      door_path[0].y + 50
    );

    for (let i = 1; i < door_path.length; i++) {
      this.tween.path.arcTo(
        door_path[i-1].x + 50,
        door_path[i-1].y + 50,
        door_path[i].x + 50,
        door_path[i].y + 50,
        20);
    }

    this.tween.time = door_path.length*500;
  }

  // NOTE: Keep this verbose and dumb
  logic_start() {
    this.tween = tweenManager.createTween(this);
    this.tween.time = 2000;
    this.tween.expire = true;
    this.tween.start();

    this.tween.on('end', async () => {
      if(this.remove_next_tick) return;
      this.tween.clear();
      this.tween.expire = true;

      if(!this._target_far_away) {
        this.tween.time = 3000;
        this.tween.start();
        this.animation.attack();
        this.animation.face_point(this.target);

        damage_events.emit('damage', {id: this.target.id, damage: 10});
        return;
      }

      this.tween.path = new tween.TweenPath();
      this.tween.path.moveTo(this.x, this.y);

      if(Sight.lineOfSight(this, this.target, collisions.children)) {
        this.tween.path.lineTo(this.target.x, this.target.y);
        this.animation.move();

        this.tween.time = random_bound(90, 500);
      } else {
        await this._pathfind();
      }
      //draw_path(this.tween.path);
      this.tween.start();
    });

    this.tween.on('update', () => {
      if(!this.vitals.alive) this.tween.remove();
      if(!this.tween.path) return;

      this.rotation = radian(this, this.tween.path._tmpPoint);
    });
  }

  add_component(component) {
    this[component.name] = component;
  }
}

module.exports = {
  Walker,
};
