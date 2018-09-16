'use strict';

const bedroom_data = require('./bedroom/bedroom_data_4.json'),
      park_data = require('./park/park_3.json')

module.exports.clearViewport = () =>{
  for (let i = global.viewport.children.length - 1; i >= 0; i--) {  global.viewport.removeChild(global.viewport.children[i]);};
}

module.exports.clearCollision = () =>{
  for (let i = global.collisionItems.children.length - 1; i >= 0; i--) {global.collisionItems.removeChild(global.collisionItems.children[i])}
}

const addToSegments = item => {

  global.collisionItems.push(
    {a:{x:item.x,y:item.y+item.height},             b:{x:item.x,y:item.y}},
    {a:{x:item.x,y:item.y},                         b:{x:item.x+item.width,y:item.y}},
    {a:{x:item.x+item.width,y:item.y+item.height},  b:{x:item.x,y:item.y+item.height}},
    {a:{x:item.x+item.width,y:item.y+item.height},  b:{x:item.x+item.width,y:item.y}},
  )

}

module.exports.importBedroomData = () => {

  const flat_background = PIXI.Sprite.fromFrame('flat_floor')
  flat_background.interactive = true;
  flat_background.zIndex =1;
  flat_background.height = bedroom_data.tileheight;
  flat_background.width = bedroom_data.tilewidth;
  
  global.collisionItems.zIndex = -1;

  this.renderWall(bedroom_data.tiles[1].objectgroup.objects)
  this.hitAreas(bedroom_data.tiles[2].objectgroup.objects)
  global.viewport.addChild(flat_background)
            
  global.viewport.updateLayersOrder();
}


module.exports.renderWall = wallArray => {

  wallArray.forEach(wallData =>{
    
    const wall = PIXI.Sprite.fromFrame('black_dot')
          wall.position.set(wallData.x, wallData.y);
          wall.width = wallData.width;
          wall.height = wallData.height;
    
    global.collisionItems.addChild(wall)  
  })
}

module.exports.importEnemyPathData = () =>{
  const pathData = bedroom_data.tiles[4].objectgroup.objects[0].polyline
  
  return pathData;
}

module.exports.createEnemyPathFrom = level_data => {
  const path = new PIXI.tween.TweenPath();

  path.moveTo(level_data[0].x,level_data[0].y)

  for (let i = 1; i < level_data.length; i++) path.lineTo(level_data[i].x, level_data[i].y)

  return path;
}

module.exports.importParkData = () => {

  const park_background = PIXI.Sprite.fromFrame('park');
        park_background.interactive = true;
        park_background.zIndex =1;
        park_background.height = park_data.tileheight;
        park_background.width = park_data.tilewidth;
        // park_background.width = 10000
        // park_background.height = 6000

  for (let i = 0; i < park_data.tiles[1].objectgroup.objects.length; i++) {
    
    this.hitAreas(park_data.tiles[1].objectgroup.objects)
    
  }

  global.viewport.addChild(park_background)
  global.viewport.updateLayersOrder();
}

module.exports.renderWall = wallArray => {

  wallArray.forEach(wallData =>{
    const wall = PIXI.Sprite.fromFrame('black_dot')

    wall.position.set(wallData.x, wallData.y);
    wall.width = wallData.width;
    wall.height = wallData.height;

    global.collisionItems.addChild(wall)  
  })

}

module.exports.hitAreas = wallArray => {

  wallArray.forEach(wallData =>{
    const wall = PIXI.Sprite.fromFrame('black_dot')

    wall.position.set(wallData.x, wallData.y);
    wall.width = wallData.width;
    wall.height = wallData.height;
    wall.alpha = 0.01;

    global.collisionItems.addChild(wall)  
  })
}