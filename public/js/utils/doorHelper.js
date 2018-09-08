

const spriteHelper = require("./spriteHelper.js");

module.exports.hit = (player,door) => {

  const trimmedDoorData = spriteHelper.trimVertexData(door)

  const hitDirection = spriteHelper.hitBox(player.x, player.y, trimmedDoorData);

  var tween = PIXI.tweenManager.createTween(door);
  tween.time = 400;
  tween.easing = PIXI.tween.Easing.outCubic();
  tween.expire = true;

  let rotationTarget = door.rotation;

  if (hitDirection === "top") {
    rotationTarget += 1
  } 
  if (hitDirection === "bottom") {
    rotationTarget -= 1
  } 
  if (hitDirection === "exception") {
    rotationTarget -= 1
  }

  tween.to({
    rotation: rotationTarget
  });
  tween.start();

}