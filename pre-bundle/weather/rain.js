
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

module.exports.start_rain = (x1,x2,y1,y2) => {
    
  new Promise((resolve,reject)=>{

    PIXI.loader        
    .add('images/raindrop_01.png')
    .add('images/raindrop_02.png')
    .add('images/raindrop_03.png')
    .add('images/raindrop_04.png')
    .add('images/raindrop_05.png')
    .add('images/raindrop_06.png')
    .add('images/raindrop_07.png')
    .add('images/raindrop_08.png')
    .add('images/raindrop_09.png')
    .add('images/raindrop_10.png')
    .add('images/raindrop_11.png')
    .add('images/raindrop_12.png')
    .add('images/raindrop_13.png')
    // .on("progress", loader=>{})
    .load(()=>resolve('drop loaded'))
  })
  .then(res=>{
    let rain_frames = []
    for (let i = 1; i < 13; i++) {
      let val = i < 10 ? '0' + i : i;

      rain_frames.push(PIXI.Texture.fromFrame('images/raindrop_' + val + '.png'));
    }
    return rain_frames;
  })
  .then(frames => {

    const rain_noise = new Audio('audio/light_rain.wav')

    for (let i = 0; i < 150; i++) {
      const animated_drop = new PIXI.extras.AnimatedSprite(frames);
      animated_drop.x = getRandomArbitrary(x1,x2);
      animated_drop.y = getRandomArbitrary(y1,y2);
      animated_drop.width /= 2.5
      animated_drop.height /= 2.5
      animated_drop.alpha = getRandomArbitrary(0.03,0.3)
      animated_drop.anchor.set(0.5);
      animated_drop.animationSpeed = getRandomArbitrary(0.1,0.2);
      setInterval(()=>{

        animated_drop.play();

      },getRandomArbitrary(200,1100))
      
      setInterval(()=>{

        animated_drop.gotoAndStop(11);

      },getRandomArbitrary(100,1000))

      rain_noise.volume = 0.05;
      rain_noise.play()

      global.viewport.addChild(animated_drop)
    }
  })
}