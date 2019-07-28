//const { Level_Factory } = require('./level_factory');
const { Player       } = require('../../character/archetypes/player');
const { PathSprite   } = require('../../character/types/path');
const { players      } = require('../../engine/pixi_containers');
const { FloorWord    } = require('../../effects/floor_word');
const { guis         } = require('../../engine/pixi_containers');
const { random_bound } = require('../../utils/math.js');
const { sleep        } = require('../../utils/time.js');
const { env          } = require('../../../config');
const { VideoBaseTexture, tweenManager, Sprite, Texture, Text } = require('pixi.js');

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
} = require('../elements');

let first = false;
class Dev_Room {
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

    this._set_elements();
    if(env.dev) this._set_dev_settings();
    this._start();
  }

  _set_elements() {
    if(!first) {
      this.player.position.copy(this.entry_point);
      first = true;
    }
  }

  async _start() {
    // console.log(foo);
    // const mouse_position = get_relative_mouse_position(this.player, event.data.global);
    // await flicker(this.light_shroud);
  }

  _set_dev_settings() {
  }
}

module.exports = {
  Dev_Room,
};
