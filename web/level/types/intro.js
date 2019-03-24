'use strict';

const { sleep       } = require('../../utils/time');
const { Shadow_Room } = require('./shadow_room');
const { Camera      } = require('../../engine/camera');

class Intro extends Shadow_Room {
  constructor(player) {
    super(player);

    this.camera = new Camera();
  }

  async start() {
    // global.set_light_level(0.4);
    this.camera.tween.from({ x: -120, y: -150 });
    this.camera.tween.to({ x: -100,  y: -120 });
    this.camera.tween.to({ x: -300, y: 100 });
    this.camera.tween.smooth();
    this.player.keyboard.can_move = false;

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
    this.wall_candle.show();
    this.wall_candle.start_flickering();
    this.player.animation.state_to = 'candle';
    await sleep(2500);
    this.table_candle.show();
    this.table_candle.start_flickering();

    this.player.keyboard.can_move = true;
  }
}

module.exports = {
  Intro,
};
