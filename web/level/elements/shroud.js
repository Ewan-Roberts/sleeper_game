const { World } = require('../../engine/pixi_containers');
const { Fade    } = require('../../effects/fade');
const { Element } = require('./model');

class Shroud extends Element {
  constructor(data) {
    super({
      ...data,
      'image_name': 'black_dot',
    });
    this.remove_on_enter = data.remove_on_enter;
    this.alpha_on_enter  = data.alpha_on_enter;

    World.add_to('shroud', this);
  }

  fade_out_destroy() {
    if(this._destroyed) {
      return;
    }
    Fade.out_destroy(this);
  }

  fade_out(time) {
    if(this._destroyed) {
      return;
    }
    Fade.out(this, { time, 'visible_on_end': true });
  }
}

module.exports = {
  Shroud,
};
