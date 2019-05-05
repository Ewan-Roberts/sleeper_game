'use strict';
const { Sprite } = require('pixi.js');

const { visual_effects_container } = require('../engine/pixi_containers');

class Blood {
  add_at(point) {
    const blood_splatter = new Sprite.fromFrame('round_floor_stain');
    blood_splatter.anchor.set(0.5);
    blood_splatter.alpha = 0.3;
    blood_splatter.position.set(point.x, point.y);

    visual_effects_container.addChild(blood_splatter);
  }
}

module.exports = {
  Blood,
};
