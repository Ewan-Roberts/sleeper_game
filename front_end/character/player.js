'use strict';

const PIXI              = require('pixi.js');
const viewport          = require('../engine/viewport.js');
const { Character }     = require('./character_model');
const { Keyboard }      = require('../input/keyboard');
const { Mouse }         = require('../input/mouse');

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
      this.mouse.up(event);
    });

    viewport.on('mousemove', (event) => {
      this.mouse.move(event);
    });
    console.log(viewport)

    viewport.on('mousedown', (event) => {
      this.mouse.down(event);
    });

    global.document.addEventListener('keydown', (event) => {
      this.keyboard.key_down(event);
    });

    global.document.addEventListener('keyup', () => {
      this.keyboard.key_up();
    });
  }
}

module.exports = {
  Player,
};
