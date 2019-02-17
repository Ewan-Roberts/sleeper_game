'use strict';

const PIXI = require('pixi.js');

const { visual_effects_container } = require('../engine/pixi_containers');

class icon {
  constructor(image, point) {
    this.element = PIXI.Sprite.fromFrame(image);
    this.element.anchor.set(0.5);
    this.element.alpha  = 0;
    this.element.height = 50;
    this.element.width  = 50;
    this.element.position.set(point.x +20, point.y-20);
    this.element.interactive = true;
    this.element.buttonMode = true;
    this.element.zIndex = -9;
    this.element.on('click', ()=> {
      console.log('click');
    });

    visual_effects_container.addChild(this.element);
  }

  remove() {
    visual_effects_container.removeChild(this.element);
  }

}

module.exports = {
  icon,
};
