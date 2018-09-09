const filters = require('pixi-filters')

module.exports.teleport = (x,y) => new Promise((resolve,reject)=>{

  console.log('teleport')
  global.Player.sprite.x = x;
  global.Player.sprite.y = y;

})

