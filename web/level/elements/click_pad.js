const { pads    } = require('../../engine/pixi_containers');
const { env     } = require('../../../config');
const { Element } = require('./model');

class Click_Pad extends Element {
  constructor(data) {
    super({
      ...data,
      image_name: 'black_dot',
      alpha:      (env.dev)?0.2:0,
      tint:       0xffff00,
    });
    this.interactive = true;
    this.buttonMode  = true;

    pads.addChild(this);
  }
}

module.exports = {
  Click_Pad,
};
