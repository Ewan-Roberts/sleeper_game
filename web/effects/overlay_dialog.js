'use strict';

const { fill_screen_at } = require('../effects/fade_sprite');
const { visuals   } = require('../engine/pixi_containers');
const { FloorWord } = require('../effects/floor_word');
const { sleep     } = require('../utils/time.js');
const { keyboardManager } = require('pixi.js');

class Overlay_Dialog {
  constructor(dialog_array, point) {
    this.script = dialog_array;
    this.point  = point;

    this.button = new FloorWord({
      font_size: 40,
      fill:      'white',
      weight:    'bolder',
      text:      'next',
    });
  }

  async next_button() {
    this.button.tint = 0x383838;
    this.enable = true;
    this.button.position.copy({
      x: this.point.x+200,
      y: this.point.y+150,
    });

    this.button.interactive = true;
    this.button.on('mouseover', () => this.button.tint = 0xd3d3d3);
    this.button.on('mouseout', () => this.button.tint = 0x383838);
    this.button.on('mouseup', () => this.button.tint = 0xd3d3d3);

    await sleep(4000);
    this.button.fade_in();
    visuals.addChild(this.button);
  }

  async * generator() {
    this.background = fill_screen_at(this.point);
    this.iterator   = this.generator();
    keyboardManager.disable();

    this.next_button();
    await sleep(3000);

    while(this.script.length > 0) {
      const word_to_render = this.script.splice(0,1);

      const word = new FloorWord({
        font_size: 100,
        fill:      'white',
        weight:    'bolder',
        text:      word_to_render,
      });

      word.position.copy(this.point);

      visuals.addChild(word);
      word.fade_in();
      yield;
      this.enable = false;
      word.fade_out();
      await sleep(1000);
      this.enable = true;
    }

    keyboardManager.enable();
    this.background.fade_out();
    this.button.destroy();
  }
}

module.exports = {
  Overlay_Dialog,
};
