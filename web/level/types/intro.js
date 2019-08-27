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
    this.shrouds     = this.data.shroud.map(data => new Shroud(data));
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


    this.locked_door       = this.doors.find(door => door.id === 528);

    this.study_door        = this.doors.find(door => door.id === 527);

    this.bathroom_door     = this.doors.find(door => door.id === 590);
    this.bathroom_shroud   = this.shrouds.find(shroud => shroud.id === 464);

    this.shadow = new Raycast(this.player, {
      border:       this.data.shadow_area[0],
      obstructions: this.walls,
    });

    this.exit_door         = this.doors.find(door => door.id === 619);
    this.spear             = this.items.find(item => item.id === 601);
    this.key               = this.items.find(item => item.id === 618);

    this._bedroom();
    this._set_sounds();
    this._set_elements();
    this._set_cutscene();
    if(env.dev) this._set_dev_settings();
  }

  _main_room() {
    const shroud  = this.shrouds.find(shroud => shroud.id === 462);
    const roof   = this.roofs.find(roof => roof.id === 509);
    shroud.fade_out(5000);

    const light = this.lamps.find(light => light.id === 614);
    light.flicker_for(3000*3);
    light.events.on('on', ()  => {
      shroud.alpha = 0;
      roof.alpha = 0;
    });
    light.events.on('off', () => {
      shroud.alpha = 0.3;
      roof.alpha = 0;
    });
  }

  _bedroom(bool) {
    const shroud = this.shrouds.find(shroud => shroud.id === 617);
    shroud.fade_out(1000);
    if(bool) shroud.destroy();
  }

  _kitchen() {
    const shroud = this.shrouds.find(shroud => shroud.id === 463);
    const roof   = this.roofs.find(roof => roof.id === 511);
    const light  = this.lamps.find(light => light.id === 613);

    shroud.fade_out(amount*4);
    light.flicker_for(3000);
    light.events.on('on', () => {
      shroud.alpha = 0.3;
      roof.alpha = 0;
    });

    light.events.on('off', () => {
      shroud.alpha = 0.3;
      roof.alpha = 0;
    });
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
    viewport.on('mousemove', ({data}) => {
      const mouse_point = data.global;
      if(this.shadow.contains(mouse_point)) {
        viewport.interactiveChildren = true;
        return;
      }

      viewport.interactiveChildren = false;
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

    this.bathroom_door.once('click', () => this.bathroom_shroud.fade_out());

    this.generator.click = () => {
      const fuel_item = this.player.inventory.take_by_name('oil_canister');
      if(!fuel_item) return;
      keyboardManager.disable();

      ProgressBar
        .show()
        .to_percentage(fuel_item.condition)
        .complete(() => {
          Caption.render('The canister is empty.');
          this.generator.ready();
          this.generator.fuel = fuel_item.condition;

          keyboardManager.enable();
        });
    };

    this.generator.end(() => {
      this.living_room_light.turn_off();
      this.kitchen_light.turn_off();
    });

    this.locked_door
      .lock()
      .once('click', function() {
        Caption.render('I cant get in');
        this.inactive();
      });

    this.spear.once('click', () => this.dramatic_beat.play());
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
