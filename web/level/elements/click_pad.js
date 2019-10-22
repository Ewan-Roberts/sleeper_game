const { pads    } = require('../../engine/pixi_containers');
const { env     } = require('../../../config');
const { Element } = require('./model');

class Click_Pad extends Element {
  constructor(data) {
    super({
      ...data,
      'image_name': 'white_tiles',
      'alpha'     : (env.dev) ? 0.9 : 0,
      'tint'      : 0xff0000,
    });
    this.interactive = true;
    this.buttonMode  = true;

    pads.addChild(this);
  }
}

module.exports = {
  Click_Pad,
};
