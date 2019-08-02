const { shrouds } = require('../../engine/pixi_containers');
const { Fade    } = require('../../effects/fade');
const { Element } = require('./model');

class Shroud extends Element {
  constructor(data) {
    super({
      ...data,
      image_name:'black_dot',
    });
    this.remove_on_enter = data.remove_on_enter;
    this.alpha_on_enter  = data.alpha_on_enter;

    shrouds.addChild(this);
  }

  fade_out_destroy() {
    if(this._destroyed) return;
    Fade.out_destroy(this);
  }
}

module.exports = {
  Shroud,
};
