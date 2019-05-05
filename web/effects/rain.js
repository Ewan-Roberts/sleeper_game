'use strict';
const { extras, Texture} = require('pixi.js');

const { visual_effects_container } = require('../engine/pixi_containers');
const { random_number } = require('../utils/math');
// const { Sound         } = require('../engine/sound');

// TODO Move to using timer function
class Rain {
  constructor(x1, x2, y1, y2) {
    this.name = 'rain';

    const rainFrames = [];

    for (let i = 1; i < 13; i += 1) {
      const val = i < 10 ? `0${i}` : i;

      rainFrames.push(Texture.fromFrame(`raindrop_${val}`));
    }

    // Sound.play('rain_noise');

    for (let i = 0; i < 150; i += 1) {
      const animatedDrop = new extras.AnimatedSprite(rainFrames);
      animatedDrop.x = random_number(x1, x2);
      animatedDrop.y = random_number(y1, y2);
      animatedDrop.width /= 2.5;
      animatedDrop.height /= 2.5;
      animatedDrop.alpha = random_number(0.03, 0.3);
      animatedDrop.anchor.set(0.5);
      animatedDrop.animationSpeed = random_number(0.1, 0.2);

      setInterval(() => animatedDrop.play(), random_number(200, 1100));
      setInterval(() => animatedDrop.gotoAndStop(11), random_number(100, 1000));

      visual_effects_container.addChild(animatedDrop);
    }
  }
}

module.exports = {
  Rain,
};
