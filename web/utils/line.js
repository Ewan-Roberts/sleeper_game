'use strict';

const { Graphics } = require('pixi.js');
const { guis     } = require('../engine/pixi_containers');

function draw_path(path) {
  const graphical_path = new Graphics();
  graphical_path.lineStyle(3, 0xffffff, 0.5);
  graphical_path.drawPath(path);

  guis.addChild(graphical_path);
}

module.exports = {
  draw_path,
};
