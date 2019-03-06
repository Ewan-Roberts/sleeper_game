'use strict';

const { sleep       } = require('../../engine/time');
const { Shadow_Room } = require('../../level/types/shadow_room');

class Intro extends Shadow_Room {
  constructor() {
    super();
  }

  async start() {
    // global.set_light_level(0.4);

    this.player.keyboard.can_move = false;
    this.player.keyboard.move.on('event', () => {
      this.player.light.set_position(this.player.sprite);
    });

    this.wall_candle.hide();
    this.table_candle.hide();
    this.lighter.hide();

    this.sun.show();
    this.sun.fade.in(0.05, 0.8);

    this.ambient.fade_in(0.005, 0.05);

    this.camera.tween.time = 11000;
    this.camera.tween.start();

    this.lantern.tween.time = 10000;
    this.lantern.tween.start();
    this.lantern.tween.movement.on('end', () => {
      this.lantern.remove();
    });

    this.player.tween.time = 6000;
    this.player.tween.start();

    this.player.tween.movement.on('update', () => {
      this.player.light.set_position(this.player.sprite);
    });

    await sleep(6000);
    this.lighter.strike.start();

    await sleep(2500);
    // this.wall_candle.show();
    // this.wall_candle.start_flickering();
    this.player.animation.state_to = 'candle';
    await sleep(2500);
    // this.table_candle.show();
    // this.table_candle.start_flickering();

    this.player.keyboard.can_move = true;
  }
}

module.exports = {
  Intro,
};
