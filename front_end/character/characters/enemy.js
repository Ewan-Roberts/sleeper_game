'use strict';

const PIXI = require('pixi.js');
const viewport = require('../../engine/viewport');

const { pathfind_from_enemy_to_player } = require('../../engine/pathfind.js');
const { createjs } = require('@createjs/tweenjs');
const { Character } = require('../character_model');

const container = new PIXI.Container();
container.name = 'enemy_container';
container.zIndex = -10;
viewport.addChild(container);

class Enemy extends Character {
  constructor() {
    super();
    this.sprite.speak = (text) => {
      const render_text = new PIXI.Text(text);
      render_text.x = this.sprite.x - 100;
      render_text.y = this.sprite.y - 80;
      render_text.alpha = 1;
      container.addChild(render_text);
    };

    container.addChild(this.sprite);
  }

  create_patrol_path(path_data) {
    this.sprite.patrol_path = path_data;
  }

  //for testing
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

  action_on_seeing_player(player_sprite) {
    if(!this.player_seen) {
      this.sprite.speak('now, calm down, dont move');
      this.sprite.stop();
      createjs.Tween.removeTweens(this.sprite);
    }

    this.player_seen = true;
    this.sprite.rotation = Math.atan2(player_sprite.y - this.sprite.y, player_sprite.x - this.sprite.x);
  }

  action_on_hearing_player(player_sprite) {
    pathfind_from_enemy_to_player(this.sprite, player_sprite);
  }
}

module.exports = {
  Enemy,
};
