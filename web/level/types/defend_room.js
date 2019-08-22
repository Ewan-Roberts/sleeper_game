const { pathfind      } = require('../../engine/pathfind.js');
const { Trigger_Pad   } = require('../elements/pad');
const { LogicZombie   } = require('../../character/archetypes/logic_zombie');
const { players       } = require('../../engine/pixi_containers');
const { Level_Factory } = require('./level_factory');

class DefendRoom  {
  constructor() {
    this.name     = 'defend_room';
    this.player   = players.children[0];
    this.elements = require('../data/defend_room.json');
    this.exit_pad = this.elements.exit_pad.map(data => new Trigger_Pad(data));

    this._set_elements();
  }

  _set_elements() {
    Level_Factory.generate(this.elements);

    const { prey, grid, player } = this.elements;

    this.player.position.copy(player[0]);
    const zombies = prey.map((unit,i) => {
      const zombie = new LogicZombie(unit);
      zombie.target(this.player);
      if(i % 2) zombie.animation.eat();
      return zombie;
    });

    this.exit_pad.forEach(pad => {
      pad.events.once('trigger', () => zombies.forEach(unit => unit.logic_start()));
    });

    pathfind.create_level_grid(grid[0]);
  }
}

module.exports = {
  DefendRoom,
};
