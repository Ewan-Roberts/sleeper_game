'use strict';

const PIXI = require('pixi.js');
const { GlitchFilter   } = require('@pixi/filter-glitch');
const { PixelateFilter } = require('@pixi/filter-pixelate');
const { item_container } = require('../../engine/pixi_containers');
const { timer          } = require('../../engine/ticker');
const { ringing_phone, answer_phone  } = require('../../engine/sound');
const { LED            } = require('../../light/types/led');
const { Item           } = require('./item_model');

class Phone extends Item {
  constructor(options) {
    super(options.image_name);
    this.name  = 'phone';

    this.effect = ringing_phone;
    this.effect.volume = 0.01;

    this.voice = answer_phone;
    this.voice.volume = 0.4;

    this.blink();
    this.blink_timer.start();

    this.click = () => {
      this.remove_click();
      this.answer();
    };

    this.light = new LED();

    item_container.addChild(this.sprite);
  }

  async answer() {
    this.effect.stop();
    this.blink_timer.stop();

    this.voice.filters = [new PIXI.sound.filters.TelephoneFilter()];
    const instance = await this.voice.play();
    this.light.show();
    this.light.range = 200;
    this.light.intensity = 7;

    instance.on('end', () => {
      this.sprite.filters = [];
      this.glitch_timer.stop();
      this.light.hide();
    });
  }

  glitch_phone() {
    this.glitch_timer = timer.createTimer(100);
    this.glitch_timer.repeat = 100;

    this.sprite.filters = [
      new GlitchFilter({
        offset: 10,
        minSize: 4,
        sampleSize: 10,
        fillMode: 1,
      }),
      new PixelateFilter({x: 4, y: 4}),
    ];

    this.glitch_timer.on('repeat', () => {
      const random = Math.random() * 10;

      this.sprite.filters[0].direction = random * 3;
      this.sprite.filters[0].offset    = random * 2;
      this.sprite.filters[0].rotation  = random * 6;
      this.sprite.filters[1].size.x    = random;
      this.sprite.filters[1].size.y    = random;
    });

    this.glitch_timer.start();
  }

  blink(time = 2000) {
    let light_state    = true;

    this.blink_timer  = timer.createTimer(time);
    this.blink_timer.repeat = 10;

    this.blink_timer.on('start', () => {
      this.light.set_position(this.sprite);

      this.light.show();
    });

    this.blink_timer.on('repeat', () => {
      if(light_state) {
        this.light.show();
        this.sprite.tint = 0x32CD32;

        this.effect.play();

        light_state = false;
      } else {
        this.light.hide();
        this.sprite.tint = 0x000000;
        light_state = true;
      }
    });

    this.blink_timer.on('stop', () => {
      this.glitch_phone();
    });
  }
}

module.exports = {
  Phone,
};


