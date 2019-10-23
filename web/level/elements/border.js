const { World } = require('../../engine/pixi_containers');
const { env     } = require('../../../config');
const { Element } = require('./model');

class Border extends Element {
  constructor(data) {
    super({
      ...data,

      'image_name': 'black_dot',
      'alpha'     : (env.visable_borders) ? 0.2 : 0,
    });

    World.add_to('border', this);
  }
}

module.exports = {
  Border,
};
