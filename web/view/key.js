'use strict';

const { FadeSprite } = require('../effects/fade_sprite.js');
const { Text       } = require('pixi.js');

class KeyboardKey extends FadeSprite {
  constructor(letter) {
    const data = {image_name: 'key'};
    super(data);

    const text = new Text(letter);
    text.style.fontSize = 50;
    text.x +=  55;
    text.y -=  100;

    this.addChild(text);
  }

  press() {
    this.tint = 0x999999;
    this.bounce();
    this.pressed = true;
  }

}


module.exports = {
  KeyboardKey,
};
