const { players     } = require('../../engine/pixi_containers');
const { collisions  } = require('../../engine/pixi_containers');
const { env         } = require('../../../config');
const { Stalker     } = require('../../character/archetypes/logic_stalker');
const { viewport    } = require('../../engine/app');
const { Raycast     } = require('../../engine/raycast');
const { ProgressBar } = require('../../view/progress_bar');
const { flash_at       } = require('../../effects/fade_sprite.js');

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

class StalkerRoom {
  constructor(spawn_id) {
    this.name   = 'stalker_room';
    this.data   = require('../data/stalker_room.json');
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
    this.stalkers    = this.data.prey.map(unit => new Stalker(unit, this.player));

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
  }

  async _start() {
    this.player.position.copy(this.data.player_spawn[0]);

    this.player.events.on('hit', () => flash_at(this.player, 500));

    let time_in = 2400;
    this.stalkers.forEach(unit => {
      setTimeout(() => {
        unit.floor_hands = true;
        unit.logic_start();
      }, time_in);
      time_in += 1000;
    });

  }

  _set_dev_settings() {

  }
}

module.exports = {
  StalkerRoom,
};
