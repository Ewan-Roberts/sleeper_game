const { visuals    } = require('../engine/pixi_containers');
const { FadeSprite } = require('../effects/fade_sprite.js');
//const { FadeSprite } = require('../../configfade_sprite.js');
const { Text       } = require('pixi.js');

class KeyboardKey extends FadeSprite {
  constructor(letter) {
    super({image_name: 'key'});

    const text = new Text(letter);
    text.style.fontSize = 55;
    text.x += 55;
    text.y -= 100;
    this.alpha = 0;

    this.fired = false;
    this.addChild(text);
    visuals.addChild(this);
  }

  bounce_out() {
    if(this.fired) return;
    this.alpha = 0.5;
    this.tint = 0x32cd80;
    this.bounce();
    this.fired = true;
  }
}

class WASD {
  constructor() {
    this.w_letter = new KeyboardKey('W');
    this.a_letter = new KeyboardKey('A');
    this.s_letter = new KeyboardKey('S');
    this.d_letter = new KeyboardKey('D');
    this._complete = false;
  }

  fade_in(time) {
    this.w_letter.fade_in(time);
    this.a_letter.fade_in(time);
    this.s_letter.fade_in(time);
    this.d_letter.fade_in(time);
  }

  set_position(point) {
    this.w_letter.position.copy({
      x: point.x,
      y: point.y-50,
    });
    this.a_letter.position.copy({
      x: point.x-50,
      y: point.y,
    });
    this.s_letter.position.copy(point);
    this.d_letter.position.copy({
      x: point.x+50,
      y: point.y,
    });
  }

  press(key) {
    switch(key) {
      case 87: return this.w_letter.bounce_out();
      case 65: return this.a_letter.bounce_out();
      case 83: return this.s_letter.bounce_out();
      case 68: return this.d_letter.bounce_out();
    }
  }
  set complete(value) {
    this._complete = value;
  }

  get complete() {
    if(
      this.w_letter.fired &&
      this.a_letter.fired &&
      this.s_letter.fired &&
      this.d_letter.fired
    ) {
      this._complete = true;
    }

    return this._complete;
  }

  get all_pressed() {
    return (
      this.w_letter.pressed &&
      this.a_letter.pressed &&
      this.s_letter.pressed &&
      this.d_letter.pressed
    );
  }
}

module.exports = {
  WASD,
};
