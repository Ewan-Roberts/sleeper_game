'use strict';

const PIXI = require('pixi.js');
const { visual_effects_container } = require('../engine/pixi_containers');

class View_Aiming_Line {
  /*
   * param {PIXI.Sprite} start
   * param {PIXI.Sprite} end
   * param {Point} end
   */
  static add_between_sprites(start, end) {
    const line = new PIXI.Graphics();

    line.lineStyle(1, 0xffffff)
      .moveTo(start.x, start.y)
      .lineTo(end.x, end.y);

    visual_effects_container.addChild(line);
  }

}

module.exports = {
  View_Aiming_Line,
};
