'use strict';

const viewport = require('../engine/viewport');
const PIXI = require('pixi.js');
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


const container = new PIXI.Container();
container.name = 'cutscene_container';
container.zIndex = -100;
viewport.addChild(container);


class Cutscene {
  constructor() {
    this.effects = new Effects();
    this.image_to_fade = PIXI.Sprite.fromFrame('black_dot');
    this.image_to_fade.width = viewport.screenWidth;
    this.image_to_fade.height = viewport.screenHeight;
    this.image_to_fade.anchor.set(0.5);
    //this.image_to_fade.position.set(500,500);
    container.addChild(this.image_to_fade);
  }

  fade_screen_in_at_point(x,y) {
    this.image_to_fade.position.set(x,y);

    this.effects.fade_to_black(this.image_to_fade);
  }

}

module.exports = {
  Cutscene,
};



