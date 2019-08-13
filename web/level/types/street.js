const { players  } = require('../../engine/pixi_containers');
const { sound    } = require('pixi.js');
const { flash_at } = require('../../effects/fade_sprite.js');
const { Fade     } = require('../../effects/fade.js');
const { env      } = require('../../../config');
const { sleep    } = require('../../utils/time.js');
const { random_bound } = require('../../utils/math.js');

const {
  Trigger_Pad,
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

const randomiser = random_bound(-10, 10);

async function flicker(light) {
  light.alpha = 0.7;

  await sleep(20+randomiser);
  light.alpha = 0;

  await sleep(15+randomiser*3);
  light.alpha = 0;

  await sleep(randomiser*2);
  light.alpha = 0.9;

  await sleep(15+randomiser);
  light.alpha = 0;

  await sleep(45+randomiser*2);
  light.alpha = 1;

  await sleep(5000+(randomiser ** 2));

  await flicker(light);
}

class StreetRoom {
  constructor(spawn_id) {
    this.name   = 'home_street';
    this.data   = require('../data/home_street.json');
    this.player = players.children[0];

    this.walls        = this.data.walls.map(data => new Wall(data));
    this.shrouds      = this.data.shroud.map(data => new Shroud(data));
    this.roofs        = this.data.roof.map(data => new Roof(data));
    this.items        = this.data.item.map(data => new Chest(data));
    this.collisions   = this.data.collision.map(data => new Collision(data));
    this.second_floor = this.data.second_floor.map(data => new Collision(data));
    this.decals       = this.data.decal.map(data => new Decal(data));
    this.floors       = this.data.floor.map(data => new Floor(data));
    this.exit_pad     = this.data.exit_pad.map(data => new Trigger_Pad(data, this.player));
    this.backgrounds  = this.data.background.map(data => new Background(data));
    this.doors        = this.data.door.map(data => new Door(data));
    this.entry_point  = this.data.player_spawn.find(spawns => spawns.id === spawn_id);

    this.lights = this.data.christmas_lights.map(light => new Floor(light));

    this.second_floor.forEach(roof => roof.tint = 0x909090);
    //this.roofs.forEach(roof => roof.tint = 0x909090);

    this.truck_exit   = new Trigger_Pad(this.data.truck_pad[0]);
    this.truck_enter  = new Trigger_Pad(this.data.truck_pad[1]);
    this.truck_roof   = this.roofs.find(roof => roof.id === 443);
    this.matress_roof = this.roofs.find(roof => roof.id === 556);

    this._set_sounds();
    this._set_elements();
    this._set_cutscene();
    if(env.dev) this._set_dev_settings();
  }

  _set_cutscene() {
    this.intro_fade = flash_at(this.player, 2000);
  }

  _set_sounds() {
    this.theme_song = sound.find('start_theme');
    this.theme_song.volume = 0.01;
  }

  _set_elements() {
    this.theme_song.play();

    this.player.position.copy(this.entry_point);
    this.truck_roof.tint = 0xffffff;
    this.matress_roof.tint = 0xA8A8A8;

    this.truck_exit.on('trigger', () => {
      Fade.to(this.truck_roof, 1);
      Fade.to(this.matress_roof, 1);
    });

    this.truck_enter.on('trigger', () => {
      Fade.to(this.truck_roof, 0.3);
      Fade.to(this.matress_roof, 0.4);
    });
    this.lights.forEach(light => flicker(light));
  }

  _set_dev_settings() {
    this.intro_fade.visible = false;
  }
}

module.exports = {
  StreetRoom,
};
