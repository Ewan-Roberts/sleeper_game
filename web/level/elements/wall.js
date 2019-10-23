const { World } = require('../../engine/pixi_containers');
const { Element    } = require('./model');

class Wall extends Element {
  constructor(data) {
    super({
      ...data,

      'image_name': 'black_dot',
      'tint'      : 0x000000,
    });

    World.add_to('collision', this);
  }
}

module.exports = {
  Wall,
};

