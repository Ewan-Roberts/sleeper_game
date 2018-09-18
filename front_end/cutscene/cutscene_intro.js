const PIXI = require('pixi.js');
const cutsceneUtil = require('./cutsceneUtils');
const filterUtil = require('../visual_effects/filterUtils.js');
const player = require('../player/player.js');

const scene = {
  x: 1000,
  y: 1000,
};

module.exports.start = () => {
  player.remove_controls();
  cutsceneUtil.clearScene();
  cutsceneUtil.teleport(scene.x, scene.y);

  const introFloor = PIXI.Sprite.fromFrame('bedroom_floor_cutscene');
  introFloor.width *= 2;
  introFloor.height *= 2;
  introFloor.anchor.set(0.5);
  introFloor.position.set(scene.x - 300, scene.y);

  global.viewport.addChild(introFloor);

  filterUtil.godray(introFloor.x + 100, (scene.y - introFloor.height - 50))
    .then(() => cutsceneUtil.createPlayer())
    .then(() => {
      global.Player.moveable = false;
      cutsceneUtil.movePlayer(
        { x: scene.x + 200, y: scene.y - 200 },
        { x: scene.x + 200, y: scene.y + 500 },
      );
    });
};
