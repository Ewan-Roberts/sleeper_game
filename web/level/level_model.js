'use strict';

const { background_container } = require('../engine/pixi_containers');

const { pathfind_sprite      } = require('../engine/pathfind.js');
const { Wall                 } = require('../items/types/wall.js');

class Level {
  constructor() {
    this.segments = [];
  }

  add_component(component) {
    this[component.name] = component;
  }

  remove_component(name) {
    delete this[name];
  }

  set_position({x, y}) {
    this.sprite.position.set(x, y);

    background_container.addChild(this.sprite);
  }

  create_grid(level_tiles) {
    this.grid = pathfind_sprite.create_level_grid(level_tiles);
  }

  add_to_segments(item) {
    this.segments.push(
      {a:{x:item.x,y:item.y+item.height},             b:{x:item.x,y:item.y}},
      {a:{x:item.x,y:item.y},                         b:{x:item.x+item.width,y:item.y}},
      {a:{x:item.x+item.width,y:item.y+item.height},  b:{x:item.x,y:item.y+item.height}},
      {a:{x:item.x+item.width,y:item.y+item.height},  b:{x:item.x+item.width,y:item.y}}
    );
  }

  render_walls(wall_array) {
    wall_array.forEach((wall_data) => {
      const wall = new Wall();

      wall.set_position(wall_data);
      wall.width  = wall_data.width;
      wall.height = wall_data.height;
      wall.anchor = 0;

      this.add_to_segments(wall.sprite);
    });
  }
}

module.exports = {
  Level,
};
