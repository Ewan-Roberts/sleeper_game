'use strict';
const { Texture, extras } = require('pixi.js');
const { enemys          } = require('../../engine/pixi_containers');

const create_texture = (name, i) => Array(i).fill(name).map((filler,j) => Texture.fromFrame(j<10?filler+'0'+j:filler+j));

const start = create_texture('moving_eye_', 91);

class Eye extends extras.AnimatedSprite {
  constructor(data) {
    start.reverse();
    super(start);
    this.name = 'eye';
    this.position.copy(data);
    this.play();
    this.anchor.set(0.5);
    this.animationSpeed = 0.19;
    enemys.addChild(this);
  }
}


module.exports = {
  Eye,
};



