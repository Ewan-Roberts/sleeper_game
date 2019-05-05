'use strict';

const { Crow   } = require('../character/archetypes/crow');
const { Lurcher } = require('../character/archetypes/zombie');

function generate_crow({from, to}) {
  const bird = new Crow();
  bird.animation.move();
  bird.animation.sprite.play();

  bird.tween.from(from);
  bird.tween.to(to);
  bird.tween.time = 10000;
  bird.tween.start();
}

function generate_zombie({from, to}) {
  const zombie = new Lurcher();
  zombie.animation.move();
  zombie.animation.sprite.play();

  zombie.tween.from(from);
  zombie.tween.to(to);
  zombie.tween.time = 20000;
  zombie.tween.start();
}

module.exports = {
  generate_crow,
  generate_zombie,
};
