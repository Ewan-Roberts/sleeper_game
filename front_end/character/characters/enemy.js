'use strict';

const PIXI = require('pixi.js');
const viewport = require('../../engine/viewport');
const ticker = require('../../engine/ticker');

const {
  pathfind_from_enemy_to_player,
  move_sprite_to_sprite_on_grid,
} = require('../../engine/pathfind.js');
const { distance_between_points } = require('../../engine/math');

const { radian    } = require('../../engine/math');
const { createjs  } = require('@createjs/tweenjs');
const { Character } = require('../character_model');
const { Vitals    } = require('../attributes/vitals');

const enemy_container = viewport.getChildByName('enemy_container');

class Enemy extends Character {
  constructor() {
    super();
    this.sprite.status = new Vitals();
    this.name = 'enemy';

    enemy_container.addChild(this.sprite);
  }

  create_patrol_path(path_data) {
    this.sprite.patrol_path = path_data;
  }

  create_direction_line() {
    const direction_line = PIXI.Sprite.fromFrame('black_dot');

    direction_line.width = 200;
    direction_line.height = 15;
    direction_line.anchor.x =0;
    direction_line.anchor.y =0.5;

    if(!global.is_development) {
      direction_line.alpha = 0;
    }

    this.sprite.addChild(direction_line);
  }

  attack(sprite) {
    this.sprite.animation_switch('knife', 'attack');

  }

  is_predator_to(prey) {
    //let testing = 0;

    this.min_pathfind_distance = 10;
    this.max_pathfind_distance = 700;

    const predator = this.sprite;

    ticker.add(() => {
      const distance_to_act = distance_between_points(predator, prey);

      if(distance_to_act < 200) {
        this.attack();
        return;
      }

      if(
        distance_to_act < this.min_pathfind_distance ||
        distance_to_act > this.max_pathfind_distance ||
        !this.sprite.status.alive
      ) {
        return;
      }
      //if(testing> 3) return;

      //console.log(distance_to_act);

      move_sprite_to_sprite_on_grid(predator, prey);

      //testing++;
    });
  }

  action_on_seeing_player(player_sprite) {
    if(!this.player_seen) {
      this.sprite.speak('now, calm down, dont move');
      this.sprite.stop();
      createjs.Tween.removeTweens(this.sprite);
    }

    this.player_seen = true;
    this.sprite.rotation = radian(player_sprite, this.sprite);
  }

  action_on_hearing_player(player_sprite) {
    pathfind_from_enemy_to_player(this.sprite, player_sprite);
  }
}

module.exports = {
  Enemy,
};
