const { collisions } = require('../../engine/pixi_containers');
const { Element    } = require('./model');

class Wall extends Element {
  constructor(data) {
    super({
      ...data,

      image_name: 'black_dot',
      tint:       0x000000,
    });

    collisions.addChild(this);
  }
}

module.exports = {
  Wall,
};


