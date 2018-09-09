const filters = require('pixi-filters')
const padding = 100;
global.overlay = PIXI.Sprite.fromImage('images/black_dot.png')
global.overlay.zIndex = -30;
global.overlay.anchor.set(0.5)


function countUp() {

  if(global.overlay.alpha <= 1) {
    global.overlay.alpha += 0.01;
  } else {
    global.app.ticker.remove(countUp)
    global.app.ticker.remove(countDown)
    global.overlay.alpha = 1
  };
  
}

function countDown() {

  if(global.overlay.alpha >= 0) {
    
    global.overlay.alpha -= 0.01;

  } else {

    global.app.ticker.remove(countUp);
    global.app.ticker.remove(countDown);
    global.overlay.alpha = 0;
    global.viewport.removeChild(global.overlay);

  }
  
}


module.exports.fade_in_black = speed => new Promise((resolve,reject)=>{
  
  global.overlay.alpha = 0;
  global.overlay.width = global.viewport.worldWidth + padding;
  global.overlay.height = global.viewport.worldHeight + padding;
  global.overlay.position.set(global.viewport.center.x,global.viewport.center.y);  
  global.app.ticker.add(countUp);
  global.viewport.addChild(global.overlay)
  
})

module.exports.fade_out_black = () => new Promise((resolve,reject)=>{
  
  global.overlay.alpha = 1;
  global.overlay.width = global.viewport.worldWidth + padding;
  global.overlay.height = global.viewport.worldHeight + padding;
  global.overlay.position.set(global.viewport.center.x,global.viewport.center.y);  
  global.app.ticker.add(countDown);

})

module.exports.glitch = () => new Promise((resolve,reject)=>{

  global.viewport.filters = [new filters.GlitchFilter()]
  
})

module.exports.godray = (x,y) => new Promise((resolve,reject)=>{
  
  this.clear()

  const godray = new filters.GodrayFilter()
  godray.parallel = false;
  godray.center = [x,y]
  godray.time =20;

  global.viewport.filters = [godray]


  function godrayAnimation() {
    
    if(godray.time <= 100) {
      // console.log(godray.time)
      godray.time += 0.005;
  
    }
    
  }
  
  global.app.ticker.add(godrayAnimation);


  
})


module.exports.clear = () => new Promise((resolve,reject)=>{

  global.viewport.filters = []
  
})




module.exports.setCamera = () => new Promise((resolve,reject)=>{


})
