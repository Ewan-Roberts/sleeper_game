
'use strict';
const { KeyboardKey } = require('./key');

class WASD {
  constructor() {
    this.w_letter = new KeyboardKey('W');
    this.a_letter = new KeyboardKey('A');
    this.s_letter = new KeyboardKey('S');
    this.d_letter = new KeyboardKey('D');
    this.finished = false;
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
    switch (key) {
      case 'w': this.w_letter.press(); return;
      case 'a': this.a_letter.press(); return;
      case 's': this.s_letter.press(); return;
      case 'd': this.d_letter.press(); return;
    }
  }

  get complete() {
    if(this.finished) return false;

    if(this.all_pressed) {
      this.finished = true;
      return true;
    }
    return false;
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
