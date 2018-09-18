const PIXI = require('pixi.js');
const spriteHelper = require('../utils/spriteHelper.js');

global.critterContainer = new PIXI.Container();

const Rat = {

  animation: {
    moving: [],
    waiting: [],
    eating: [],
  },
  sprite: {
    moving: {},
    waiting: {},
    eating: {},
  },
  // noise: new Audio('audio/rat_noise_edited.wav')

};

module.exports.load_rat = () => new Promise((resolve) => {
  for (let i = 1; i < 15; i += 1) {
    const val = i < 10 ? `0${i}` : i;
    Rat.animation.moving.push(PIXI.Texture.fromFrame(`rat_${val}`));
  }

  for (let i = 15; i > 0; i -= 1) {
    const val = i < 10 ? `0${i}` : i;
    Rat.animation.moving.push(PIXI.Texture.fromFrame(`rat_${val}`));
  }

  Rat.animation.moving.push(PIXI.Texture.fromFrame('rat_48'));
  Rat.animation.moving.push(PIXI.Texture.fromFrame('rat_49'));
  Rat.animation.moving.push(PIXI.Texture.fromFrame('rat_50'));
  Rat.animation.moving.push(PIXI.Texture.fromFrame('rat_49'));
  Rat.animation.moving.push(PIXI.Texture.fromFrame('rat_48'));

  Rat.animation.waiting = [

    PIXI.Texture.fromFrame('rat_36'),
    PIXI.Texture.fromFrame('rat_37'),
    PIXI.Texture.fromFrame('rat_38'),
    PIXI.Texture.fromFrame('rat_51'),
    PIXI.Texture.fromFrame('rat_37'),
    PIXI.Texture.fromFrame('rat_36'),
    PIXI.Texture.fromFrame('rat_01'),
  ];

  Rat.animation.dead = PIXI.Texture.fromFrame('rat_35');

  Rat.animation.eating = [
    PIXI.Texture.fromFrame('rat_37'),
    PIXI.Texture.fromFrame('rat_38'),
    PIXI.Texture.fromFrame('rat_39'),
    PIXI.Texture.fromFrame('rat_40'),
    PIXI.Texture.fromFrame('rat_39'),
    PIXI.Texture.fromFrame('rat_40'),
    PIXI.Texture.fromFrame('rat_41'),
    PIXI.Texture.fromFrame('rat_40'),
    PIXI.Texture.fromFrame('rat_39'),
    PIXI.Texture.fromFrame('rat_38'),
    PIXI.Texture.fromFrame('rat_37'),
  ];
  resolve();
});

module.exports.mouseMove = (start, finish) => {
  // Rat.noise.volume = 0.5
  // Rat.noise.play();
  const mouseDeathSound = new Audio('audio/mouse_death_00.wav');
  // Create a custom path the graphic will follow
  const pathOne = new PIXI.tween.TweenPath()
    .moveTo(start.x, start.y)
    .lineTo(finish.x, finish.y);

  spriteHelper.drawPathAndShow(pathOne);

  const animatedRat = new PIXI.extras.AnimatedSprite(Rat.animation.moving);
  animatedRat.height /= 2;
  animatedRat.width /= 2;
  animatedRat.animationSpeed = 0.4;
  animatedRat.play();
  animatedRat.mouseDeathSound = mouseDeathSound;
  animatedRat.dead = PIXI.Texture.fromFrame('rat_35');

  const animatedRatTween = PIXI.tweenManager.createTween(animatedRat);
  animatedRatTween.name = 'tween';
  animatedRatTween.path = pathOne;
  animatedRatTween.target.rotation = spriteHelper.angle(animatedRat, pathOne._tmpPoint2);
  animatedRatTween.time = 3000;
  animatedRatTween.easing = PIXI.tween.Easing.inOutQuad();
  animatedRatTween.name = 'tween path';
  animatedRatTween.start();

  global.critterContainer.addChild(animatedRat);
  global.viewport.addChild(global.critterContainer);

  Rat.sprite.moving = animatedRat;
};

module.exports.mousePause = () => new Promise((resolve) => {
  const pathWaiting = new PIXI.tween.TweenPath()
    .moveTo(90, 720)
    .lineTo(90, 721);

  const waitingRat = new PIXI.extras.AnimatedSprite(Rat.animation.waiting);
  waitingRat.alpha = 0;
  waitingRat.rotation = 2.1;
  waitingRat.anchor.set(0.5);
  waitingRat.height /= 2;
  waitingRat.width /= 2;
  waitingRat.animationSpeed = 0.1;
  waitingRat.play();
  global.viewport.addChild(waitingRat);

  const waitingRatTween = PIXI.tweenManager.createTween(waitingRat);
  waitingRatTween.path = pathWaiting;
  waitingRatTween.time = 1000;
  waitingRatTween.easing = PIXI.tween.Easing.inOutQuad();
  waitingRatTween.start();

  waitingRatTween.on('start', () => {
    waitingRat.alpha = 1;
  });

  waitingRatTween.on('end', () => {
    waitingRat.destroy();
    Rat.sprite.moving.alpha = 1;
    resolve();
  });

  Rat.sprite.waiting = waitingRat;
});
