const { visuals    } = require('../engine/pixi_containers');
const { FadeSprite } = require('../effects/fade_sprite.js');
const { Text       } = require('pixi.js');

class KeyboardKey extends FadeSprite {
  constructor(letter) {
    super({ 'image_name': 'key' });

    const text = new Text(letter);
    text.style.fontSize = 50;
    text.x += 55;
    text.y -= 100;
    this.alpha = 0;
    this.fired = false;
    this.addChild(text);
    visuals.addChild(this);
  }

  bounce_out() {
    if(this.fired) {
      return;
    }
    this.alpha = 0.5;
    this.tint = 0x32cd80;
    this.bounce();
    this.fired = true;
  }
}


module.exports = {
  KeyboardKey,
};
