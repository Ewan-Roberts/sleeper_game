'use strict';

const { visuals    } = require('../engine/pixi_containers');
const { FadeSprite } = require('../effects/fade_sprite.js');
const { Text       } = require('pixi.js');

class KeyboardKey extends FadeSprite {
  constructor(letter) {
    super({image_name: 'key'});

    const text = new Text(letter);
    text.style.fontSize = 50;
    text.x += 55;
    text.y -= 100;

    this.addChild(text);
    visuals.addChild(this);
  }

  press() {
    this.tint = 0x006400;
    this.bounce();
    this.pressed = true;
  }
}


module.exports = {
  KeyboardKey,
};
