'use strict';

const PIXI = require('pixi.js');
const viewport = require('../../engine/viewport');
const rat_animations = require('../animations/rat');
const { move_sprite_to_point, distance_between_two_points } = require('../../engine/pathfind');
const ticker = require('../../engine/ticker');


const angle = (anchor, point) => Math.atan2( anchor.y - point.y,anchor.x - point.x)

class Rat {
  constructor() {

    this.animations = rat_animations;

    this.sprite = new PIXI.extras.AnimatedSprite(this.animations.move);
    this.sprite.anchor.set(0.5);
    this.sprite.animationSpeed = 0.4;
    this.sprite.rotation = -0.5;
    this.sprite.play();
    this.sprite.name = 'rat';

    viewport.getChildByName('critter_container').addChild(this.sprite);
  }

  create_patrol_path(path_data) {
    this.sprite.patrol_path = path_data;
  }

  set_position(point) {
    this.sprite.position.set(point.x, point.y);
  }

  // todo this is from the player model
  add_influence_box() {
    const influence_box = PIXI.Sprite.fromFrame('black_dot');

    influence_box.name = 'influence_box';
    influence_box.width = 2000;
    influence_box.height = 2000;
    influence_box.alpha = 0.4;
    influence_box.anchor.set(0.5);

    this.sprite.addChild(influence_box);
  }

  add_to_run_to() {

    const player = viewport.getChildByName('player');
    const rat = this.sprite;

    const dot = new PIXI.Sprite.fromFrame('bunny');
    dot.name = 'dot';

    this.sprite.addChild(dot);

    ticker.add(() => {

      dot.position.set(rat.x + (rat.x - player.x), rat.y +(rat.y - player.y));

    });

    viewport.addChild(dot);
  }

  is_prey_to() {


  }

  add_direction_line() {

    const player = viewport.getChildByName('player');
    const rat = this.sprite;

    const dot = new PIXI.Sprite.fromFrame('bunny');
    dot.name = 'dot';

    ticker.add(() => {

      dot.position.set(rat.x + (rat.x - player.x), rat.y +(rat.y - player.y));

    });

    viewport.addChild(dot);
  }

  distance_to_player() {
    //const player = viewport.getChildByName('player');

    //const distance = distance_between_two_points(this.sprite, player);

  }

  move_to_point(point) {
    move_sprite_to_point(this.sprite, {
      middle: {
        x: point.x,
        y: point.y,
      },
    });
  }
}

module.exports = {
  Rat,
};
