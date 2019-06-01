'use strict';

const { Graphics } = require('pixi.js');
const { guis     } = require('../engine/pixi_containers');

function draw_path(path) {
  const graphical_path = new Graphics();
  graphical_path.lineStyle(3, 0xffffff, 0.5);
  graphical_path.drawPath(path);

  guis.addChild(graphical_path);
}


function draw_line(point, point2) {
  const myGraph = new Graphics();
  guis.addChild(myGraph);

  // Move it to the beginning of the line
  myGraph.position.set(point.x, point.y);


  // Draw the line (endPoint should be relative to myGraph's position)
  myGraph.lineStyle(2, 0xffffff)
    .moveTo(0, 0)
    .lineTo(point2.x, point2.y);

}
module.exports = {
  draw_path,
  draw_line,
};
