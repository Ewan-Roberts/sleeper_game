const PIXI = require('pixi.js');
// const spriteHelper = require('../utils/spriteHelper.js');
const pathfinderData = require('./bedroom_grid8.json')

const easystarjs = require('easystarjs');
const easystar = new easystarjs.js();

console.log(pathfinderData.layers[1].objects);

const renderTile = (array) => {

  array.forEach((elem) => {
    const tile = PIXI.Sprite.fromFrame('black_dot');
    tile.height = elem.height;
    tile.width = elem.width;
    tile.position.x = elem.x;
    tile.position.y = elem.y;
    global.viewport.addChild(tile);
  });
};

renderTile(pathfinderData.layers[1].objects);

const makeTwoDimentional = (array) => {
  array.sort((a, b) => a.id - b.id);
  for (let i = 0; i < array.length; i++) {
    if(array[i].type === 'walk') {
      array[i] = 0;
    } else {
      array[i] = 1;
    }
  }
  const newArr = [];
  while (array.length) newArr.push(array.splice(0, 55));
  return newArr;
}

const thingArray = makeTwoDimentional(pathfinderData.layers[1].objects);

const grid = [
  [0,0,1,0,0],
  [0,0,1,0,0],
  [0,0,1,0,0],
  [0,0,1,0,0],
  [0,0,0,0,0],
];

console.log(grid);
console.log(thingArray);

easystar.setGrid(thingArray);
easystar.setAcceptableTiles([0]);
easystar.setIterationsPerCalculation(1000);

easystar.findPath(5, 5, 54, 17, function( path ) {
  if (path === null) {
		console.log("Path was not found.");
	} else {
    console.log(path);
    path.forEach((elem)=>{
      
      const mover = PIXI.Sprite.fromFrame('black_dot');
      mover.width =20;
      mover.height =20;
      
      mover.position.set(elem.x*10, elem.y*10);
      global.viewport.addChild(mover);
    })
	}
});
setInterval(()=>{
  easystar.calculate();
},1000)
