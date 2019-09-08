
const { Texture, extras } = require('pixi.js');
const { visuals          } = require('../../engine/pixi_containers');

const create_texture = (name, i) => Array(i).fill(name).map((filler, j) => Texture.fromFrame(j < 10 ? filler + '0' + j : filler + j));

class Eye extends extras.AnimatedSprite {
  constructor(data) {
    const start = create_texture('moving_eye_', 91);
    super(start);
    this.name = 'eye';
    this.position.copy(data);
    this.play();
    this.anchor.set(0.5);
    this.animationSpeed = 0.19;
    visuals.addChild(this);
  }
}

module.exports = {
  Eye,
};

