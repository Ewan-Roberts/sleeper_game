'use strict';
const { Graphics } = require('pixi.js');
const { visuals  } = require('../engine/pixi_containers');

class Aiming_Line {
  constructor() {
    this.name = 'aiming_line';

    this.line = new Graphics();
    this.line.lineStyle(0.1, 0xffffff);
  }

  add_between_sprites(start, end) {

    this.line.moveTo(start.x, start.y)
      .lineTo(end.x, end.y);

    visuals.addChild(this.line);
  }
}

module.exports = {
  Aiming_Line,
};
