'use strict';

const { Crow } = require('../character/archetypes/crow');

function generate_crow({from, to}) {
  const bird = new Crow();
  bird.animation.move();
  bird.animation.sprite.play();

  bird.tween.from(from);
  bird.tween.to(to);
  bird.tween.time = 10000;
  bird.tween.start();
}

module.exports = {
  generate_crow,
};
