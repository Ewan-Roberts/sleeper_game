'use strict';

const PIXI = require('pixi.js');
const ticker = require('../engine/ticker');
const viewport = require('../engine/viewport.js');

class visual_effects {

  static fade_out_sprite(sprite, speed){
    const count_down = () => {
      if (sprite.alpha > 0) {
        sprite.alpha -= speed || 0.005;
      } else {
        ticker.remove(count_down);
      }
    };

    ticker.add(count_down);
  }

  static fade_in_sprite(sprite, speed, limit){
    const count_up = () => {
      if (sprite.alpha < limit) {
        sprite.alpha += speed || 0.005;
      } else {
        ticker.remove(count_up);
      }
    };

    ticker.add(count_up);
  }

  static fade_screen_to_black_at_point(point) {

    const image_to_fade = PIXI.Sprite.fromFrame('black_dot');

    image_to_fade.width = viewport.screenWidth;
    image_to_fade.height = viewport.screenHeight;
    image_to_fade.anchor.set(0.5);
    image_to_fade.position.set(point.x, point.y);
    image_to_fade.zIndex = viewport.zIndex_layer.very_close;

    this.fade_out_sprite(image_to_fade);
    viewport.getChildByName('cutscene_container').addChild(image_to_fade);
  }

}


module.exports = {
  visual_effects,
};




