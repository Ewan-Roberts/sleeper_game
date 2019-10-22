const { players  } = require('../../engine/pixi_containers');
const { pathfind    } = require('../../engine/pathfind.js');
const { stage } = require('../../engine/app');
const { LogicTest } = require('../../character/archetypes/logic_test');
const { sound    } = require('pixi.js');
const { flash_at } = require('../../effects/fade_sprite.js');
const { Fade     } = require('../../effects/fade.js');
const { env      } = require('../../../config');
const { sleep    } = require('../../utils/time.js');
const { random_bound } = require('../../utils/math.js');
const { ActorHuman } = require('../../character/archetypes/logic_human');
const { Night     } = require('../../effects/environment');
const { PathCrow        } = require('../../character/archetypes/path_crow');

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
  Street_Lamp,
  Click_Pad,
} = require('../elements');

const randomiser = random_bound(-10, 10);

async function flicker(light) {
  light.alpha = 0.7;

  await sleep(20 + randomiser);
  light.alpha = 0;

  await sleep(15 + randomiser * 3);
  light.alpha = 0;

  await sleep(randomiser * 2);
  light.alpha = 0.9;

  await sleep(15 + randomiser);
  light.alpha = 0;

  await sleep(45 + randomiser * 2);
  light.alpha = 1;

  await sleep(5000 + (randomiser ** 2));

  await flicker(light);
}

class StreetRoom {
  constructor(spawn_id) {
    this.name   = 'home_street';
    this.data   = require('../data/home_street.json');
    this.player = players.children[0];

    this.walls        = this.data.walls.map(data => new Wall(data));
    this.shrouds      = this.data.shroud.map(data => new Shroud(data));
    this.items        = this.data.item.map(data => new Chest(data));
    this.collisions   = this.data.collision.map(data => new Collision(data));
    this.second_floor = this.data.second_floor.map(data => new Roof(data));
    this.roofs        = this.data.roof.map(data => new Roof(data));
    this.decals       = this.data.decal.map(data => new Decal(data));
    this.floors       = this.data.floor.map(data => new Floor(data));
    this.exit_pad     = this.data.exit_pad.map(data => new Trigger_Pad(data, this.player));
    this.click_pad    = this.data.click_pad.map(data => new Click_Pad(data));
    this.crows        = this.data.birds.map(unit => new PathCrow(unit));

    this.backgrounds  = this.data.background.map(data => new Background(data));
    this.doors        = this.data.door.map(data => new Door(data));
    this.entry_point  = this.data.player_spawn.find(spawns => spawns.id === spawn_id || 137);

    this.truck_exit   = new Trigger_Pad(this.data.truck_pad[0]);
    this.truck_enter  = new Trigger_Pad(this.data.truck_pad[1]);
    this.truck_roof   = this.roofs.find(roof => roof.id === 443);
    this.matress_roof = this.roofs.find(roof => roof.id === 556);
    this.zombies      = this.data.prey.map(unit => new LogicTest(unit));
    this.grid         = pathfind.create_level_grid(this.data.grid[0]);

    this._set_sounds();
    this._set_elements();
    this._set_cutscene();
    if(env.dev) {
      this._set_dev_settings();
    }
    Night.on();
  }

  _set_cutscene() {
    this.intro_fade = flash_at(this.player.getGlobalPosition(), 2000);
  }

  _set_dev_settings() {
    this.intro_fade.visible = false;
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

    const lamps  = this.data.lamps.map(lamp => new Street_Lamp(lamp));
    const actors = this.data.actors.map(actor => new ActorHuman(actor));

    const zombie = this.zombies[0];
    zombie.target(this.player);
    zombie.animation.eat();
    pathfind.no_highlights();

    this.click_pad
      .find(pad => pad.id === 125)
      .click = () => Night.off();

    this.click_pad
      .find(pad => pad.id === 691)
      .click = () => zombie.logic_start({ 'speed': 1000 });

    this.exit_pad
      .find(pad => pad.id === 716)
      .once('trigger', () => this.crows.forEach(unit => unit.start()));

    const timing = 500;

    this.exit_pad
      .find(pad => pad.id === 628)
      .once('trigger', () => {
        lamps.forEach(async (lamp, i) => {
          let count_flicker = 0;

          const actor = actors[i];
          actor.visible = false;

          await sleep(timing);
          lamp.flicker_for(4000 + timing);
          lamp.events.on('on', () => {
            actor.face_point(this.player);
            count_flicker++;
            if(
              count_flicker > 7
              && count_flicker < 10
            ) {
              actor.visible = true;
            }
            if(count_flicker > 12) {
              lamp.turn_off();
            }
          });

          lamp.events.on('off', () => {
            count_flicker++;
            actor.face_point(this.player);
            if(count_flicker > 12) {
              actor.visible = false;
            }
          });
        });
      });
  }
}

module.exports = {
  StreetRoom,
};
