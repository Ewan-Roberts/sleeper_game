const Flag = [];


module.exports.load_flag = () => new Promise((resolve,reject)=>{

  PIXI.loader        
  .add('images/flag/0.png')
  .add('images/flag/1.png')
  .add('images/flag/2.png')
  .add('images/flag/3.png')
  .add('images/flag/4.png')
  .add('images/flag/5.png')
  .add('images/flag/6.png')
  .add('images/flag/7.png')
  .add('images/flag/8.png')
  .add('images/flag/9.png')
  .add('images/flag/10.png')
  .add('images/flag/11.png')
  .add('images/flag/12.png')
  .add('images/flag/13.png')
  // .on("progress", loader=>{})
  .load(()=>resolve('flag loaded'))

})
.then(image_load_confirmation=>{

  for (let i = 0; i < 13; i++) {
    Flag.push(PIXI.Texture.fromFrame('images/flag/' + i + '.png'));
  }

})
.then(()=>{

  const animated_flag = new PIXI.extras.AnimatedSprite(Flag);
  global.viewport.addChild(animated_flag);
  

})