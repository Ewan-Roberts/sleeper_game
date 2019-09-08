const { players     } = require('../../engine/pixi_containers');
const { collisions  } = require('../../engine/pixi_containers');
const { env         } = require('../../../config');
const { viewport    } = require('../../engine/app');
const { Raycast     } = require('../../engine/raycast');
const { ProgressBar } = require('../../view/progress_bar');

const {
  Wall,
  Decal,
  Door,
  Background,
  Chest,
  Roof,
  Shroud,
  Collision,
  Floor,
  Trigger_Pad,
  Generator,
} = require('../elements');

let first = false;
class DevRoom {
  constructor(spawn_id) {
    this.name   = 'dev_room';
    this.data   = require('../data/dev_room.json');
    this.player = players.children[0];

    this.items       = this.data.item.map(data => new Chest(data));
    this.shrouds     = this.data.shroud.map(data => new Shroud(data));
    this.roofs       = this.data.roof.map(data => new Roof(data));
    this.backgrounds = this.data.background.map(data => new Background(data));
    this.walls       = this.data.walls.map(data => new Wall(data));
    this.doors       = this.data.door.map(data => new Door(data));
    this.exit_pad    = this.data.exit_pad.map(data => new Trigger_Pad(data));
    this.floors      = this.data.floor.map(data => new Floor(data));
    this.decals      = this.data.decal.map(data => new Decal(data));
    this.collisions  = this.data.collision.map(data => new Collision(data));

    this.light_shroud = this.shrouds.find(roof => roof.id === 592);
    this.entry_point  = this.data.player_spawn.find(spawns => spawns.id === spawn_id);
    this.exit_door    = this.doors.find(door => door.id === 619);

    this._set_elements();
    if(env.dev) {
      this._set_dev_settings();
    }
    this._start();
  }

  _set_elements() {
    if(!first) {
      this.player.position.copy(this.entry_point);
      first = true;
    }
  }

  async _start() {
  }

  _set_dev_settings() {
    // TODO consider extraction function or storing walls in a different container
    const walls = collisions.children.filter(sprite => sprite.constructor.name === 'Wall');

    this.top_door = this.doors.find(door => door.id === 527);
    this.top_wall = this.walls.find(wall => wall.id === 625);

    this.top_door.once('click', () => {
      this.top_wall.destroy();
    });

    console.log(this.data.generator);
    const generator = new Generator(this.data.generator[0]);
    ProgressBar.percentage = 0.1;

    generator.on('click', () => {
      if(this.player.inventory.contains('gas_canister')) {
        const fuel_item = this.player.inventory.take_by_name('gas_canister');
        ProgressBar.show();

        generator.fuel = fuel_item.condition;
        ProgressBar.to_percentage(fuel_item.condition);
      }
    });

    ProgressBar.complete(() => {
      generator.ready();
    });

    this.exit_door.lock();
    this.exit_door.click = () => {
      const keys_for_door = this.player.inventory.take_by_name('keys_brass');
      if(keys_for_door) {
        this.exit_door.unlock().open();
      }
    };

    const light = this.collisions.find(light => light.id === 626);
    const raycaster = new Raycast(this.player, {
      'border'      : this.data.shadow_area[0],
      'obstructions': walls,
      'follow'      : true,
      'radius'      : 200,
    });
    raycaster.add_light(light, 200);

    viewport.on('mousemove', ({ data }) => {
      if(raycaster.raycast.containsPoint(data.global)) {
        viewport.interactiveChildren = true;
        return;
      }
      viewport.interactiveChildren = false;
    });
  }
}

module.exports = {
  DevRoom,
};
