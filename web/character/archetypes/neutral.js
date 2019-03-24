'use strict';

const { timer               } = require('../../engine/ticker');
const { sleep               } = require('../../utils/time');
const { collision_container } = require('../../engine/pixi_containers');
const { distance_between    } = require('../../utils/math');
const { Sight               } = require('../../utils/line_of_sight');

const event         = require('events');
const { Animal    } = require('../types/rat');
const { Melee     } = require('../attributes/melee');
const { Influence } = require('../attributes/influence');
const { Scavenge  } = require('../attributes/scavenge');
const { Blood     } = require('../../effects/blood');
const { Tween     } = require('../../engine/tween');

class Scripted_NPC extends Animal {
  constructor() {
    super();
    this.name = 'scavenger';
    this.sprite.id = 4;

    this.sprite.events = new event();
    this.sprite.events.on('damage', amount => this.on_damage(amount));
    this.blood = new Blood();

    this.inventory.add_melee_weapon_by_name('rusty_knife');
    this.inventory.equip_melee_weapon();
    this.add_component(new Melee(this));
    this.add_component(new Tween(this.sprite));
    this.add_component(new Influence(this));
    this.add_component(new Scavenge(this));
    this.influence.add_box(500, 500);

    this._logic        = timer.createTimer(800);
    this._logic.repeat = 90;
    this._logic.expire = true;
    this._logic.dead   = false;
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

  set_enemy(character) {
    this.enemy = character;
  }

  _escape() {
    this.tween.movement.stop();

    this.pathfind.go_to_point(this.route.exit);
  }

  get _enemy_seen() {
    return Sight.lineOfSight(this.sprite, this.enemy.sprite, collision_container.children);
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
  Scripted_NPC,
};
