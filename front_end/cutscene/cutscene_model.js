'use strict';

const viewport = require('../engine/viewport');
const { Effects } = require('./cutscene_utils');
const PIXI = require('pixi.js');

const container = new PIXI.Container();
container.name = 'cutscene_container';
container.zIndex = -100;
viewport.addChild(container);


class Cutscene {
  constructor() {
    this.player = viewport.getChildByName('player');
    this.effects = new Effects();
    this.image_to_fade = PIXI.Sprite.fromFrame('black_dot');
    this.image_to_fade.width = viewport.screenWidth;
    this.image_to_fade.height = viewport.screenHeight;
    this.image_to_fade.anchor.set(0.5);
    //this.image_to_fade.position.set(500,500);
    console.log(viewport);
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



