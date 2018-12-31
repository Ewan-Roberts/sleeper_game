'use strict';

const viewport          = require('../../engine/viewport.js');

const { Character }     = require('../character_model');
const { Keyboard }      = require('../../input/keyboard');
const { Mouse }         = require('../../input/mouse');
const { socket }        = require('../../engine/socket');
const { GUI_HUD }       = require('../../gui/inventory');

class Player extends Character{
  constructor() {
    super();

    this.sprite.name = 'player';
    this.sprite.zIndex = -2;

    viewport.addChild(this.sprite);
  }

  follow_player() {
    viewport.follow(this.sprite);
  }

  set_initial_vitals() {

    this.sprite.vitals = {
      health: 100,
      food: 40,
      water: 20,
      heat: 90,
      sleep: 100,
      status: 'alive',
    };
  }

  increase_food(number) {
    if(this.sprite.vitals.food + number < 100 ) {
      this.sprite.vitals.food += number;
      GUI_HUD.update_vitals(this.sprite.vitals);
    }
  }

  set_ticker_amount() {

    this.sprite.ticker_values = {
      health: 5,
      food: 5,
      water: 5,
      heat: 5,
      sleep: 5,
    };
  }

  set_vitals_ticker() {

    setInterval(()=> {

      this.sprite.vitals.health -= this.sprite.ticker_values.health;
      this.sprite.vitals.food -= this.sprite.ticker_values.food;
      this.sprite.vitals.water -= this.sprite.ticker_values.water;
      this.sprite.vitals.heat -= this.sprite.ticker_values.heat;
      this.sprite.vitals.sleep -= this.sprite.ticker_values.sleep;
      GUI_HUD.update_vitals(this.sprite.vitals);
    }, 5000);
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
