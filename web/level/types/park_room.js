const { LogicZombie } = require('../../character/archetypes/logic_zombie');
const { PathRat     } = require('../../character/archetypes/path_rat');
const { env         } = require('../../../config');
const { players     } = require('../../engine/pixi_containers');

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
    if(env.dev) this._set_dev_settings();
  }

  _set_elements() {
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
