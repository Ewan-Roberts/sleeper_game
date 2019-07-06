const { fill_screen_at } = require('../effects/fade_sprite');
const { visuals   } = require('../engine/pixi_containers');
const { FloorWord } = require('../effects/floor_word');
const { sleep     } = require('../utils/time.js');
const { keyboardManager, Text } = require('pixi.js');

class Dialog_Script {
  constructor(dialog_array, point) {
    this.script = dialog_array;
    this.point  = point;
    this.iterator = this.generator();
  }

  * generator() {
    while(this.script.length > 0) {
      const word_to_render = this.script.splice(0,1);

      const word = new Text(word_to_render, {
        fill:   'white',
        weight: 'bolder',
      });
      word.anchor.set(0.5);
      word.alpha = 0.5;

      word.position.copy(this.point);
      word.y -= 50;

      visuals.addChild(word);
      yield;
      word.destroy();
    }
  }
}

module.exports = {
  Dialog_Script,
};
