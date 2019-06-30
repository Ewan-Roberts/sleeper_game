const { pathfind } = require('../../engine/pathfind.js');
const { LogicZombie   } = require('../../character/archetypes/logic_zombie');
const { Player   } = require('../../character/archetypes/player');
const { rodent   } = require('../../character/animations/rat');
const { Camera   } = require('../../engine/camera');
const { renderer } = require('../../engine/app.js');
const { PathRat  } = require('../../character/archetypes/path_rat');

const {
  Trigger_Pad,
  Wall,
  Decal,
  Background,
  Roof,
  Collision,
  Floor,
} = require('../elements');

class Park_Room  {
  constructor() {
    this.name   = 'defend_room';
    this.data   = require('../data/park_room.json');
    this.player = new Player();

    this.backgrounds = this.data.background.map(data => new Background(data));
    this.exit_pad    = this.data.exit_pad.map(data => new Trigger_Pad(data, this.player));
    this.walls       = this.data.walls.map(data => new Wall(data));
    this.roofs       = this.data.roof.map(data => new Roof(data));
    this.collisions  = this.data.collision.map(data => new Collision(data));
    this.floors      = this.data.floor.map(data => new Floor(data));
    this.decals      = this.data.decal.map(data => new Decal(data));

    this.zombie      = new LogicZombie(this.data.zombie[0]);
    renderer.backgroundColor = 0x000000;
    this.crows         = this.data.birds.map(unit => new PathRat(unit));
    this.prey_exit_pad = this.exit_pad.find(pad => pad.id === 15);
    this.rats          = this.data.prey.map(data => {
      const entity = new LogicZombie(data);
      entity.target(this.prey_exit_pad);
      entity.animation.frames = rodent;
      entity.rotation_offset = 1.57;
      entity.width /= 4;
      entity.height /= 4;
      return entity;
    });

    this.rat_pad    = this.exit_pad.find(pad => pad.id === 236);
    this.zombie_pad = this.exit_pad.find(pad => pad.id === 207);
    this._set_elements();
    this._set_dev_settings();
  }

  _set_elements() {
    this.player.position.copy(this.data.player_spawn[0]);
    Camera.set_center(this.data.player_spawn[0]);

    this.zombie.target(this.player);
    this.zombie.position.set(this.data.zombie[0]);

    this.rat_pad.events.once('trigger', () => this.rats.forEach(rat => rat.logic_start()));
    this.zombie_pad.events.once('trigger', () => this.zombie.logic_start());

    this.crows.forEach(unit => unit.start());

    this.grid = pathfind.create_level_grid(this.data.grid[0]);
  }

  _set_dev_settings() {
    this.player.position.copy(this.data.player_spawn[1]);
    Camera.set_center(this.data.player_spawn[1]);

    this.player.vitals.speed = 30;
  }
}

module.exports = {
  Park_Room,
};
