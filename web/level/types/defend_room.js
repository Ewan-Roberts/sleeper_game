const { pathfind    } = require('../../engine/pathfind.js');
const { Trigger_Pad } = require('../elements/pad');
const { LogicTest } = require('../../character/archetypes/logic_test');
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
    this.zombies      = this.data.prey.map(unit => new LogicTest(unit));
    this.obstacles    = this.data.obstacle.map(unit => new Collision(unit));

    this.attack_pad      = this.exit_pad.find(pad => pad.id === 207);
    this.attack_pad.text = 'zombie attack';
    this.grid            = pathfind.create_level_grid(this.data.grid[0]);

    this._set_elements();
  }

  _set_elements() {
    this.player.position.copy(this.entry_point);

    const point = global.place_bunny();
    point.alpha = 1;
    point.height = 20;
    point.width = 20;

    const zombie = this.zombies[0];
    zombie.target(this.player);
    zombie.animation.eat();
    zombie.logic_start({ 'speed': 1000 });

    viewport.on('click', ({ data }) => {
      const mouse_position = data.getLocalPosition(viewport);
      point.position.copy(mouse_position);
      zombie.target(point);
    });

    const zombie1 = this.zombies[1];
    zombie1.target(zombie);
    zombie1.animation.eat();
    zombie1.logic_start({ 'speed': 1000 });

    // this.attack_pad.once('trigger', () => {
    //   this.zombies.forEach(zombie => {
    //     zombie.animation.eat();
    //     zombie.target(this.player);
    //     zombie.logic_start();
    //   });
    // });
  }
}

module.exports = {
  DefendRoom,
};
