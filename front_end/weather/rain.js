'use strict';

const PIXI = require('pixi.js');

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

module.exports.start_rain = (x1, x2, y1, y2) => {
  const rainFrames = [];

  for (let i = 1; i < 13; i += 1) {
    const val = i < 10 ? `0${i}` : i;

    rainFrames.push(PIXI.Texture.fromFrame(`raindrop_${val}`));
  }

  const rainNoise = new Audio('audio/light_rain.wav');

  for (let i = 0; i < 150; i += 1) {
    const animatedDrop = new PIXI.extras.AnimatedSprite(rainFrames);
    animatedDrop.x = getRandomArbitrary(x1, x2);
    animatedDrop.y = getRandomArbitrary(y1, y2);
    animatedDrop.width /= 2.5;
    animatedDrop.height /= 2.5;
    animatedDrop.alpha = getRandomArbitrary(0.03, 0.3);
    animatedDrop.anchor.set(0.5);
    animatedDrop.animationSpeed = getRandomArbitrary(0.1, 0.2);

    setInterval(() => animatedDrop.play(), getRandomArbitrary(200, 1100));
    setInterval(() => animatedDrop.gotoAndStop(11), getRandomArbitrary(100, 1000));

    rainNoise.volume = 0.05;
    rainNoise.play();

    global.viewport.addChild(animatedDrop);
  }
};
