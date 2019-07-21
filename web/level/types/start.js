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

//const { MicrophonePopUp } = require('../../view/microphone_box');
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

class MicrophonePrompt {
  constructor() {
    this.website_text = new Text('www.google.com want to:', {fontSize: 50});
    this.prompt_text = new Text('Use your microphone', {fontSize: 50});
    this.microphone_icon = new Sprite.fromFrame('microphone');
    this.allow_button = new Sprite.fromFrame('allow_button');
    this.allow_button_2 = new Sprite.fromFrame('allow_button');
    this.background = new Sprite(Texture.WHITE);

    this._set_position();
    //this._render();
  }

  _set_position() {
    this.website_text.x += 20;
    this.website_text.y += 20;
    this.website_text.width /= 2.5;
    this.website_text.height /= 2.5;

    this.prompt_text.x += 70;
    this.prompt_text.y += 65;
    this.prompt_text.width /= 2.7;
    this.prompt_text.height /= 2.7;

    this.microphone_icon.x += 20;
    this.microphone_icon.y += 60;
    this.microphone_icon.width /= 2.7;
    this.microphone_icon.height /= 2.7;

    this.allow_button.x += 385;
    this.allow_button.y += 150;
    this.allow_button.width /= 2.7;
    this.allow_button.height /= 2.7;
    this.allow_button.interactive = true;
    this.allow_button.on('mouseover', () => {
      this.allow_button.tint = 0xff0000;
    });

    this.allow_button.on('mouseout', () => {
      this.allow_button.tint = 0xffffff;
    });

    this.allow_button_2.x += 280;
    this.allow_button_2.y += 150;
    this.allow_button_2.width /= 2.7;
    this.allow_button_2.height /= 2.7;
    this.allow_button_2.interactive = true;
    this.allow_button_2.on('mouseover', () => {
      this.allow_button_2.tint = 0xff0000;
    });

    this.allow_button_2.on('mouseout', () => {
      this.allow_button_2.tint = 0xffffff;
    });

    this.background.width = 500;
    this.background.height = 200;
  }

  destroy() {
    this.website_text.destroy();
    this.prompt_text.destroy();
    this.microphone_icon.destroy();
    this.allow_button.destroy();
    this.allow_button_2.destroy();
    this.background.destroy();
  }

  render() {
    stage.addChild(
      this.background,
      this.microphone_icon,
      this.website_text,
      this.prompt_text,
      this.allow_button,
      this.allow_button_2
    );
  }
}

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
    console.log(players.children[0]);
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
    const video_sprite = new Sprite(video_textures);
    video_sprite.anchor.set(0.5);
    video_sprite.position.copy(this.player);
    video_sprite.width = screen.width;
    video_sprite.height = screen.height;
    shrouds.addChild(video_sprite);

    await sleep(11450);
    const bar = new Text('DEAD SET ON LIFE', {fontSize: 200,fill: 'white'});
    bar.width = 1300;
    bar.height = 180;
    bar.anchor.set(0.5);
    bar.position.copy(this.player);
    shrouds.addChild(bar);
    await sleep(8000);
    bar.destroy();

    console.log(video_textures);
    const bar2 = new Text('LORIUM IPSUM', {fontSize: 200, fill: 'white'});
    bar2.width = 1000;
    bar2.height = 180;
    bar2.anchor.set(0.5);
    bar2.position.copy(this.player);
    shrouds.addChild(bar2);

    flash_at(this.player, 15000, 0x000000, 'in');
    await sleep(15000);
    video_sprite.destroy();
    bar2.destroy();
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
    this.microphone_prompt.allow_button.click = () => {
      this.generator.next();
      interaction.cursorStyles.pointer = 'url(), auto';
      cursor.alpha = 0;
      tween.remove();
    };

    tween.time = 7000;
    tween.to({x: this.microphone_prompt.allow_button.x, y: this.microphone_prompt.allow_button.y});
    tween.start();

    const { interaction } = renderer.plugins;

    tween.on('end', () => {
      interaction.cursorStyles.pointer = 'url(), auto';
      cursor.destroy();
      this.generator.next();
    });

    interaction.cursorStyles.pointer = "url('/dot.png'), auto";
    world.interactive = true;
    world.cursor = 'pointer';

    world.on('mousemove', event => {
      tween.from(event.data.global);
    });

    yield;
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
    const intro_white = fill_screen_at(this.player, 0xffffff);
    intro_white.delay = 2000;
    intro_white.fade_out(3000);

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
      this.script.button.tint = 0xffffff;
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
