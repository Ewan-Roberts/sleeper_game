'use strict';

const PIXI              = require('pixi.js');
const sprite_helper     = require('../utils/sprite_helper.js');
const bow_helper        = require('../weapons/bow.js');
const ticker            = require('../engine/ticker');
const viewport          = require('../engine/viewport.js');
const { Character }     = require('./character_model');
const { Keyboard }      = require('../input/keyboard');
const { Mouse }         = require('../input/mouse');

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

  add_controls() {
    this.keyboard = new Keyboard();
    this.mouse = new Mouse();

    viewport.on('mouseup', (event) => {
      this.mouse.mouse_up(event);
    });

    viewport.on('mousemove', (event) => {
      this.mouse.mouse_move(event);
    });

    viewport.on('mousedown', (event) => {
      this.mouse.mouse_down(event);
    });

    global.document.addEventListener('keydown', (e) => {
      this.keyboard.player_position = this.sprite.position;
      this.keyboard.key_down(e);
    });

    global.document.addEventListener('keyup', () => {
      this.keyboard.key_up();
    });
  }
}

module.exports = {
  Player,
};
