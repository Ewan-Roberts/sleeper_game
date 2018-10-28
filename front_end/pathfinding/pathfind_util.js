const PIXI = require('pixi.js');
const easystarjs = require('easystarjs');

global.grid_container = new PIXI.Container();
global.grid_container.name = 'enemy_container';

module.exports.lay_down_grid = () => {
  
  let current_x = -115;
  let current_y = -115;

  const slantedWall = PIXI.Sprite.fromFrame('black_dot');
  slantedWall.name = 'slanted wall';
  slantedWall.position.set(0, 0);
  slantedWall.alpha = 0
  global.viewport.addChild(slantedWall);

  const grid = [];
  let line_grid = [];

  for (let i = 0; i < 400; i++) {

    if(i % 20 === 0 && i !== 0){
      grid.push(line_grid);
      line_grid = [];
      current_y += 50;
      current_x = -115;
    }
    const grid_cell = PIXI.Sprite.fromFrame('black_dot');
    grid_cell.width = 50;
    grid_cell.height = 50;
    grid_cell.x = current_x;
    grid_cell.y = current_y;
    current_x += 50;
    
    if(slantedWall.containsPoint(grid_cell.getGlobalPosition())){
      grid_cell.alpha = 0.3
    }
    line_grid.push(grid_cell);
    global.grid_container.addChild(grid_cell);
  }
  global.viewport.addChild(global.grid_container);
}
