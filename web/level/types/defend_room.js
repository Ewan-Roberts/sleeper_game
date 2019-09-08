const { pathfind    } = require('../../engine/pathfind.js');
const { Trigger_Pad } = require('../elements/pad');
const { LogicZombie } = require('../../character/archetypes/logic_zombie');
const { players     } = require('../../engine/pixi_containers');
const { viewport    } = require('../../engine/app');

const {
  Wall,
  Door,
  Decal,
  Background,
  Chest,
  Roof,
  Shroud,
  Collision,
  Floor,
} = require('../elements');

class DefendRoom  {
  constructor() {
    this.name   = 'defend_room';
    this.player = players.children[0];
    this.data   = require('../data/defend_room.json');

    this.walls        = this.data.walls.map(data => new Wall(data));
    this.shrouds      = this.data.shroud.map(data => new Shroud(data));
    this.roofs        = this.data.roof.map(data => new Roof(data));
    this.items        = this.data.item.map(data => new Chest(data));
    this.collisions   = this.data.collision.map(data => new Collision(data));
    this.decals       = this.data.decal.map(data => new Decal(data));
    this.floors       = this.data.floor.map(data => new Floor(data));
    this.exit_pad     = this.data.exit_pad.map(data => new Trigger_Pad(data, this.player));
    this.backgrounds  = this.data.background.map(data => new Background(data));
    this.doors        = this.data.door.map(data => new Door(data));
    this.entry_point  = this.data.player_spawn.find(spawns => spawns.id === 269);
    this.zombies      = this.data.prey.map(unit => new LogicZombie(unit));
    this.obstacles    = this.data.obstacle.map(unit => new Collision(unit));

    this.attack_pad      = this.exit_pad.find(pad => pad.id === 207);
    this.attack_pad.text = 'zombie attack';
    this.grid            = pathfind.create_level_grid(this.data.grid[0]);

    this._set_elements();
  }

  _set_elements() {
    this.player.position.copy(this.entry_point);

    const point = global.place_bunny();

    const zombie = this.zombies[0];
    zombie.target(point);
    zombie.animation.eat();
    zombie.logic_start({
      'time_on_sight': 2000,
    });


    viewport.on('click', ({ data }) => {
      const mouse_position = data.getLocalPosition(viewport);
      point.position.copy(mouse_position);
      console.log(zombie);
      zombie.target(point);


    });

    this.attack_pad.once('trigger', () => {
      this.zombies.forEach(zombie => {
        zombie.animation.eat();
        zombie.target(this.player);
        zombie.logic_start();
      });
    });
  }
}

module.exports = {
  DefendRoom,
};
