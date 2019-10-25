const { players  } = require('../../engine/pixi_containers');
const { pathfind    } = require('../../engine/pathfind.js');
const { LogicTest } = require('../../character/archetypes/logic_test');
const { sound    } = require('pixi.js');
const { flash_at } = require('../../effects/fade_sprite.js');
const { Fade     } = require('../../effects/fade.js');
const { env      } = require('../../../config');
const { sleep    } = require('../../utils/time.js');
const { ActorHuman } = require('../../character/archetypes/actor_human');
const { Night     } = require('../../effects/environment');
const { PathCrow        } = require('../../character/archetypes/path_crow');
const { viewport    } = require('../../engine/app');
const { keyboardManager } = require('pixi.js');
const { Caption   } = require('../../view/caption');

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
  Border,
} = require('../elements');

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
    this.lamps  = this.data.lamps.map(lamp => new Street_Lamp(lamp));
    this.roofs        = this.data.roof.map(data => new Roof(data));
    this.backgrounds  = this.data.background.map(data => new Background(data));
    this.decals       = this.data.decal.map(data => new Decal(data));
    this.floors       = this.data.floor.map(data => new Floor(data));
    this.exit_pad     = this.data.exit_pad.map(data => new Trigger_Pad(data, this.player));
    this.click_pad    = this.data.click_pad.map(data => new Click_Pad(data));
    this.crows        = this.data.birds.map(unit => new PathCrow(unit));
    this.borders      = this.data.border.map(data => new Border(data));

    this.doors        = this.data.door.map(data => new Door(data));
    this.entry_point  = this.data.player_spawn.find(spawns => spawns.id === spawn_id || 137);

    this.truck_exit   = new Trigger_Pad(this.data.truck_pad[0]);
    this.truck_enter  = new Trigger_Pad(this.data.truck_pad[1]);
    this.truck_roof   = this.roofs.find(roof => roof.id === 443);
    this.zombies      = this.data.prey.map(unit => new LogicTest(unit));
    this.grid         = pathfind.create_level_grid(this.data.grid[0]);

    // this._set_sounds();
    this._set_elements();
    this._set_cutscene();
    if(env.dev) {
      this._set_dev_settings();
    }
    // Night.on();
  }

  _set_cutscene() {
    this.intro_fade = flash_at(this.player.getGlobalPosition(), 2000);
  }

  _set_dev_settings() {
    this.intro_fade.renderable = false;
  }

  _set_sounds() {
    this.theme_song = sound.find('start_theme');
    this.theme_song.volume = 0.01;
    this.theme_song.play();
  }

  _set_elements() {
    this.player.position.copy(this.entry_point);
    this.truck_roof.tint = 0xffffff;

    this.truck_exit.on('trigger', () => {
      Fade.to(this.truck_roof, 1);
    });

    this.truck_enter.on('trigger', () => {
      Fade.to(this.truck_roof, 0.3);
    });

    const actors = this.data.actors.map(actor => new ActorHuman(actor));

    const zombie = this.zombies[0];
    zombie.target(this.player);
    zombie.animation.eat();
    pathfind.no_highlights();

    const car = this.items
      .find(pad => pad.id === 682)
      .on('click', async () => {
        Caption.render('lets get home');
      });

    this.exit_pad
      .find(pad => pad.id === 960)
      .once('trigger', async () => {
        console.log('bang bang');
        await sleep(4000);
        zombie.logic_start({ 'speed': 1000 });
      });

    car.interactive = false;

    zombie.events
      .on('killed', () => {
        car.interactive = true;
      });

    this.click_pad
      .find(pad => pad.id === 125)
      .on('click', () => Night.off());

    // this.click_pad
    //   .find(pad => pad.id === 691)
    //   .click = () => zombie.logic_start({ 'speed': 1000 });

    this.exit_pad
      .find(pad => pad.id === 716)
      .once('trigger', () => this.crows.forEach(unit => unit.start()));

    this.exit_pad
      .find(pad => pad.id === 860)
      .once('trigger', () => {

        keyboardManager.disable();
        viewport.snap(car.x, car.y, {
          'time'            : 3000,
          'removeOnComplete': true,
          'interrupt'       : false,
        });

        viewport.on('snap-end', () => {
          keyboardManager.enable();
        });
      });

    const timing = 500;

    this.exit_pad
      .find(pad => pad.id === 954)
      .once('trigger', () => {

        const point =  this.roofs
          .find(pad => pad.id === 666);

        keyboardManager.disable();
        viewport.snap(point.x, point.y, {
          'time'            : 3000,
          'removeOnComplete': true,
          'interrupt'       : false,
        });

        viewport.on('snap-end', () => {
          keyboardManager.enable();
        });
      });


    this.exit_pad
      .find(pad => pad.id === 628)
      .once('trigger', () => {

        keyboardManager.disable();
        viewport.snap(actors[1].x, actors[1].y, {
          'time'            : 3000,
          'removeOnComplete': true,
          'interrupt'       : false,
        });

        viewport.on('snap-end', () => {
          keyboardManager.enable();
        });

        this.lamps.forEach(async (lamp, i) => {
          let count_flicker = 0;

          const actor = actors[i];
          actor.renderable = false;
          actor.tint = 0x000000;
          actor.alpha = 0.5;

          await sleep(timing);
          lamp.flicker_for(4000 + timing);
          lamp.events.on('on', () => {
            actor.face_point(this.player);
            count_flicker++;
            if(
              count_flicker > 7
              && count_flicker < 10
            ) {
              actor.renderable = true;
            }
            if(count_flicker > 12) {
              lamp.turn_off();
            }
          });

          lamp.events.on('off', () => {
            count_flicker++;
            actor.face_point(this.player);
            if(count_flicker > 12) {
              actor.renderable = false;
            }
          });
        });
      });
  }
}

module.exports = {
  StreetRoom,
};
