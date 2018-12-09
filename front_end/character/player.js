'use strict';

const PIXI              = require('pixi.js');
const sprite_helper     = require('../utils/sprite_helper.js');
const bow_helper        = require('../weapons/bow.js');
const ticker            = require('../engine/ticker');
const viewport          = require('../engine/viewport.js');
const { Character }     = require('./character_model');
const { Keyboard }      = require('../input/keyboard');

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

class Player extends Character{
  constructor() {
    super();

    this.sprite = new PIXI.extras.AnimatedSprite(this.create_bow_idle_frames());
    this.sprite.animations = {
      bow: {
        idle:   this.create_bow_idle_frames(),
        walk:   this.create_bow_walk_frames(),
        ready:  this.create_bow_ready_frames(),
      },
    };

    this.sprite.anchor.set(0.5);
    this.sprite.width /= 2;
    this.sprite.height /= 2;
    this.sprite.animationSpeed = 0.4;
    this.sprite.play();
    this.sprite.zIndex = -1;
    this.sprite.name = 'player';
    this.shift_pressed = false;
    this.inventory_open = false;
    this.weapon = 'bow';
    this.power = 1000;
    this.allow_shoot = true;
    this.movement_speed = 15;

    viewport.addChild(this.sprite);
  }

  follow_player() {
    viewport.follow(this.sprite);
  }

  create_bow_idle_frames() {
    const bow_frames = [];
    for (let i = 0; i <= 21; i += 1) {
      let name = `survivor-bow-idle-0${i}`;

      if (i >= 10) {
        name = `survivor-bow-idle-${i}`;
      }
      bow_frames.push(PIXI.Texture.fromFrame(name));
    }
    return bow_frames;
  }

  create_bow_ready_frames() {
    const ready_frames = [];
    for (let i = 0; i <= 38; i += 1) {
      let name = `survivor-bow-pull-0${i}`;

      if (i >= 10) {
        name = `survivor-bow-pull-${i}`;
      }

      ready_frames.push(PIXI.Texture.fromFrame(name));
    }
    return ready_frames;
  }

  create_bow_walk_frames() {
    const walk_frames = [];
    for (let i = 0; i <= 20; i += 1) {
      let name = `survivor-walk_bow_0${i}`;

      if (i >= 10) {
        name = `survivor-walk_bow_${i}`;
      }
      walk_frames.push(PIXI.Texture.fromFrame(name));
    }
    return walk_frames;
  }

  set_position(x,y) {
    this.sprite.position.set(x, y);
  }

  add_aiming_line() {
    this.aiming_line = new PIXI.Graphics();
    this.aiming_line.name = 'aiming_line';

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

  mouse_move() {
    viewport.on('mousemove', (event) => {
      //const mouse_position = get_mouse_position(event,viewport);
      const mouse_position_player = get_mouse_position_from_player(event, this.sprite, viewport);

      this.aiming_cone.position.set(this.sprite.position.x, this.sprite.position.y);
      this.aiming_cone.rotation = sprite_helper.get_angle_from_point_to_point(this.sprite, mouse_position_player) - 1.575;

      //this.aiming_line.clear();
      //this.aiming_line.position.set(this.sprite.position.x, this.sprite.position.y);
      //this.aiming_line.lineStyle(3, 0xffffff, 1).moveTo(0, 0).lineTo(mouse_position.x, mouse_position.y);

      this.sprite.rotation = sprite_helper.get_angle_from_point_to_point(this.sprite, mouse_position_player);

      viewport.addChild(this.aiming_cone, this.aiming_line);
    });
  }

  mouse_down() {
    viewport.on('mousedown', (event) => {
      if(!this.shift_pressed) return;
      this.aiming_cone.alpha = 0;
      this.aiming_cone.count = 10;
      this.aiming_cone.width = 500;
      this.aiming_cone.height = 300;
      this.power = 900;

      this.sprite.textures = this.sprite.animations.bow.ready;
      this.sprite.loop = false;
      /* perfomance!!!
      this.count_down = () => {
         if(this.power < 300) {
          ticker.remove(this)
          return
        }
        if (this.power > 750) {
          this.allow_shoot = false;
        } else {
          this.allow_shoot = true;
        }
        console.log(this.power)

        this.aiming_cone.width -= 1.5;
        this.aiming_cone.height += 3;
        this.aiming_cone.alpha += 0.002
        this.aiming_cone.count -= 0.04;
        //this.aiming_cone.filters[0].blur = this.aiming_cone.count;

        if (this.power > 400) {
          this.power -= 10;
        }
      }
      ticker.add(this.count_down);
      */
      if (this.weapon === 'bow') {
        const mouse_position_player = get_mouse_position_from_player(event, this.sprite, viewport);

        this.sprite.rotation = sprite_helper.get_angle_from_point_to_point(this.sprite, mouse_position_player);
        this.sprite.gotoAndPlay(0);
      }
    });
  }

  mouse_up() {
    viewport.on('mouseup', (event) => {
      const poo = new PIXI.Sprite.fromFrame('bunny');
      poo.position.x = viewport.center.x;
      poo.position.y = viewport.bottom;
      viewport.addChild(poo);
      this.moveable = true;
      this.sprite.play();

      ticker.remove(this.count_down);
      this.aiming_cone.alpha = 0;
      if (this.weapon === 'bow' && this.allow_shoot /*&& this.shift_pressed*/) {
        this.sprite.textures = this.sprite.animations.bow.idle;

        const mouse_position_player = get_mouse_position_from_player(event, this.sprite, viewport);
        bow_helper.arrow_management(this.power, this.sprite, mouse_position_player);
      }
    });
  }

  add_controls() {
    const keyboard = new Keyboard();
    const player_position = this.sprite.getGlobalPosition();

    global.document.addEventListener('keydown', (e) => {
      keyboard.player_position = this.sprite.position;
      keyboard.key_down(e);
    });

    global.document.addEventListener('keyup', () => {
      keyboard.key_down();
    });
  }
}

module.exports = {
  Player,
};
