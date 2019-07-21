const { shrouds } = require('../../engine/pixi_containers');
const { Fade    } = require('../../effects/fade');
const { env     } = require('../../../config');

const { Sprite, Texture, DEG_TO_RAD } = require('pixi.js');

class Shroud extends Sprite {
  constructor(data) {
    super(Texture.fromImage('black_dot'));
    this.id       = data.id;
    this.height   = data.height;
    this.width    = data.width;
    this.alpha    = data.alpha || env.brightness;
    this.rotation        = data.rotation * DEG_TO_RAD;
    this.remove_on_enter = data.remove_on_enter;
    this.alpha_on_enter  = data.alpha_on_enter;
    this.anchor.set(0, 1);
    this.position.copy(data);

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
