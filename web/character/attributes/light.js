
'use strict';

const { Candle } = require('../../light/types/candle');

class Light {
  constructor({ tween, sprite }) {
    this.name      = 'light';
    this.candle    = new Candle();

    this.tween  = tween;
    this.sprite = sprite;
  }

  set_position({x, y}) {
    this.candle.set_position({x,y});
  }
}

module.exports = {
  Light,
};
