'use strict';
const { pathfind } = require('../../engine/pathfind.js');
const { Camera   } = require('../../engine/camera.js');
const { sleep    } = require('../../utils/time.js');

const { roofs        } = require('../../engine/pixi_containers.js');
const { decals       } = require('../../engine/pixi_containers.js');
const { backgrounds  } = require('../../engine/pixi_containers.js');
const { collisions   } = require('../../engine/pixi_containers.js');
const { shrouds      } = require('../../engine/pixi_containers.js');

const { FloorWord       } = require('../../effects/floor_word.js');
const { Overlay_Dialog  } = require('../../effects/overlay_dialog.js');
const { Tiled_Data      } = require('../attributes/parse_tiled_data');
const { Trigger_Pad     } = require('../elements/pad');
const { MicrophonePopUp } = require('../../view/microphone_box');
const { WASD            } = require('../../view/wasd_keys');
const { Stalker         } = require('../../character/archetypes/stalker');
const { Player          } = require('../../character/archetypes/player');
const { Crow            } = require('../../character/archetypes/crow');

const { pulse_sprites, flash_at } = require('../../effects/fade_sprite.js');
const { Fade       } = require('../../effects/fade.js');
const { Nightmare  } = require('../../effects/nightmare.js');
const { sound ,keyboardManager } = require('pixi.js');
const { Level_Factory } = require('./level_factory');

const {
  Wall,
  Decal,
  Background,
  Chest,
  Door,
  Roof,
  Shroud,
  Collision,
  Floor,
} = require('../elements');

const level_data_raw = require('../data/start.json');

global.dev();
class Start_Room  {
  constructor() {
    this.name       = 'defend_room';
    this.level_data = new Tiled_Data(level_data_raw);

    this.player        = new Player();
    this.player_spawns = this.level_data.player;

    this.decals        = this.level_data.decal.map(data => new Decal(data));
    this.floors        = this.level_data.floor.map(data => new Floor(data));
    this.roofs         = this.level_data.roof.map(data => new Roof(data));
    this.shrouds       = this.level_data.shroud.map(data => new Shroud(data));
    this.backgrounds   = this.level_data.background.map(data => new Background(data));
    this.walls         = this.level_data.walls.map(data => new Wall(data));
    this.collisions    = this.level_data.collision.map(data => new Collision(data));
    this.items         = this.level_data.item.map(data => new Chest(data));
    this.door          = this.level_data.door.map(data => new Door(data));
    this.exit_pads     = this.level_data.exit_pad.map(data => new Trigger_Pad(data));
    this.iterator_pads = this.level_data.iterator_pad.map(data => new Trigger_Pad(data));

    this.roof_pad      = new Trigger_Pad(this.level_data.roof_pad[0]);
    this.bed           = new Chest(this.level_data.shrine[0]);
    this.kill_him_word = new FloorWord({
      font_size: 200,
      rotation:  15,
      fill:      'white',
      weight:    'bolder',
      text:      'KILL HIM',
    });
    backgrounds.addChild(this.kill_him_word);

    this.controls_prompt   = new WASD();
    this.microphone_prompt = new MicrophonePopUp();
    this.script            = new Overlay_Dialog(['...','this again...'], this.player);

    this.crows    = this.level_data.birds.map(unit => new Crow(unit));
    this.stalkers = this.level_data.prey.map(unit => new Stalker(unit, this.player));
    this.generator = this.iterate();

    pathfind.create_level_grid(this.level_data.grid[0]);
    this._set_sounds();
    this._set_elements();
  }

  _leave() {
    Nightmare.off();
    Level_Factory.create({properties: {level_name: 'intro'}}, this.player);
  }

  _set_sounds() {
    this.theme_song = sound.find('start_theme');
    this.eerie_song = sound.find('eerie_ambient');

    this.suspense_effect = sound.find('suspense_in');
    this.click_effect    = sound.find('click');
    this.static_effect   = sound.find('static_effect');
    this.static_effect.volume = 0.001;

    if(global.env !== 'dev') return;
    this.theme_song.volume      = 0.01;
    this.eerie_song.volume      = 0.01;
    this.static_effect.volume   = 0.001;
    this.suspense_effect.volume = 0.01;
    this.click_effect.volume    = 0.1;
  }

  _set_elements() {
    if(global.env === 'dev') {
      this.player.position.copy(this.player_spawns[0]);
      Camera.set_center(this.player_spawns[0]);
    } else {
      this.player.position.copy(this.player_spawns[1]);

      Camera.set_center(this.player_spawns[1]);
    }

    this.controls_prompt.set_position(this.player);
    this._start();
  }

  async * iterate() {
    yield;
    pulse_sprites(this.level_data.arrow_trail);
    Nightmare.on();
    this.level_data.gore_layer.forEach(item => new Floor(item));

    this.iterator_pads.forEach(pad => {
      pad.once('trigger', () => this.generator.next());
    });

    yield;
    pulse_sprites(this.level_data.blood_trail);

    yield;
    this.microphone_prompt.show();
    this.microphone_prompt.click = () => {
      this.microphone_prompt.hide();
      this.generator.next();
    };

    yield;
    collisions.removeChildren();
    shrouds.removeChildren();

    this.kill_him_word.position.copy(this.player);
    this.kill_him_word.fade_in_wait_out();

    let time_in = 700;
    this.stalkers.forEach(unit => {
      setTimeout(() => {
        //unit.talk();
        unit.floor_hands = true;
        unit.logic_start();
      },time_in);

      time_in += 512;
    });

    yield;
    roofs.removeChildren();
    this.stalkers.forEach(unit => unit.remove());

    yield * this.script.generator();
    this._leave();
  }

  _start() {
    this.theme_song.play();
    this.crows.forEach(unit => unit.start());
    this.controls_prompt.fade_in(3000);

    this.player.vitals.events.on('killed', () => this.generator.next());
    this.player.vitals.events.on('hit', () => flash_at(this.player, 300));

    this.bed.once('click', async () => {
      this.suspense_effect.play();
      this.eerie_song.play();

      flash_at(this.player, 1590);
      this.bed.remove();
      await sleep(1490);

      this.click_effect.play();
      this.theme_song.stop();

      await sleep(100);
      flash_at(this.player, 200);
      this.generator.next();
    });

    this.script.button.on('mousedown', () => {
      this.script.button.tint = 0xffffff;
      if(!this.script.enable) return;
      this.generator.next();
    });

    this.exit_pads.forEach(pad => {
      pad.once('trigger', () => {
        Nightmare.on();
        this.microphone_prompt.showable = false;
        this.stalkers.forEach(unit => {
          unit.floor_hands = true;
          unit.logic_start();
        });
      });
    });

    this.roof_pad.once('trigger', () => {
      const hut_roof = this.roofs.find(entities=> entities.id === 663);
      Fade.out_destroy(hut_roof);
    });

    keyboardManager.on('pressed', event => {
      if(this.controls_prompt.complete) this.generator.next();

      if(event === 87) this.controls_prompt.press('w');
      if(event === 65) this.controls_prompt.press('a');
      if(event === 83) this.controls_prompt.press('s');
      if(event === 68) this.controls_prompt.press('d');

      if(event === 13 && global.env === 'dev') this.generator.next();
    });
  }
}

module.exports = {
  Start_Room,
};
