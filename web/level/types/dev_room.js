//const { Level_Factory } = require('./level_factory');
//const { Player       } = require('../../character/archetypes/player');
const { LogicRat     } = require('../../character/archetypes/logic_rat');
const { LogicZombie  } = require('../../character/archetypes/logic_zombie');
const { PathSprite   } = require('../../character/types/path');
const { players      } = require('../../engine/pixi_containers');
const { collisions    } = require('../../engine/pixi_containers');
const { items       } = require('../../engine/pixi_containers');
const { FloorWord    } = require('../../effects/floor_word');
const { Debris       } = require('../../effects/debris');
const { guis         } = require('../../engine/pixi_containers');
const { renderer     } = require('../../engine/app');
const { stage } = require('../../engine/app');
const { random_bound } = require('../../utils/math.js');
const { sleep        } = require('../../utils/time.js');
const { env          } = require('../../../config');
const { sound        } = require('pixi.js');
const { Rectangle    } = require('pixi.js');
const { Container } = require('pixi.js');
const { filters } = require('pixi.js');
const { flash_at     } = require('../../effects/fade_sprite.js');
const { VideoBaseTexture, tweenManager, Sprite, Texture, Text } = require('pixi.js');
const { Graphics } = require('pixi.js');
const { viewport } = require('../../engine/app');
const { Raycast } = require('../../engine/raycast');

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
  }

  _set_dev_settings() {
    // TODO consider extraction function or storing walls in a different container
    const walls = collisions.children.filter(sprite => sprite.constructor.name === 'Wall');

    this.top_door = this.doors.find(door => door.id === 527);
    this.top_wall = this.walls.find(wall => wall.id === 625);

    this.bathroom_door = this.doors.find(door => door.id === 590);
    this.bathroom_wall = this.walls.find(wall => wall.id === 624);

    this.top_door.once('click', () => {
      this.top_wall.destroy();
      raycaster._refesh_segments();
    });

    this.bathroom_door.click = () => {
      this.bathroom_wall.destroy();
      raycaster._refesh_segments();
    };

    this.exit_door.lock();
    this.exit_door.click = () => {
      const keys_for_door = this.player.inventory.take_item('keys_brass');
      if(keys_for_door) {
        this.exit_door.unlock().open();
      }
    };

    const light = this.collisions.find(light => light.id === 626);
    const raycaster = new Raycast(this.player, {
      border:       this.data.shadow_area[0],
      obstructions: walls,
      follow:       true,
      radius:       200,
    });
    raycaster.add_light(light, 200);

    viewport.on('mousemove', ({data}) => {
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
