const Flag = [];
const PIXI = require('pixi.js');

module.exports.load_flag = () => {
  for (let i = 1; i < 3; i += 1) {
    Flag.push(PIXI.Texture.fromFrame(`flag_${i}`));
  }
  const animatedFlag = new PIXI.extras.AnimatedSprite(Flag);

  animatedFlag.animationSpeed = 0.4;
  animatedFlag.play();

  global.viewport.addChild(animatedFlag);
};
