const { visuals         } = require('../../engine/pixi_containers');
const { sound, filters  } = require('pixi.js');
const { keyboardManager } = require('pixi.js');
const { Caption         } = require('../../view/caption');
const { players         } = require('../../engine/pixi_containers');
const { viewport        } = require('../../engine/app');
const { FadeSprite      } = require('../../effects/fade_sprite.js');
const { env             } = require('../../../config');
const { Raycast         } = require('../../engine/raycast');
const first = true;
const data = require('../data/intro_room.json');
data.states = {
  'start_cutscene': false,
};

const {
  Trigger_Pad,
  Wall,
  Decal,
  Background,
  Chest,
  Roof,
  Door,
  Collision,
  Floor,
  Generator,
  Light,
} = require('../elements');

class IntroRoom {
  constructor() {
    this.name   = 'intro_room';
    this.player = players.children[0];

    this.backgrounds = data.background.map(elem => new Background(elem));
    this.roofs       = data.roof.map(elem => new Roof(elem));
    this.collisions  = data.collision.map(elem => new Collision(elem));
    this.floors      = data.floor.map(elem => new Floor(elem));
    this.decals      = data.decal.map(elem => new Decal(elem));
    this.doors       = data.door.map(elem => new Door(elem));
    this.exit_pad    = data.exit_pad.map(elem => new Trigger_Pad(elem));
    this.walls       = data.walls.map(elem => new Wall(elem));
    this.items       = data.item.map(elem => new Chest(elem));
    this.lamps       = data.lights.map(elem => new Light(elem));

    this.generator   = new Generator(data.generator[0]);
    this.shadow      = new Raycast(this.player, {
      'border'      : data.shadow_area[0],
      'obstructions': this.walls,
    });

    this.locked_door       = this.doors.find(door => door.id === 528);
    this.study_door        = this.doors.find(door => door.id === 527);
    this.bathroom_door     = this.doors.find(door => door.id === 590);
    this.exit_door         = this.doors.find(door => door.id === 619);

    this.spear             = this.items.find(item => item.id === 601);
    this.key               = this.items.find(item => item.id === 618);
    this.can               = this.items.find(item => item.id === 602);

    this.light = this.lamps.find(light => light.id === 614);

    this._set_sounds();
    this._set_elements();
    if(!data.states.start_cutscene) {
      this._set_cutscene();
      data.states.start_cutscene = true;
      const spawn_point = data.player_spawn.find(spawn => spawn.id === 564);
      this.player.position.copy(spawn_point);
      viewport.moveCenter(this.player.x, this.player.y);
    } else {
      this._main_room();
      this.light.turn_on();
      this.shadow.alpha = 0.5;
      this.spear.destroy();
      this.key.destroy();
      this.can.destroy();
      this.study_door.rotation = -90;
      this.study_door.interactive = false;
      this.exit_door.interactive = false;
      this.exit_door.rotation = -90;
    }

    if(env.dev) {
      this._set_dev_settings();
    }
  }

  _main_room() {
    const main_roof    = this.roofs.find(roof => roof.id === 509);
    const bedroom_roof = this.roofs.find(roof => roof.id === 508);
    const roof         = this.roofs.find(roof => roof.id === 511);

    const kitchen_light = this.lamps.find(light => light.id === 613);
    const living_room_light = this.lamps.find(light => light.id === 615);
    this.light.events.on('on', ()  => {
      kitchen_light.turn_on();
      living_room_light.turn_on();
      main_roof.alpha = 0.3;
      bedroom_roof.alpha = 0.3;
      roof.alpha = 0.3;
    });
    this.light.events.on('off', () => {
      kitchen_light.turn_off();
      living_room_light.turn_off();
      main_roof.alpha = 0.5;
      bedroom_roof.alpha = 0.5;
      roof.alpha = 0.5;
    });
  }

  _set_cutscene() {
    const white_filter = new filters.ColorMatrixFilter();
    white_filter.greyscale(3);

    this.shadow.alpha = 0.9;
    const hand = new FadeSprite(data.white_hands[0]);
    hand.filters = [ white_filter ];
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
    // const spawn_point = this.data.player_spawn.find(spawn => spawn.id === 137);
    // this.player.position.copy(spawn_point);

    // viewport.moveCenter(this.player.x, this.player.y);
    viewport.on('mousemove', (
      { 'data': { global } }
    ) => {
      const mouse_is_in_shadows = this.shadow.contains(global);
      viewport.interactiveChildren = mouse_is_in_shadows;
    });

    this.study_door.once('click', () => {
      Caption.render('The generator is almost out of fuel. There is a car to the North');
      this._main_room();
      this.light.flicker_for(3000);
      this.shadow.alpha = 0.5;
      this.decals.find(decal => decal.id === 606).destroy();
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
