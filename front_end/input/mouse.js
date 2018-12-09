'use strict';

const viewport          = require('../engine/viewport');
const sprite_helper     = require('../utils/sprite_helper.js');
const PIXI              = require('pixi.js');
const ticker            = require('../engine/ticker');
const bow_helper        = require('../weapons/bow.js');

const get_mouse_position = (event, viewport) => ({
  x: event.data.global.x - viewport.screenWidth / 2,
  y: event.data.global.y - viewport.screenHeight / 2,
});

const get_mouse_position_from_player = (event, sprite, viewport) => {
  const mouse_position = get_mouse_position(event, viewport);

  mouse_position.x += sprite.x;
  mouse_position.y += sprite.y;

  return mouse_position;
};

class Mouse {
  constructor() {
    this.moveable = true;
    this.player = viewport.getChildByName('player');
    this.allow_shoot = true;
    this.aiming_cone = viewport.getChildByName('aiming_cone');
    this.weapon = 'bow';
    this.power = 1000;
    this.aiming_line = new PIXI.Graphics();
    this.aiming_line.name = 'aiming_line';
    this.add_aiming_cone();

    viewport.addChild(this.aiming_line);
  }

  add_aiming_cone() {
    this.aiming_cone = PIXI.Sprite.fromFrame('yellow_triangle');

    this.aiming_cone.height = 800;
    this.aiming_cone.width = 400;
    this.aiming_cone.anchor.x = 0.5;
    this.aiming_cone.alpha = 0;
    //this.aiming_cone.filters = [new PIXI.filters.BlurFilter()];
    this.aiming_cone.name = 'aiming_cone';

    viewport.addChild(this.aiming_cone);
  }

  up(event) {
    if(!this.player.shift_pressed) return;

    this.moveable = true;
    this.player.play();
    this.player.textures = this.player.animations.bow.idle;

    ticker.remove(this.count_down);
    this.aiming_cone.alpha = 0;
    if (this.weapon === 'bow' && this.allow_shoot) {
      const mouse_position_player = get_mouse_position_from_player(event, this.player, viewport);
      bow_helper.arrow_management(this.power, this.player, mouse_position_player);
    }
  }

  down(event) {
    if(!this.player.shift_pressed) return;
    this.aiming_cone.alpha = 0;
    this.aiming_cone.count = 10;
    this.aiming_cone.width = 500;
    this.aiming_cone.height = 300;
    this.power = 900;

    this.player.textures = this.player.animations.bow.ready;
    this.player.loop = false;
    this.count_down = () => {
      if (!this.player.shift_pressed){
        ticker.remove(this.count_down);
        this.aiming_cone.alpha = 0;
        return;
      }
      if(this.power < 300) {
        this.player.textures = this.player.animations.bow.idle;
        ticker.remove(this.count_down);
        return;
      }
      if (this.power > 650) {
        this.allow_shoot = false;
      } else {
        this.allow_shoot = true;
      }

      this.aiming_cone.width -= 1.5;
      this.aiming_cone.height += 3;
      this.aiming_cone.alpha += 0.002;
      this.aiming_cone.count -= 0.04;
      //this.aiming_cone.filters[0].blur = this.aiming_cone.count;

      if (this.power > 400) {
        this.power -= 5;
      }
    };
    ticker.add(this.count_down);

    const mouse_position_player = get_mouse_position_from_player(event, this.player, viewport);
    this.player.rotation = sprite_helper.get_angle_from_point_to_point(this.player, mouse_position_player);
    this.player.gotoAndPlay(0);
  }

  move(event) {
    const mouse_position_player = get_mouse_position_from_player(event, this.player, viewport);

    this.aiming_cone.position.set(this.player.x, this.player.y);
    this.aiming_cone.rotation = sprite_helper.get_angle_from_point_to_point(this.player, mouse_position_player) - 1.575;

    this.player.rotation = sprite_helper.get_angle_from_point_to_point(this.player, mouse_position_player);

    viewport.addChild(this.aiming_cone, this.aiming_line);
  }
}

module.exports = {
  Mouse,
};
