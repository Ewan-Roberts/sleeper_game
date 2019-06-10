'use strict';

const { pathfind      } = require('../../engine/pathfind.js');
const { Tiled_Data    } = require('../attributes/parse_tiled_data');
const { Trigger_Pad   } = require('../elements/pad');
const { Walker        } = require('../../character/archetypes/rat');
const { Lurcher       } = require('../../character/archetypes/zombie');
const { Player        } = require('../../character/archetypes/player');
const { Level_Factory } = require('./level_factory');
const { players       } = require('../../engine/pixi_containers');
const level_data        = require('../data/defend_room.json');

class Defend_Room  {
  constructor() {
    this.name     = 'defend_room';
    this.player   = new Player();
    this.elements = new Tiled_Data(level_data);

    this._set_elements();
  }

  _set_elements() {
    console.log(players);
    Level_Factory.generate(this.elements);

    const { prey, exit_pad, grid, player } = this.elements;

    this.player.position.copy(player[0]);
    const zombies = prey.map((unit,i) => {
      const zombie = new Walker(unit);
      zombie.target(this.player);
      zombie.position.copy(unit);
      if(i % 2) zombie.animation.eat();
      return zombie;
    });

    const lurk = prey.find(unit => unit.id === 263);

    const path = lurk.polyline.map(({x,y})=>({x:lurk.x+x, y:lurk.y+y}));
    const lurker = new Lurcher({ path, time: 20000, turn: true});
    lurker.tween.start();

    exit_pad.forEach(data => {
      const pad = new Trigger_Pad(data);

      pad.events.once('trigger', () => {
        zombies.forEach(unit => unit.logic_start());
      });
      return pad;
    });

    pathfind.create_level_grid(grid[0]);
  }
}

module.exports = {
  Defend_Room,
};
