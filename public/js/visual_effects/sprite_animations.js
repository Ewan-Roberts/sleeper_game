const Flag = [];


module.exports.load_flag = () => new Promise((resolve,reject)=>{

  PIXI.loader        
  .add('images/flag/flag_1.png')
  .add('images/flag/flag_2.png')
  .add('images/flag/flag_3.png')
  // .on("progress", loader=>{})
  .load(()=>resolve('flag loaded'))

})
.then(image_load_confirmation=>{

  for (let i = 1; i < 3; i++) {
    Flag.push(PIXI.Texture.fromFrame('images/flag/flag_' + i + '.png'));
  }

})
.then(()=>{

  const animated_flag = new PIXI.extras.AnimatedSprite(Flag);
  animated_flag.animationSpeed = 0.4;
  animated_flag.play()
  global.viewport.addChild(animated_flag);
  

})