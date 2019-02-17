'use strict';

const PIXI = require('pixi.js');

const { visual_effects_container } = require('../engine/pixi_containers');
const { world } = require('../engine/shadows');

class icon {
  constructor(image, point) {
    this.icon = PIXI.Sprite.fromFrame(image);
    this.icon.anchor.set(0.5);
    this.icon.alpha  = 1;
    this.icon.height = 50;
    this.icon.width  = 50;
    this.icon.position.set(point.x +20, point.y-20);
    this.icon.interactive = true;
    this.icon.buttonMode = true;
    this.icon.zIndex = -9;
    this.icon.on('click', ()=> {
      console.log('click');
    });

    visual_effects_container.addChild(this.icon);
  }

  remove() {
    visual_effects_container.removeChild(this.icon);
  }

}

module.exports = {
  icon,
};
