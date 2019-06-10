'use strict';

const { pathfind        } = require('../../engine/pathfind.js');
const { Camera } = require('../../engine/camera.js');
const { sleep            } = require('../../utils/time.js');
const world               = require('../../engine/app.js');
const { roofs  } = require('../../engine/pixi_containers.js');
const { decals } = require('../../engine/pixi_containers.js');
const { backgrounds  } = require('../../engine/pixi_containers.js');
const { collisions  } = require('../../engine/pixi_containers.js');
const { shrouds  } = require('../../engine/pixi_containers.js');

const { sound,keyboardManager, filters} = require('pixi.js');
const { FloorWord } = require('../../effects/floor_word.js');
const { pulse_sprites, FadeSprite, flash_at } = require('../../effects/fade_sprite.js');
const { Tiled_Data      } = require('../attributes/parse_tiled_data');
const { Trigger_Pad     } = require('../elements/pad');
const { Floor } = require('../elements/floor');
const { Chest           } = require('../elements/chest');
const { Decal           } = require('../elements/decals');
const { MicrophonePopUp } = require('../../view/microphone_box');
const { KeyboardKey     } = require('../../view/key');
const { Stalker         } = require('../../character/archetypes/stalker');
const { Eye             } = require('../../character/animations/eye');
const { Player          } = require('../../character/archetypes/player');
const { Crow            } = require('../../character/archetypes/crow');
const { Level_Factory   } = require('./level_factory');
const level_data          = require('../data/start.json');

global.dev();
function switch_to_nightmare() {
  const colorMatrix = new filters.ColorMatrixFilter();
  colorMatrix.autoFit = true;
  colorMatrix.greyscale(4);

  decals.filters = [colorMatrix];
  roofs.children.forEach(roof => roof.tint = 0x000000);
  world.renderer.backgroundColor = 0xff0000;
}

class WASD {
  constructor() {
    this.w_letter = new KeyboardKey('W');
    this.a_letter = new KeyboardKey('A');
    this.s_letter = new KeyboardKey('S');
    this.d_letter = new KeyboardKey('D');
  }

  fade_in(time) {
    this.w_letter.fade_in(time);
    this.a_letter.fade_in(time);
    this.s_letter.fade_in(time);
    this.d_letter.fade_in(time);
  }

  set_position(point) {
    this.w_letter.position.copy({
      x: point.x,
      y: point.y-50,
    });
    this.a_letter.position.copy({
      x: point.x-50,
      y: point.y,
    });
    this.s_letter.position.copy(point);
    this.d_letter.position.copy({
      x: point.x+50,
      y: point.y,
    });
  }

  press(key) {
    switch (key) {
      case 'w': this.w_letter.press(); return;
      case 'a': this.a_letter.press(); return;
      case 's': this.s_letter.press(); return;
      case 'd': this.d_letter.press(); return;
    }
  }

  get all_pressed() {
    return (
      this.w_letter.pressed &&
      this.a_letter.pressed &&
      this.s_letter.pressed &&
      this.d_letter.pressed
    );
  }
}

class Start_Room  {
  constructor() {
    this.name     = 'defend_room';
    this.player   = new Player();
    this.elements = new Tiled_Data(level_data);

    this._set_sounds();
    this._set_elements();
  }

  async _eye_render() {
    this.static_effect.play();
    this.eye = new Eye(this.player);
    world.renderer.backgroundColor = 0x000000;

    await sleep(2000);
    decals.removeChildren();
    this.static_effect.stop();

    this._leave();
  }

  _leave() {
    this.click_effect.play();

    decals.filters = [];
    Level_Factory.create({properties: {
      level_name: 'intro',
    }}, this.player);
  }

  _set_sounds() {
    this.theme_song    = sound.find('start_theme');
    this.eerie_ambient = sound.find('eerie_ambient');

    this.suspense_effect = sound.find('suspense_in');
    this.click_effect    = sound.find('click');
    this.static_effect   = sound.find('static_effect');
    this.static_effect.volume   = 0.001;

    if(global.env === 'dev') {
      this.theme_song.volume      = 0.1;
      this.eerie_ambient.volume   = 0.01;
      this.static_effect.volume   = 0.001;

      this.suspense_effect.volume = 0.01;
      this.click_effect.volume    = 0.1;
    }
  }

  async * iterate() {
    switch_to_nightmare();

    this.elements.gore_layer.forEach(item => new Floor(item));
    this.elements.roots.forEach(item => new Decal(item));

    this.iterator_pads.forEach(pad => {
      pad.once('trigger', () => {
        pad.destroy();
        this.generator.next();
      });
    });

    yield;
    pulse_sprites(this.elements.blood_trail);

    yield;
    this.microphone_prompt.show();
    this.microphone_prompt.click = () => {
      this.microphone_prompt.hide();
      this.generator.next();
    };

    yield;
    backgrounds.removeChildren();
    collisions.removeChildren();
    shrouds.removeChildren();
    const four = new FloorWord({
      font_size: 200,
      rotation:  15,
      fill:      'white',
      weight:    'bolder',
      text:      'KILL',
    });
    four.position.copy(this.player);
    four.fade_in_wait_out();

    let time_in = 200;
    this.stalkers.forEach(unit => {
      setTimeout(() => {
        unit.talk();
        sound.play('honk');
        unit.floor_hands = true;
        unit.logic_start();
      },time_in);

      time_in += 512;
    });
    yield;
    await this._eye_render();
    yield;
    this._leave();
    //new Array(10).fill().forEach(() => random_word(play,80,200,200,1000));
    yield;
  }

  _set_elements() {
    Level_Factory.generate(this.elements);

    const {
      exit_pad,
      trigger_enemies,
      shrine,
      birds,
      prey,
      grid,
      player,
      flower,
    } = this.elements;

    if(global.env === 'dev') {
      this.player.position.copy(player[0]);
    } else {
      this.player.position.copy(player[1]);
      Camera.set_center(player[1]);
    }

    this.crows = birds.map(unit => {
      const bird = new Crow(unit);
      bird.path = unit.polyline.map(({x,y})=>({x:unit.x+x, y:unit.y+y}));
      bird.turn = true;
      return bird;
    });

    this.controls_prompt = new WASD();
    this.controls_prompt.set_position(this.player);

    this.exit_pads     = exit_pad.map(data => new Trigger_Pad(data));
    this.iterator_pads = trigger_enemies.map(data => new Trigger_Pad(data));
    this.flower        = new FadeSprite(flower[0]);

    this.bed = new Chest(shrine[0]);
    this.microphone_prompt = new MicrophonePopUp();

    this.stalkers = prey.map(unit => {
      const stalker = new Stalker(unit);
      stalker.target(this.player);
      return stalker;
    });

    pathfind.create_level_grid(grid[0]);

    this.generator = this.iterate();
    this._start();
  }

  _start() {
    this.theme_song.play();
    this.crows.forEach(unit => unit.start());
    this.controls_prompt.fade_in(3000);
    this.flower.fade_out(10000);

    this.bed.once('click', async () => {
      this.suspense_effect.play();
      this.eerie_ambient.play();

      flash_at(this.player, 1590);
      await sleep(1490);

      this.click_effect.play();
      this.theme_song.stop();

      await sleep(100);
      this.generator.next();
      this.bed.remove();
    });
    console.log(this.player);
    this.player.vitals.events.on('killed', () => this.generator.next());
    this.exit_pads.forEach(pad => {
      pad.once('trigger', () => {
        switch_to_nightmare();

        flash_at(this.player);
        this.stalkers.forEach(unit => {
          unit.floor_hands = true;
          unit.logic_start();
        });
      });
    });

    keyboardManager.on('pressed', event => {
      if(event === 13 && this.controls_prompt.all_pressed) this.generator.next();

      if(event === 87) this.controls_prompt.press('w');
      if(event === 65) this.controls_prompt.press('a');
      if(event === 83) this.controls_prompt.press('s');
      if(event === 68) this.controls_prompt.press('d');
    });
  }
}

module.exports = {
  Start_Room,
};
