'use strict';

const viewport          = require('../../engine/viewport.js');

const { Character }     = require('../character_model');
const { Keyboard }      = require('../../input/keyboard');
const { Mouse }         = require('../../input/mouse');
const { socket }        = require('../../engine/socket');
const { Vitals }        = require('../attributes/vitals');

class Player extends Character{
  constructor() {
    super();
    this.sprite.name = 'player';
    this.sprite.height /= 2;
    this.sprite.width /= 2;
    this.sprite.status = new Vitals();

    viewport.addChild(this.sprite);
  }

  follow_player() {
    viewport.follow(this.sprite);
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

    viewport.on('mousedown', (event) => {
      this.mouse.down(event);
    });

    global.document.addEventListener('keydown', (event) => {
      this.keyboard.key_down(event);
      socket.emit('client_player_location', {
        x: this.sprite.x,
        y: this.sprite.y,
      });
    });

    global.document.addEventListener('keyup', () => {
      this.keyboard.key_up();
    });
  }
}

module.exports = {
  Player,
};
