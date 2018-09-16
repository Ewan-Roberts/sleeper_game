'use strict';

const Flag = [];

module.exports.load_flag = () => {
  
  new Promise((resolve,reject)=>{

    for (let i = 1; i < 3; i++) {
      Flag.push(PIXI.Texture.fromFrame('flag_' + i));
    }

  })
  .then(()=>{
    const animated_flag = new PIXI.extras.AnimatedSprite(Flag);

    animated_flag.animationSpeed = 0.4;
    animated_flag.play()

    global.viewport.addChild(animated_flag);
  })
  
}