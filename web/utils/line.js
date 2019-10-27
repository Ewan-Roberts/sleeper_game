const { Graphics } = require('pixi.js');
const { World } = require('../engine/pixi_containers');

function draw_path(path) {
  const graphical_path = new Graphics();
  graphical_path.lineStyle(3, 0xffffff, 0.5);
  graphical_path.drawPath(path);

  World.add_to('gui', graphical_path);
}

function draw_line(point, point2) {
  const my_graph = new Graphics();
  World.add_to('gui', my_graph);

  // Move it to the beginning of the line
  my_graph.position.copy(point);

  // Draw the line (endPoint should be relative to myGraph's position)
  my_graph.lineStyle(2, 0xffffff)
    .moveTo(0, 0)
    .lineTo(point2.x, point2.y);
}
module.exports = {
  draw_path,
  draw_line,
};
