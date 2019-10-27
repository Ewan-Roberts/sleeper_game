const { World } = require('../../engine/pixi_containers');
const { env     } = require('../../../config');
const { Button  } = require('../../view/button');
const { Element } = require('./model');
const event = require('events');

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
    // TODO remove
    this.events = new event();

    World.add_to('pad', this);

    if(data.label) {
      this.label(data);
    }
  }

  label({
    label_action,
    label_description,
    label_image,
  }) {
    this.button = new Button(this, {
      label_action,
      label_description,
      label_image,
    });
  }
}

module.exports = {
  Click_Pad,
};
