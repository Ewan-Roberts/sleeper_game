const { pathfind    } = require('../../engine/pathfind.js');
const { screen    } = require('../../engine/app');
const { renderer } = require('../../engine/app');
const { stage } = require('../../engine/app');
const { roofs       } = require('../../engine/pixi_containers.js');
const { world        } = require('../../engine/shadows');
const { backgrounds } = require('../../engine/pixi_containers.js');
const { collisions  } = require('../../engine/pixi_containers.js');
const { shrouds     } = require('../../engine/pixi_containers.js');
const { players     } = require('../../engine/pixi_containers');
const { Player     } = require('../../character/archetypes/player');

const { sleep        } = require('../../utils/time.js');
const { random_bound } = require('../../utils/math.js');

const { Overlay_Dialog } = require('../../effects/overlay_dialog.js');
const { Fade           } = require('../../effects/fade.js');
const { Nightmare      } = require('../../effects/nightmare.js');
const { pulse_sprites, FadeSprite  } = require('../../effects/fade_sprite.js');
const { flash_at, fill_screen_at } = require('../../effects/fade_sprite.js');
const { random_word    } = require('../../effects/floor_word.js');

const { MicrophonePrompt } = require('../../view/microphone_box');
const { WASD            } = require('../../view/wasd_keys');
const { Stalker         } = require('../../character/archetypes/logic_stalker');
const { PathCrow        } = require('../../character/archetypes/path_crow');
const { keyboardManager } = require('pixi.js');
const { tweenManager } = require('pixi.js');
const { sound           } = require('pixi.js');
const { Text } = require('pixi.js');
const { Sprite } = require('pixi.js');
const { Texture } = require('pixi.js');
const { Level_Factory   } = require('./level_factory');
const { env             } = require('../../../config');

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
    this.player = players.children[0];

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

    this.birds_pad = new Trigger_Pad(this.data.birds_pad[0]);
    this.roof_pad  = new Trigger_Pad(this.data.roof_pad[0]);
    this.bed       = new Chest(this.data.shrine[0]);

    this.controls_prompt   = new WASD();
    this.microphone_prompt = new MicrophonePrompt();
    this.script            = new Overlay_Dialog([
      '...',
      '...lets try...',
      'survive this time...',
      'on this lovely day',
    ], this.player);

    this.crows     = this.data.birds.map(unit => new PathCrow(unit));
    this.stalkers  = this.data.prey.map(unit => new Stalker(unit, this.player));
    this.generator = this.iterate();

    pathfind.create_level_grid(this.data.grid[0]);
    this._set_sounds();
    this._set_elements();
    this._start();
    if(env.dev) this._set_dev_settings();
  }

  async _leave() {
    Nightmare.off();

    this.thud_1_effect.play();
    await sleep(300);

    const video_textures = Texture.fromVideo('/video.mp4');
    const video_sprite   = new Sprite(video_textures);
    video_sprite.width   = screen.width;
    video_sprite.height  = screen.height;
    video_sprite.anchor.set(0.5);
    video_sprite.position.copy(this.player);
    shrouds.addChild(video_sprite);

    await sleep(11450);

    const game_title  = new Text(
      'DEAD SET ON LIFE', {
        fontSize: 200,
        fill: 'white',
      });
    game_title.width  = 1300;
    game_title.height = 180;
    game_title.anchor.set(0.5);
    game_title.position.copy(this.player);
    shrouds.addChild(game_title);

    await sleep(8000);

    game_title.destroy();
    const company_name  = new Text(
      'LORIUM IPSUM', {
        fontSize: 200,
        fill: 'white',
      });
    company_name.width  = 1000;
    company_name.height = 180;
    company_name.anchor.set(0.5);
    company_name.position.copy(this.player);
    shrouds.addChild(company_name);

    flash_at(this.player, 15000, 0x000000, 'in');

    await sleep(15000);

    video_textures.destroy();
    video_sprite.destroy();
    company_name.destroy();
    Level_Factory.create('intro');
  }

  _set_sounds() {
    this.theme_song = sound.find('start_theme');
    this.theme_song.volume = 0.05;
    this.eerie_song = sound.find('eerie_ambient');
    this.eerie_song.volume = 0.2;
    this.horror_song = sound.find('horror_theme');
    this.horror_song.volume = 0.08;

    this.suspense_effect = sound.find('suspense_in');
    this.suspense_effect.volume = 0.03;
    this.click_effect    = sound.find('click');
    this.click_effect.volume = 0.04;
    this.honk_effect     = sound.find('honk');
    this.honk_effect.volume = 1;
    this.thud_1_effect   = sound.find('thud_1');
    this.whisper_effect  = sound.find('whisper_effect');
    this.whisper_effect.volume = 0.05;
  }

  _set_elements() {
    this.player.position.copy(this.data.player_spawn[1]);
    keyboardManager.enable();

    this.controls_prompt.set_position(this.data.control_prompt[0]);
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

    const cursor = new Sprite.fromFrame('cursor');
    cursor.width /= 10;
    cursor.height /= 10;
    stage.addChild(cursor);

    const tween = tweenManager.createTween(cursor);
    cursor.position.copy({
      x: this.player.x + 100,
      y: this.player.y + 100,
    });

    this.microphone_prompt.render();
    this.microphone_prompt.allow_button.click = () => this.generator.next();
    this.microphone_prompt.allow_button_2.click = () => this.generator.next();

    tween.time = 7000;
    tween.to({x: this.microphone_prompt.allow_button.x, y: this.microphone_prompt.allow_button.y});
    tween.start();

    const { interaction } = renderer.plugins;

    tween.on('end', () => this.generator.next());

    interaction.cursorStyles.pointer = "url('/dot.png'), auto";
    world.interactive = true;
    world.cursor = 'pointer';

    world.on('mousemove', ({data}) => tween.from(data.global));

    yield;
    tween.remove();
    cursor.destroy();
    interaction.cursorStyles.pointer = 'url(), auto';

    this.microphone_prompt.destroy();

    collisions.removeChildren();
    shrouds.removeChildren();
    backgrounds.removeChildren();
    Array(100).fill().forEach(()=> random_word({
      point: this.player,
      size: 150,
      closeness: 700,
      text: ['RUN!','RUN','RUN','DIE'],
    }));

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
    this.horror_song.play();

    yield;
    roofs.removeChildren();
    this.stalkers.forEach(unit => unit.remove());
    sound.stopAll();

    yield * this.script.generator();
    this._leave();
  }

  async _start() {
    this.theme_song.play();
    keyboardManager.disable();
    flash_at(this.player, 2000, 0xffffff, 'out');

    await sleep(5000);
    this.controls_prompt.fade_in(2000);
    await sleep(1000);

    keyboardManager.enable();

    let volume = 0;
    let distortion_amount = 0;
    const distortion_filter = new sound.filters.DistortionFilter();

    this.player.events.on('hit', () => {
      flash_at(this.player, 500);

      volume += 0.07;
      distortion_amount += 0.02;

      distortion_filter.amount = distortion_amount;

      const thud   = sound.random_sound_from(['thud_2','thud_3','thud_5','thud_6','thud_7']);
      thud.filters = [distortion_filter];
      thud.volume  = volume;
      thud.play();

      this.whisper_effect.volume = volume + 0.02;
    });

    this.player.events.once('killed', () => this.generator.next());

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
      this.generator.next();
    });

    this.birds_pad.once('trigger', () => {
      this.crows.forEach(unit => {
        unit.talk();
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
    this.theme_song.volume      = 0.05;
    this.eerie_song.volume      = 0.01;
    this.suspense_effect.volume = 0.01;
    this.click_effect.volume    = 0.1;
    this.microphone_prompt.opacity = 0;

    keyboardManager.on('released', event => {
      if(event === 13) this.generator.next();
      if(event === 32) this._leave();
    });
    keyboardManager.enable();

    this.player.position.copy(this.data.player_spawn[0]);

    this.controls_prompt.set_position(this.data.control_prompt[0]);
  }
}

module.exports = {
  Start_Room,
};
