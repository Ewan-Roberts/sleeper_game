const PIXI = require('pixi.js');
const { put_blood_splatter_under_sprite } = require('../utils/sprite_helper.js');
const { pathfind_from_enemy_to_player } = require('../engine/pathfind.js')
const { arrow_shoot_from_sprite_to_sprite } = require('../weapons/bow.js');
const { createjs } = require('@createjs/tweenjs');
const ticker = require('../engine/ticker');
const viewport = require('../engine/viewport');
const { Character } = require('./character_model');

class Enemy extends Character {
  constructor() {
    super('enemy_container');

    this.container.addChild(this.sprite)
    viewport.addChild(this.container)
  }

  stop_and_shoot_player(player_sprite) {
    this.path.paused = true;
    let shot = false;

    if(!shot) {
      arrow_shoot_from_sprite_to_sprite(this.sprite, player_sprite)
      shot = true;
    }
  }

  create_patrol_path(path_data) {
    this.sprite.patrol_path = path_data;
  }
  
  //for testing
  create_direction_line() {
    const direction_line = PIXI.Sprite.fromFrame('black_dot');

    direction_line.width = 200;
    direction_line.height = 15;
    direction_line.anchor.x =0
    direction_line.anchor.y =0.5

    if(!global.is_development) {
      direction_line.alpha = 0;
    }

    this.sprite.addChild(direction_line);
  }

  action_on_seeing_player(player_sprite) {
    // first time you're seen 
    if(!this.player_seen) {
      this.speak('now, calm down, dont move');
      this.sprite.stop()
      createjs.Tween.removeTweens(this.sprite)
    }

    this.player_seen = true;

    this.sprite.rotation = Math.atan2(player_sprite.y - this.sprite.y, player_sprite.x - this.sprite.x);
  }

  action_on_hearing_player(player_sprite) {

    pathfind_from_enemy_to_player(this.sprite, player_sprite)

  }

}

module.exports = {
  Enemy,
}