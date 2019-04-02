'use strict';
const PIXI           = require('pixi.js');
const { Level      } = require('../level_model');
const { Tiled_Data } = require('../attributes/parse_tiled_data');
const { Background } = require('../elements/background');
const { Wall       } = require('../elements/wall');
const { Candle     } = require('../../light/types/candle');
const { Rat        } = require('../../character/archetypes/rat');
const level_data     = require('../data/tiled_room.json');
const level_tiled    = require('../data/tiled_room_tiled.json');

const { visual_effects_container } = require('../../engine/pixi_containers');
const { collision_container } = require('../../engine/pixi_containers');

const matrix = [];

function create_grid() {
  let y = 0;
  let x = 0;
  let alpha = 1;

  for(let i=0;i<=100;i++){
    const tile = PIXI.Sprite.fromFrame('black_dot');
    tile.width  = 100;
    tile.height = 100;
    tile.x = x;
    tile.y = y;
    alpha-=0.002;
    tile.alpha =alpha;
    x += 100;

    if(i % 10 === 0) {
      if(i ===0) {
        y=0;
      }else{
        y += 100;
      }
      x= 0;
    }


    visual_effects_container.addChild(tile);
    matrix.push(tile);
  }
}

function check(rect1, rect2) {

  if (rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y) {
    return true;
  }

}



class Tiled_Prey extends Level {
  constructor(player) {
    super();
    this.name       = 'tiled_room';

    this.player     = player;
    this.elements   = new Tiled_Data(level_data);
    this.background = new Background('grid_floor');

    this._set_elements();
  }

  _set_elements() {
    global.set_light_level(1);
    this.player.light.hide();

    create_grid();
    console.log( collision_container );


    this.background.set_position({x: 1100, y: 800});
    this.background.alpha = 0.5;

    this.add_to_segments(this.background.sprite);
    this.create_grid(level_tiled);

    this.elements.prey.forEach(data => {
      const prey = new Rat();
      prey.enemy(this.player);
      prey.logic_start();
      prey.set_position(data);
    });

    this.elements.walls.forEach(data => {
      const wall  = new Wall();
      wall.shadow = true;
      wall.height = data.height;
      wall.width  = data.width;
      wall.anchor = 0;
      wall.set_position(data);
    });

    this.elements.lights.forEach(data => {
      const light = new Candle();
      light.height = data.height;
      light.width  = data.width;
      light.set_position(data);
    });

    // const binary_matrix = [];
    collision_container.children.forEach(object => {
      matrix.forEach(tile => {
        if(check(tile, object)) {
          tile.alpha = 1;
        } else {
          tile.alpha = 0;
        }
      });
      binary_matrix.push(binary_line);
      binary_line = [];

    });
    // console.log(binary_matrix);

    const binary_matrix = [];
    let binary_line = [];
    matrix.forEach((tile, i) => {
      if(i %10===0) {
        binary_matrix.push(binary_line);

        binary_line = [];
      }

      if(tile.alpha === 1) {
        binary_line.push('|');
      } else {
        binary_line.push(0);
      }
    });

    console.log(binary_matrix);
  }
}

module.exports = {
  Tiled_Prey,
};
