//const { pathfind    } = require('../../engine/pathfind.js');
//const { LogicRat    } = require('../../character/archetypes/logic_rat');

const { LogicZombie } = require('../../character/archetypes/logic_zombie');
const { Player      } = require('../../character/archetypes/player');
//const { renderer    } = require('../../engine/app.js');
const { PathRat     } = require('../../character/archetypes/path_rat');
const { env         } = require('../../../config');
const { viewport    } = require('../../engine/app');
const { players      } = require('../../engine/pixi_containers');

const {
  Trigger_Pad,
  Wall,
  Decal,
  Background,
  Roof,
  Collision,
  Floor,
  Chest,
  Border,
} = require('../elements');


class ParkRoom  {
  constructor() {
    this.name   = 'defend_room';
    this.data   = require('../data/park_room.json');
    this.player = players.children[0];

    this.backgrounds = this.data.background.map(data => new Background(data));
    this.rats        = this.data.rats.map(unit => new PathRat(unit));
    this.exit_pad    = this.data.exit_pad.map(data => new Trigger_Pad(data, this.player));
    this.walls       = this.data.walls.map(data => new Wall(data));
    this.roofs       = this.data.roof.map(data => new Roof(data));
    this.floors      = this.data.floor.map(data => new Floor(data));
    this.collisions  = this.data.collision.map(data => new Collision(data));
    this.decals      = this.data.decal.map(data => new Decal(data));
    this.items       = this.data.item.map(data => new Chest(data));
    this.borders     = this.data.bounds.map(data => new Border(data));

    this.zombie = new LogicZombie(this.data.zombie[0]);
    this.rat_pad = this.exit_pad.find(pad => pad.id === 236);

    this.zombie_pad = this.exit_pad.find(pad => pad.id === 207);

    this._set_elements();
    // this._set_prey();
    if(env.dev) this._set_dev_settings();
  }

  _set_prey() {
    // this.prey_exit_pad = this.exit_pad.find(pad => pad.id === 15);
    // this.rats          = this.data.prey.map(data => {
    //   const entity = new LogicRat(data);
    //   entity.target(this.prey_exit_pad);
    //   entity.rotation_offset = 1.57;
    //   entity.width /= 4;
    //   entity.height /= 4;
    //   return entity;
    // });

    // this.grid = pathfind.create_level_grid(this.data.grid[0]);
    // this.rat_pad.events.once('trigger', () => this.rats.forEach(rat => rat.logic_start()));
  }

  _set_elements() {
    //renderer.backgroundColor = 0x000000;
    console.log(players);
    console.log(this.player);
    this.player.position.copy(this.data.player_spawn[0]);

    this.zombie.target(this.player);
    this.zombie.position.set(this.data.zombie[0]);

    this.zombie_pad.once('trigger', () => this.zombie.logic_start());

    this.rat_pad.once('trigger', () => this.rats.forEach(rat => rat.start()));
  }

  _set_dev_settings() {
    this.player.position.copy(this.data.player_spawn[1]);

    this.borders.map(border => border.alpha = 0.4);
  }
}

module.exports = {
  ParkRoom,
};
