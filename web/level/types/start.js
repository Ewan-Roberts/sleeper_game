'use strict';
const { pathfind    } = require('../../engine/pathfind.js');
const { Camera      } = require('../../engine/camera.js');
const { roofs       } = require('../../engine/pixi_containers.js');
const { backgrounds } = require('../../engine/pixi_containers.js');
const { collisions  } = require('../../engine/pixi_containers.js');
const { shrouds     } = require('../../engine/pixi_containers.js');

const { sleep        } = require('../../utils/time.js');
const { random_bound } = require('../../utils/math.js');

const { FloorWord      } = require('../../effects/floor_word.js');
const { Overlay_Dialog } = require('../../effects/overlay_dialog.js');
const { Fade           } = require('../../effects/fade.js');
const { Nightmare      } = require('../../effects/nightmare.js');
const { pulse_sprites  } = require('../../effects/fade_sprite.js');
const { flash_at       } = require('../../effects/fade_sprite.js');

const { MicrophonePopUp } = require('../../view/microphone_box');
const { WASD            } = require('../../view/wasd_keys');
const { Stalker         } = require('../../character/archetypes/stalker');
const { Player          } = require('../../character/archetypes/player');
const { Crow            } = require('../../character/archetypes/crow');
const { keyboardManager } = require('pixi.js');
const { sound           } = require('pixi.js');
const { Level_Factory   } = require('./level_factory');

const {
  Trigger_Pad,
  Wall,
  Decal,
  Background,
  Chest,
  Roof,
  Shroud,
  Collision,
  Floor,
  Border,
} = require('../elements');

class Start_Room  {
  constructor() {
    this.name   = 'starter_room';
    this.data   = require('../data/start.json');
    this.player = new Player();

    this.decals      = this.data.decal.map(data => new Decal(data));
    this.floors      = this.data.floor.map(data => new Floor(data));
    this.roofs       = this.data.roof.map(data => new Roof(data));
    this.shrouds     = this.data.shroud.map(data => new Shroud(data));
    this.backgrounds = this.data.background.map(data => new Background(data));
    this.walls       = this.data.walls.map(data => new Wall(data));
    this.collisions  = this.data.collision.map(data => new Collision(data));
    this.items       = this.data.item.map(data => new Chest(data));
    this.hands_pad   = this.data.hands_pad.map(data => new Trigger_Pad(data));
    this.pop_up_pads = this.data.pop_up_pad.map(data => new Trigger_Pad(data));
    this.border      = this.data.border.map(data => new Border(data));
    this.hill_area   = this.data.hill_area.map(data => new Trigger_Pad(data));

    this.birds_pad     = new Trigger_Pad(this.data.birds_pad[0]);
    this.roof_pad      = new Trigger_Pad(this.data.roof_pad[0]);
    this.bed           = new Chest(this.data.shrine[0]);
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

    this.crows     = this.data.birds.map(unit => new Crow(unit));
    this.stalkers  = this.data.prey.map(unit => new Stalker(unit, this.player));
    this.generator = this.iterate();

    pathfind.create_level_grid(this.data.grid[0]);
    this._set_sounds();
    this._set_elements();
    if(global.env === 'dev') this._set_dev_settings();
  }

  _leave() {
    Nightmare.off();
    this.player.destroy();
    Level_Factory.create('intro');
  }

  _set_sounds() {
    this.theme_song = sound.find('start_theme');
    this.theme_song.volume = 0.05;
    this.eerie_song = sound.find('eerie_ambient');

    this.suspense_effect = sound.find('suspense_in');
    this.click_effect    = sound.find('click');
    this.honk_effect     = sound.find('honk');
    this.thud_1_effect   = sound.find('thud_1');
    this.whisper_effect  = sound.find('whisper_effect');
    this.whisper_effect.volume = 0.05;
  }

  _set_elements() {
    this.player.position.copy(this.data.player_spawn[1]);
    Camera.set_center(this.data.player_spawn[1]);

    this.controls_prompt.set_position(this.data.control_prompt[0]);
    this._start();
  }

  async * iterate() {
    Nightmare.on();
    this.data.gore_layer.forEach(item => new Floor(item));

    this.hands_pad.forEach(pad => pad.once('trigger', () => this.generator.next()));

    this.pop_up_triggered = false;
    this.pop_up_pads.forEach(pad => {
      pad.once('trigger', () => {
        if(this.pop_up_triggered) return;
        this.pop_up_triggered = true;
        this.generator.next();
      });
    });

    yield;
    pulse_sprites(this.data.blood_trail);

    yield;
    this.microphone_prompt.show();
    this.microphone_prompt.click = () => this.generator.next();

    yield;
    this.microphone_prompt.hide();

    collisions.removeChildren();
    shrouds.removeChildren();
    backgrounds.removeChildren();
    this.thud_1_effect.play();
    this.kill_him_word.position.copy(this.player);
    this.kill_him_word.fade_in_wait_out();

    let time_in = 400;
    this.stalkers.forEach(unit => {
      setTimeout(() => {
        unit.floor_hands = true;
        unit.logic_start();
      },time_in);
      time_in += 1000;
    });
    this.honk_effect.play();
    this.whisper_effect.play();

    yield;
    roofs.removeChildren();
    this.stalkers.forEach(unit => unit.remove());
    this.microphone_prompt.hide();
    this.whisper_effect.stop();
    sound.play('thud_4');

    yield * this.script.generator();
    this._leave();
  }

  _start() {
    this.theme_song.play();
    flash_at(this.player, 4000, 0xffffff);
    this.controls_prompt.fade_in(8000);

    let volume = 0;
    this.player.vitals.events.on('hit', () => {
      flash_at(this.player, 300);
      volume += 0.04;
      const thud = sound.random_sound_from(['thud_2','thud_3','thud_5','thud_6','thud_7']);
      thud.volume = volume;
      thud.play();
    });
    this.player.vitals.events.on('killed', () => this.generator.next());

    this.bed.once('click', async () => {
      this.suspense_effect.play();
      this.eerie_song.play();
      this.theme_song.stop();
      this.bed.remove();

      flash_at(this.player, 1590);
      await sleep(1490);

      this.click_effect.play();

      flash_at(this.player, 200);
      this.generator.next();
    });

    this.script.button.on('mousedown', () => {
      this.script.button.tint = 0xffffff;
      this.generator.next();
    });

    this.birds_pad.once('trigger', () => {
      this.crows.forEach(unit => {
        unit.delay = random_bound(0, 500);
        unit.start();
      });
    });

    this.bed.interactive = false;
    this.roof_pad.once('trigger', () => {
      this.bed.interactive = true;
      const hut_roof = this.roofs.find(entities => entities.id === 663);

      Fade.out_destroy(hut_roof);
    });

    keyboardManager.on('pressed', event => {
      if(this.controls_prompt.complete) {
        keyboardManager.removeListener('pressed');
      }

      this.controls_prompt.press(event);
    });
  }

  _set_dev_settings() {
    this.theme_song.volume      = 0.005;
    this.eerie_song.volume      = 0.01;
    this.suspense_effect.volume = 0.01;
    this.click_effect.volume    = 0.1;
    this.microphone_prompt.opacity = 0;

    keyboardManager.on('released', event => {
      if(event === 13) this.generator.next();
    });

    this.player.position.copy(this.data.player_spawn[0]);
    this.player.vitals.speed = 30;
    Camera.set_center(this.data.player_spawn[0]);

    this.controls_prompt.set_position(this.data.control_prompt[0]);
  }
}

module.exports = {
  Start_Room,
};
