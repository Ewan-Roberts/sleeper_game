
const PIXI = require('pixi.js');
const spriteHelper = require('../utils/spriteHelper.js');
const bowHelper = require('../weapons/bow/bowHelper');
const dialogUtil = require('../dialog/dialogUtil.js');
const intersect = require('yy-intersects');

const enemyContainer = new PIXI.Container();
enemyContainer.name = 'enemyContainer';

const Enemy = {

  animation: {
    moving: [],
    waiting: [],
  },
  sprite: {
    moving: {},
    waiting: {},
  },
};

module.exports.createEnemyPathFrom = (levelData) => {
  const path = new PIXI.tween.TweenPath();

  path.moveTo(levelData[0].x, levelData[0].y+1388);

  for (let i = 1; i < levelData.length; i += 1) path.lineTo(levelData[i].x, levelData[i].y+1388);

  return path;
};

module.exports.enemy_frames = () => new Promise((resolve) => {
  for (let i = 0; i < 19; i += 1) {
    Enemy.animation.moving.push(PIXI.Texture.fromFrame(`survivor-move_knife_${i}`));
  }
  resolve();
});

module.exports.init_enemies_container = () => {
  global.viewport.addChild(enemyContainer);
}

module.exports.create_enemy = (x, y) => {

  return new Promise ((resolve, reject) => {

    const enemy_frames = []
    for (let i = 0; i < 19; i += 1) {
      enemy_frames.push(PIXI.Texture.fromFrame(`survivor-move_knife_${i}`));
    }

    const enemySprite = new PIXI.extras.AnimatedSprite(enemy_frames);
    enemySprite.height /= 3;
    enemySprite.width /= 3;
    enemySprite.anchor.set(0.5);
    enemySprite.position.set(x, y);
    enemySprite.animationSpeed = 0.4;
    enemySprite.rotation = -0.5;
    enemySprite.play();
    enemyContainer.addChild(enemySprite);
    resolve(enemySprite)
  })

};

module.exports.sight_line = (sprite) => {

  const sight_line_box = PIXI.Sprite.fromFrame('black_dot');
  sight_line_box.name = 'sight_line';
  sight_line_box.width = 500;
  sight_line_box.height = 500;
  sight_line_box.rotation = -0.5;
  sight_line_box.alpha = 0.3;
  sprite.addChild(sight_line_box);

}

module.exports.influence_box = sprite => {

  const influence_box = PIXI.Sprite.fromFrame('black_dot');
  influence_box.name = 'influence_box';
  influence_box.width = 1000;
  influence_box.height = 1000;
  influence_box.alpha = 0.2
  influence_box.anchor.set(0.5);
  sprite.addChild(influence_box);
}

module.exports.crate_path = (sprite, path_data) => {

  return new Promise((resolve, reject) => {
    const path = new PIXI.tween.TweenPath();

    path.moveTo(path_data[0].x, path_data[0].y);

    for (let i = 1; i < path_data.length; i++) {
      path.lineTo(path_data[i].x, path_data[i].y);
    }

    const path_visual_guide = new PIXI.Graphics()
      .lineStyle(5, 0xffffff, 0.8)
      .drawPath(path);

    global.viewport.addChild(path_visual_guide);
    resolve(path)
  })
}

module.exports.crate_path_tween = (sprite, path) => {
  console.log(path)
  const animatedEnemyTween = PIXI.tweenManager.createTween(sprite);
  animatedEnemyTween.path = path;
  animatedEnemyTween.rotation = spriteHelper.angle(sprite, path._tmpPoint2);
  animatedEnemyTween.time = 30000;
  animatedEnemyTween.easing = PIXI.tween.Easing.linear();
  animatedEnemyTween.start();
  animatedEnemyTween.pingPong = true;
  return animatedEnemyTween;
}

// point-Rectangle intersection


module.exports.enemy_logic_on_path = (sprite, tween, path) => {
  const player =  {};
  
  //TODO this should be based on the sightlines 
  sprite.shape = new intersect.Rectangle(sprite);
  player.shape = new intersect.Rectangle(global.Player.sprite);

  tween.on('update', () => {    

    sprite.shape.update();
    player.shape.update();

    if (sprite.shape.collidesRectangle(player.shape)){
      console.log('intersected');
      dialogUtil.renderText(sprite, dialogUtil.enemySurprised());
      tween.stop();
      sprite.stop()
      sprite.rotation = spriteHelper.angle(sprite, global.Player.sprite);
      
      // TODO arrow managment;
      //bowHelper.arrowManagement(500, sprite, global.Player.sprite);
    }
  });
}


module.exports.enemy_path = (pathData) => {
  const path = module.exports.createEnemyPathFrom(pathData);
  spriteHelper.drawPathAndShow(path);

  const enemySprite = new PIXI.extras.AnimatedSprite(Enemy.animation.moving);
  enemySprite.height /= 3;
  enemySprite.width /= 3;
  enemySprite.anchor.set(0.5);
  enemySprite.animationSpeed = 0.4;
  enemySprite.rotation = -0.5;
  enemySprite.play();

  const influenceBox = PIXI.Sprite.fromFrame('black_dot');
  influenceBox.width = 500;
  influenceBox.height = 500;
  influenceBox.rotation = -0.5;
  influenceBox.alpha = 0.3;

  const influenceBoxTween = PIXI.tweenManager.createTween(influenceBox);
  influenceBoxTween.rotation = -0.5;
  influenceBoxTween.path = path;
  influenceBoxTween.time = 300000;
  influenceBoxTween.easing = PIXI.tween.Easing.linear();
  influenceBoxTween.start();
  influenceBoxTween.pingPong = true;

  const animatedEnemyTween = PIXI.tweenManager.createTween(enemySprite);
  animatedEnemyTween.path = path;
  animatedEnemyTween.rotation = spriteHelper.angle(enemySprite, path._tmpPoint2);
  animatedEnemyTween.time = 300000;
  animatedEnemyTween.easing = PIXI.tween.Easing.linear();
  animatedEnemyTween.start();
  animatedEnemyTween.pingPong = true;

  influenceBoxTween.on('update', () => {
    animatedEnemyTween.target.rotation = animatedEnemyTween.rotation + spriteHelper.angle(enemySprite, path._tmpPoint2);
    influenceBoxTween.target.rotation = influenceBoxTween.rotation + spriteHelper.angle(enemySprite, path._tmpPoint2);
    spriteHelper.hitBoxSpriteObj(influenceBox, global.Player.sprite)
      .then(() => {
        dialogUtil.renderText(enemySprite, dialogUtil.enemySurprised());
        animatedEnemyTween.stop();
        enemySprite.stop();
        enemySprite.rotation = spriteHelper.angle(enemySprite, global.Player.sprite);
        influenceBoxTween.stop();
        bowHelper.arrowManagement(500, enemySprite, global.Player.sprite);
      });
  });

  global.enemyContainer.addChild(enemySprite, influenceBox);
  global.viewport.addChild(global.enemyContainer);
};

module.exports.move = (start, finish) => {
  const pathOne = new PIXI.tween.TweenPath()
    .moveTo(start.x, start.y)
    .lineTo(finish.x, finish.y);

  const pathOneVisualGuide = new PIXI.Graphics()
    .lineStyle(1, 0xffffff, 1)
    .drawPath(pathOne);

  global.viewport.addChild(pathOneVisualGuide);

  const animatedEnemy = new PIXI.extras.AnimatedSprite(Enemy.animation.moving);
  animatedEnemy.height /= 3;
  animatedEnemy.width /= 3;
  animatedEnemy.texture.width = 100;
  animatedEnemy.texture.height = 100;
  animatedEnemy.anchor.set(0);
  animatedEnemy.animationSpeed = 0.4;
  animatedEnemy.play();

  const animatedEnemyTween = PIXI.tweenManager.createTween(animatedEnemy);
  animatedEnemyTween.path = pathOne;
  animatedEnemyTween.target.rotation = spriteHelper.angle(animatedEnemy, pathOne._tmpPoint2);
  animatedEnemyTween.time = 3000;
  animatedEnemyTween.easing = PIXI.tween.Easing.inOutQuad();
  animatedEnemyTween.start();

  global.enemyContainer.addChild(animatedEnemy);
  global.viewport.addChild(global.enemyContainer);

  Enemy.sprite.moving = animatedEnemy;
};

module.exports.projectileAttack = (target) => {
  const enemy = new PIXI.extras.AnimatedSprite(Enemy.animation.moving);

  bowHelper.arrowManagement(500, enemy, target);

  global.viewport.addChild(enemy);
};