const PIXI = require('pixi.js');
const spriteHelper = require('../utils/spriteHelper.js');

module.exports.teleport = (x, y) => {
  global.Player.sprite.x = x;
  global.Player.sprite.y = y;
};

module.exports.clearScene = () => global.viewport.removeChildren();

module.exports.createPlayer = () => {
  global.Player.sprite = new PIXI.extras.AnimatedSprite(global.Player.animation.idle);
  global.Player.sprite.anchor.set(0.5);
  global.Player.sprite.width /= 2;
  global.Player.sprite.height /= 2;
  global.Player.sprite.animationSpeed = 0.6;
  global.Player.sprite.play();
  global.Player.sprite.zIndex = -20;

  global.Player.sprite.walk = new PIXI.extras.AnimatedSprite(global.Player.animation.walk);
  global.Player.sprite.idle = new PIXI.extras.AnimatedSprite(global.Player.animation.idle);
  global.Player.sprite.ready = new PIXI.extras.AnimatedSprite(global.Player.animation.ready);

  global.viewport.addChild(global.Player.sprite);
};

module.exports.movePlayer = (start, finish) => {
  const pathOne = new PIXI.tween.TweenPath()
    .moveTo(start.x, start.y)
    .lineTo(finish.x, finish.y);

  const pathOneVisualGuide = new PIXI.Graphics()
    .lineStyle(1, 0xffffff, 1)
    .drawPath(pathOne);
  global.viewport.addChild(pathOneVisualGuide);

  const animatedPlayer = new PIXI.extras.AnimatedSprite(global.Player.animation.idle);
  animatedPlayer.x = start.x;
  animatedPlayer.y = start.y;
  animatedPlayer.height /= 3;
  animatedPlayer.width /= 3;
  animatedPlayer.texture.width = 100;
  animatedPlayer.texture.height = 100;
  animatedPlayer.anchor.set(0);
  animatedPlayer.animationSpeed = 0.4;
  animatedPlayer.play();

  const animatedPlayerTween = PIXI.tweenManager.createTween(animatedPlayer);
  animatedPlayerTween.name = 'tween';
  animatedPlayerTween.path = pathOne;
  animatedPlayerTween.target.rotation = spriteHelper.angle(animatedPlayer, pathOne.tmpPoint2);
  animatedPlayerTween.time = 3000;
  animatedPlayerTween.easing = PIXI.tween.Easing.inOutQuad();
  animatedPlayerTween.name = 'tween path';
  animatedPlayerTween.start();

  global.viewport.addChild(animatedPlayer);
};
