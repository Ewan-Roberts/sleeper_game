const bedroom_data = require('./bedroom/bedroom_data_3.json')

module.exports.clearViewport = () =>{

  for (var i = global.viewport.children.length - 1; i >= 0; i--) {  global.viewport.removeChild(global.viewport.children[i]);};
}

module.exports.clearCollision = () =>{

  for (var i = global.collisionItems.children.length - 1; i >= 0; i--) {  global.collisionItems.removeChild(global.collisionItems.children[i]);};
}

module.exports.importBedroomData = () => {

  console.log(bedroom_data)

  const flat_background = PIXI.Sprite.fromImage('../../images/flat_floor.jpg');
  flat_background.interactive = true;
  flat_background.zIndex =1;
  
  global.collisionItems.zIndex = -1;

  this.renderWall(bedroom_data.tiles[1].objectgroup.objects)
  this.hitAreas(bedroom_data.tiles[2].objectgroup.objects)
  global.viewport.addChild(flat_background)
            
  global.viewport.updateLayersOrder();
}

module.exports.renderWall = wallArray => {

  wallArray.forEach(wallData =>{
    
    const wall = PIXI.Sprite.fromImage('../../images/black_dot.png');
    wall.position.set(wallData.x, wallData.y);
    wall.width = wallData.width;
    wall.height = wallData.height;
    global.collisionItems.addChild(wall)  

  })

}

module.exports.hitAreas = wallArray => {

  wallArray.forEach(wallData =>{
    
    const wall = PIXI.Sprite.fromImage('../../images/black_dot.png');
    wall.position.set(wallData.x, wallData.y);
    wall.width = wallData.width;
    wall.height = wallData.height;
    wall.alpha = 0.1;
    global.collisionItems.addChild(wall)  

  })

}