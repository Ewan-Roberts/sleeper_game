
const PIXI = require('pixi.js');
const spriteHelper = require('./sprite_helper.js');

module.exports.hit = (player, door) => {
  const trimmedDoorData = spriteHelper.trimVertexData(door);
  const hitDirection = spriteHelper.hitBox(player.x, player.y, trimmedDoorData);
  const movement = 0.4;
  const tween = PIXI.tweenManager.createTween(door);
  tween.time = 400;
  tween.easing = PIXI.tween.Easing.outCubic();
  tween.expire = true;

  let rotationTarget = door.rotation;

  if (hitDirection === 'top') rotationTarget += movement;
  if (hitDirection === 'bottom') rotationTarget -= movement;
  if (hitDirection === 'exception') rotationTarget -= movement;

  tween.to({
    rotation: rotationTarget,
  });
  tween.start();
};
