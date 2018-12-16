'use strict';

const ticker = require('../engine/ticker');

function fade_out_sprite(sprite, speed){
  const count_down = () => {
    if (sprite.alpha > 0) {
      sprite.alpha -= speed || 0.005;
    } else {
      ticker.remove(count_down);
    }
  };

  ticker.add(count_down);
}

// todo: this could be running both
function fade_in_sprite(sprite, speed, limit){
  const count_up = () => {
    if (sprite.alpha < limit) {
      sprite.alpha += speed || 0.005;
    } else {
      ticker.remove(count_up);
    }
  };

  ticker.add(count_up);
}

class Effects {

  fade_to_black(sprite) {
    fade_out_sprite(sprite);
  }

  fade_to_normal(sprite) {
    fade_in_sprite(sprite);
  }
}

module.exports = {
  Effects,
};



