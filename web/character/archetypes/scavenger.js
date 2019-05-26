'use strict';
const { collisions    } = require('../../engine/pixi_containers');
const { enemys        } = require('../../engine/pixi_containers');
const { damage_events } = require('../../engine/damage_handler');

const { tweenManager     } = require('pixi.js');
const { sleep            } = require('../../utils/time');
const { distance_between } = require('../../utils/math');
const { Sight            } = require('../../utils/line_of_sight');

const { Character } = require('../character_model');
const { Zombie    } = require('../animations/zombie');
const { Vitals    } = require('../attributes/vitals');
const { Inventory } = require('../attributes/inventory');
const { Melee     } = require('../attributes/melee');
const { Influence } = require('../attributes/influence');
const { Scavenge  } = require('../attributes/scavenge');
// const { Route  } = require('../attributes/route');
const { Blood     } = require('../../effects/blood');
const { Tween     } = require('../../engine/tween');

class Scavenger extends Character{
  constructor() {
    super();
    this.name = 'scavenger';

    this.add_component(new Zombie(this));
    this.add_component(new Vitals(this));
    this.add_component(new Inventory());
    this.sprite.play();

    enemys.addChild(this.sprite);
    this.id = 3;

    this.health = 100;
    const on_damage = ({id, damage}) => {
      if(this.id !== id) return;
      this.health -= damage;
      if(this.health > 0) return;

      damage_events.removeListener('damage', on_damage);
      this.sprite.destroy();
    };

    damage_events.on('damage', on_damage);

    this.inventory.add_melee_weapon_by_name('rat_teeth');
    this.inventory.equip_melee_weapon();
    this.add_component(new Melee(this));
    this.add_component(new Tween(this.sprite));
    this.add_component(new Influence(this));
    this.add_component(new Scavenge(this));
    // this.add_component(new Route(this));
    this.route = {};
    this.influence.add_box(500, 500);

    this.blood = new Blood();

    this._logic        = tweenManager.createTween(this.sprite);
    this._logic.time   = 800;
    this._logic.repeat = 90;
    this._logic.expire = true;
    this._logic.dead   = false;
  }

  _walk_to_enemy() {
    this.animation.walk();

    this.pathfind.go_to_sprite(this.enemy.sprite);
  }

  _distance_to(point) {
    // consider PIXI.tween.TweenPath.distanceBetween
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

  set_enemy(character) {
    this.enemy = character;
  }

  _escape() {
    this.tween.movement.stop();

    this.pathfind.go_to_point(this.route.exit);
  }

  get _enemy_seen() {
    return Sight.lineOfSight(this.sprite, this.enemy.sprite, collisions.children);
  }

  get _in_influence() {
    this.influence.sprite.position.copy(this.sprite);

    const enemy_point = this.enemy.sprite.getGlobalPosition();

    return this.influence.sprite.containsPoint(enemy_point);
  }

  async logic_start() {
    if(!this.enemy) return new Error('no enemy');
    this._logic.start();

    this._logic.on('repeat', () => {
      if(this._in_influence && this._enemy_seen){
        this._escape();
      }
    });

    for(let i = 0; i < 3; i++) {
      await sleep(1500);
      await this.scavenge.get_new_path();
      await this.scavenge.go_to_item();
    }

    this._escape();
  }
}


module.exports = {
  Scavenger,
};
