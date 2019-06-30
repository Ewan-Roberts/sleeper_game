const { pathfind      } = require('../../engine/pathfind.js');
const { Trigger_Pad   } = require('../elements/pad');
const { Walker        } = require('../../character/archetypes/rat');
const { Player        } = require('../../character/archetypes/player');
const { Level_Factory } = require('./level_factory');

class Defend_Room  {
  constructor() {
    this.name     = 'defend_room';
    this.player   = new Player();
    this.elements = require('../data/defend_room.json');

    this._set_elements();
  }

  _set_elements() {
    Level_Factory.generate(this.elements);

    const { prey, exit_pad, grid, player } = this.elements;

    this.player.position.copy(player[0]);
    const zombies = prey.map((unit,i) => {
      const zombie = new Walker(unit);
      zombie.target(this.player);
      if(i % 2) zombie.animation.eat();
      return zombie;
    });

    exit_pad.forEach(data => {
      const pad = new Trigger_Pad(data);

      pad.events.once('trigger', () => zombies.forEach(unit => unit.logic_start()));
      return pad;
    });

    pathfind.create_level_grid(grid[0]);
  }
}

module.exports = {
  Defend_Room,
};
