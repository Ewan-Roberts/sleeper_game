
const cutsceneUtil = require('./cutsceneUtils'),
  filterUtil = require('../visual_effects/filterUtils.js'),
  player = require('../player/player.js')

const scene = {
  x: 1000,
  y: 1000
}

module.exports.start = () => new Promise((resolve,reject)=>{

  player.remove_controls()
  cutsceneUtil.clearScene()
  cutsceneUtil.teleport(scene.x, scene.y)

  let intro_floor = PIXI.Sprite.fromFrame('bedroom_floor_cutscene');
  intro_floor.width *=2;
  intro_floor.height *=2;
  intro_floor.anchor.set(0.5);
  intro_floor.position.set(scene.x-300,scene.y);

  global.viewport.addChild(intro_floor);
  
  filterUtil.godray(intro_floor.x+100,(scene.y - intro_floor.height-50))
  .then(()=>cutsceneUtil.createPlayer())
  .then(()=>{

    global.Player.moveable = false;
    cutsceneUtil.movePlayer({x: scene.x+200, y:scene.y-200},{x: scene.x+200, y:scene.y+500})

  })

})


