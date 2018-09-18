
const PIXI = require('pixi.js');
const spriteHelper = require('../../utils/spriteHelper.js');

global.arrowContainer = new PIXI.Container();
global.arrowContainer.name = 'arrow containter';

// const c = global.document.createElement('audio');
// c.play();

const arrowSounds = [
  new Audio('audio/arrow_hit_00.wav'),
  new Audio('audio/arrow_hit_01.wav'),
  new Audio('audio/arrow_hit_02.wav'),
  new Audio('audio/arrow_hit_03.wav'),
  new Audio('audio/arrow_hit_04.wav'),
  new Audio('audio/arrow_hit_05.wav'),
  new Audio('audio/arrow_hit_06.wav'),
  new Audio('audio/arrow_hit_07.wav'),
];

module.exports.arrowManagement = (power, origin, target) => {
  const pathOne = new PIXI.tween.TweenPath()
    .moveTo(origin.position.x, origin.position.y)
    .lineTo(target.x, target.y);

  // spriteHelper.drawPathAndShow(pathOne)

  const arrow = PIXI.Sprite.fromFrame('arrow');
  arrow.width /= 2;
  arrow.height /= 3;
  arrow.anchor.set(0.9);
  arrow.rotation = spriteHelper.angle(origin, target);

  const arrowTween = PIXI.tweenManager.createTween(arrow);
  arrowTween.path = pathOne;
  arrowTween.time = power;
  arrowTween.easing = PIXI.tween.Easing.linear();
  arrowTween.start();
  arrowTween.on('end', () => {
    arrow.pickup = true;
  });

  arrowTween.on('update', () => {
    spriteHelper.hitBoxContainerObj(global.collisionItems.children, arrow)
      .then(() => {
        arrow.pickup = true;
        arrowSounds[Math.floor((Math.random() * 7) + 1)].play();

        setTimeout(() => {
          arrowTween.stop();
        }, 15);
      });

    spriteHelper.hitBoxContainerObj(global.critterContainer.children, arrow)
      .then((critter) => {
        arrow.pickup = true;
        arrowTween.stop();

        const currentCritter = critter;
        currentCritter.texture = critter.dead;
        currentCritter.stop();
        currentCritter.mouseDeathSound.play();

        PIXI.tweenManager.getTweensForTarget(critter)[0].active = false;
      });

    spriteHelper.hitBoxContainerObj(global.enemyContainer.children, arrow)
      .then((enemy) => {
        arrow.pickup = true;

        arrowTween.stop();
        enemy.stop();

        PIXI.tweenManager.getTweensForTarget(enemy)[0].active = false;
      });
  });

  global.arrowContainer.addChild(arrow);
  global.viewport.addChild(global.arrowContainer);
};
