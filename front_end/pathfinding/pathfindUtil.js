// const PIXI = require('pixi.js');
// const spriteHelper = require('../utils/spriteHelper.js');

const easystarjs = require('easystarjs');
const easystar = new easystarjs.js();

const grid = [
[0,0,1,0,0],
[0,0,1,0,0],
[0,0,1,0,0],
[0,0,1,0,0],
[0,0,0,0,0]
];

easystar.setGrid(grid);

easystar.setAcceptableTiles([0]);

easystar.findPath(0, 0, 4, 0, function( path ) {
	if (path === null) {
		console.log("Path was not found.");
	} else {
    console.log(path);
	}
});

easystar.calculate();