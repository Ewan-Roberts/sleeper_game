const { visuals } = require('../../engine/pixi_containers');

const { sound, filters  } = require('pixi.js');
const { keyboardManager } = require('pixi.js');
const { Sprite } = require('pixi.js');
const { Texture } = require('pixi.js');
const { Graphics } = require('pixi.js');

const { renderer   } = require('../../engine/app.js');
const { Click_Pad  } = require('../elements/click_pad');
const { Button     } = require('../../view/button');
const { Caption    } = require('../../view/caption');
const { players    } = require('../../engine/pixi_containers');
const { Tween      } = require('../../engine/tween');
const { viewport   } = require('../../engine/app');
const { FadeSprite } = require('../../effects/fade_sprite.js');
const { flash_at   } = require('../../effects/fade_sprite.js');
const { env        } = require('../../../config');
const { random_bound } = require('../../utils/math.js');
const { sleep    } = require('../../utils/time.js');
const { ProgressBar   } = require('../../view/progress_bar');
const { Raycast } = require('../../engine/raycast');
const { collisions    } = require('../../engine/pixi_containers');

const {
  Trigger_Pad,
  Wall,
  Decal,
  Background,
  Chest,
  Roof,
  Door,
  Shroud,
  Collision,
  Floor,
  Generator,
  Light,
} = require('../elements');

const amount = 3000;

class IntroRoom {
  constructor() {
    this.name   = 'intro_room';
    this.data   = require('../data/intro_room.json');
    this.player = players.children[0];

    this.backgrounds = this.data.background.map(data => new Background(data));
    //this.shrouds     = this.data.shroud.map(data => new Shroud(data));
    this.roofs       = this.data.roof.map(data => new Roof(data));
    this.collisions  = this.data.collision.map(data => new Collision(data));
    this.floors      = this.data.floor.map(data => new Floor(data));
    this.decals      = this.data.decal.map(data => new Decal(data));
    this.doors       = this.data.door.map(data => new Door(data));
    this.exit_pad    = this.data.exit_pad.map(data => new Trigger_Pad(data));
    this.walls       = this.data.walls.map(data => new Wall(data));
    this.items       = this.data.item.map(data => new Chest(data));
    this.lamps       = this.data.lights.map(data => new Light(data));

    this.generator   = new Generator(this.data.generator[0]);
    this.shadow      = new Raycast(this.player, {
      border:       this.data.shadow_area[0],
      obstructions: this.walls,
    });

    this.locked_door       = this.doors.find(door => door.id === 528);
    this.study_door        = this.doors.find(door => door.id === 527);
    this.bathroom_door     = this.doors.find(door => door.id === 590);
    this.exit_door         = this.doors.find(door => door.id === 619);

    this.spear             = this.items.find(item => item.id === 601);
    this.key               = this.items.find(item => item.id === 618);

    this._set_sounds();
    this._set_elements();
    this._set_cutscene();
    if(env.dev) this._set_dev_settings();
  }

  _main_room() {
    const main_roof    = this.roofs.find(roof => roof.id === 509);
    const bedroom_roof = this.roofs.find(roof => roof.id === 508);

    const light = this.lamps.find(light => light.id === 614);
    light.flicker_for(3000*3);
    light.events.on('on', ()  => {
      main_roof.alpha = 0.3;
      bedroom_roof.alpha = 0.3;
    });
    light.events.on('off', () => {
      main_roof.alpha = 0.5;
      bedroom_roof.alpha = 0.5;
    });
  }

  _kitchen() {
    const roof  = this.roofs.find(roof => roof.id === 511);
    const light = this.lamps.find(light => light.id === 613);

    light.flicker_for(3000);
    light.events.on('on', () => roof.alpha = 0.3);
    light.events.on('off', () => roof.alpha = 0.5);
  }

  _set_cutscene() {
    const white_filter = new filters.ColorMatrixFilter();
    white_filter.greyscale(3);

    const hand = new FadeSprite(this.data.white_hands[0]);
    hand.filters = [white_filter];
    hand.fade_in_wait_out(100, 500, 4000);
    visuals.addChild(hand);

    keyboardManager.disable();
    setTimeout(() => keyboardManager.enable(), 5000);
  }

  _set_sounds() {
    this.theme_song = sound.find('start_theme');
    this.theme_song.volume = 0.01;

    this.dramatic_beat = sound.find('dramatic_beat');
    this.dramatic_beat.volume = 0.3;

    this.keys_effect = sound.find('keys_jingle');
    this.keys_effect.volume = 0.2;
  }

  _set_elements() {
    this.theme_song.play();

    const spawn_point = this.data.player_spawn.find(spawn=>spawn.id===137);
    this.player.position.copy(spawn_point);

    viewport.moveCenter(this.player.x, this.player.y);
    viewport.on('mousemove', (
      { data: { global } }
    ) => {
      const mouse_is_in_shadows = this.shadow.contains(global);
      viewport.interactiveChildren = mouse_is_in_shadows;
    });

    this.study_door.once('click', () => {
      Caption.render('The generator is almost out of fuel. There is a car to the North');
      this._kitchen();
      this._main_room();
      this.shadow.alpha = 0.5;
    });

    this.exit_door
      .lock()
      .click = () => {
        const keys_for_door = this.player.inventory.take_by_name('keys_brass');
        if(keys_for_door) {
          this.exit_door
            .unlock()
            .open();
        }
      };

    this.generator
      .disable()
      .click = () => Caption.render('I need to fill this up...');

    this.locked_door
      .lock()
      .once('click', function() {
        Caption.render('I cant get in');
        this.inactive();
      });

    this.spear
      .once('click', () => this.dramatic_beat.play());
  }

  _set_dev_settings() {
    const spawn_point = this.data.player_spawn.find(spawn=>spawn.id===564);
    this.player.position.copy(spawn_point);
    viewport.moveCenter(this.player.x, this.player.y);

    this.theme_song.stop();
    this.key.click = () => console.log(this.player.inventory);

    this.study_door.position.x   += 40;
    this.study_door.interactive  = true;
    keyboardManager.enable();
  }
}


module.exports = {
  IntroRoom,
};
