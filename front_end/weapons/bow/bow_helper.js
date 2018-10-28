
const PIXI = require('pixi.js');
const sprite_helper = require('../../utils/sprite_helper.js');
const dialogUtil = require('../../dialog/dialogUtil.js');

global.arrow_container = new PIXI.Container();
global.arrow_container.name = 'arrow containter';

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

module.exports.init_arrow_container = () => {
  global.viewport.addChild(global.arrow_container);
}

module.exports.create_arrow = () => {
  const arrow = PIXI.Sprite.fromFrame('arrow');

  arrow.width /= 2;
  arrow.height /= 3;
  arrow.anchor.set(0.9);

  return arrow;
}

module.exports.create_path = (origin, target) => {
  const arrow_path = new PIXI.tween.TweenPath()
    .moveTo(origin.position.x, origin.position.y)
    .lineTo(target.x, target.y);
  
  return arrow_path
}

module.exports.create_arrow_tween = (arrow, power, arrow_path) => {
  const arrow_tween = PIXI.tweenManager.createTween(arrow);

  arrow_tween.path = arrow_path;
  arrow_tween.time = power;
  arrow_tween.easing = PIXI.tween.Easing.linear();

  return arrow_tween;
}

module.exports.arrowManagement = (power, origin, target) => {
  // make this not fire each time
  module.exports.init_arrow_container()

  const arrow = module.exports.create_arrow();
  arrow.name = 'arrow';
  arrow.rotation = sprite_helper.angle(origin, target);

  const arrow_path = module.exports.create_path(origin,target)
  const arrow_tween = module.exports.create_arrow_tween(arrow, power, arrow_path)
  arrow_tween.start();

  // arrow_tween.on('end', () => {
  //   arrow.pickup = true;
  // });
  global.arrow_container.addChild(arrow);
  arrow_tween.on('update', () => {

    for (let i = 0; i < global.enemy_container.children.length; i++) {
      const sprite_in_container = global.enemy_container.children[i];
      
      if(sprite_in_container.containsPoint(arrow.getGlobalPosition())){
        console.log(arrow.getGlobalPosition())
        console.log(arrow.getLocalBounds())
        console.log('hit')
        dialogUtil.renderText(sprite_in_container, 'I am hit');
        arrow.width = 200;
        arrow.height = 50;
        sprite_in_container.addChild(arrow)
        arrow_tween.stop();
      }
    }

    for (let i = 0; i < global.collisionItems.children.length; i++) {
      const sprite_in_container = global.collisionItems.children[i];
  
      if(sprite_in_container.containsPoint(arrow.getGlobalPosition())){
        console.log('hit on collision item');
        arrow_tween.stop()
      }
    }
  });

  
};
