'use strict';

const { Crow } = require('../character/archetypes/crow');

function generate_crow({from, to}) {
  const bird = new Crow();
  bird.animation.move();
  bird.animation.sprite.play();

  bird.tween.no_path_from(from);
  bird.tween.no_path_to(to);
  bird.tween.no_path_time = 10000;
  bird.tween.no_path_start();
}

module.exports = {
  generate_crow,
};
