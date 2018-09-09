
const cutsceneUtil = require('./cutsceneUtils'),
  filterUtil = require('../visual_effects/filterUtils.js')

const scene = {
  x: 1000,
  y: 1000
}

module.exports.start = () => new Promise((resolve,reject)=>{

  PIXI.loader
  .add('intro_scene','images/cutscenes/bedroom_floor_cutscene.png')
  .load((loader, res)=>{

    cutsceneUtil.clearScene()

    cutsceneUtil.teleport(scene.x, scene.y)

    let intro_floor = new PIXI.Sprite(res.intro_scene.texture);
    intro_floor.width *=2;
    intro_floor.height *=2;
    intro_floor.anchor.set(0.5);
    intro_floor.position.set(scene.x,scene.y);

    global.viewport.addChild(intro_floor);
    
    filterUtil.godray(intro_floor.x-100,(scene.y - intro_floor.height-50));

  })

})


