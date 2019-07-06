const { pathfind } = require('../../engine/pathfind.js');
const { Camera   } = require('../../engine/camera.js');
const { Dialog_Script } = require('../../engine/script_generator');
const { sleep    } = require('../../utils/time.js');
const { Caption   } = require('../../view/caption');

const { Overlay_Dialog } = require('../../effects/overlay_dialog.js');
const { Nightmare      } = require('../../effects/nightmare.js');
const { flash_at, fill_screen_at } = require('../../effects/fade_sprite.js');
const { LogicZombie   } = require('../../character/archetypes/logic_zombie');

//const { Stalker         } = require('../../character/archetypes/logic_stalker');
const { Player          } = require('../../character/archetypes/player');
const { keyboardManager } = require('pixi.js');
const { sound           } = require('pixi.js');
const { Level_Factory   } = require('./level_factory');

const {
  Wall,
  Decal,
  Background,
  Chest,
  Roof,
  Shroud,
  Collision,
  Floor,
} = require('../elements');

class Ranbir_Room  {
  constructor() {
    this.name   = 'ranbir_flat';
    this.data   = require('../data/ranbir_flat.json');
    this.player = new Player();

    this.decals      = this.data.decal.map(data => new Decal(data));
    this.floors      = this.data.floor.map(data => new Floor(data));
    this.roofs       = this.data.roof.map(data => new Roof(data));
    this.shrouds     = this.data.shroud.map(data => new Shroud(data));
    this.backgrounds = this.data.background.map(data => new Background(data));
    this.walls       = this.data.walls.map(data => new Wall(data));
    this.collisions  = this.data.collision.map(data => new Collision(data));
    this.items       = this.data.item.map(data => new Chest(data));

    this.script      = new Overlay_Dialog(['...','we shouldnt be here'], this.player);
    this.generator   = this.iterate('input');

    this.ranbir      = this.data.prey.map(unit => {
      const entity = new LogicZombie(unit);
      entity.target(this.player);
      return entity;
    })[0];

    this.ranbir_script = new Dialog_Script(
      [
        'welcome welcome',
        'come in my friend',
        'grab a seat',
      ],
      this.ranbir
    );



    // pathfind.create_level_grid(this.data.grid[0]);

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
    this.click_effect = sound.find('click');
    this.click_effect.volume = 0.1;
  }

  _set_elements() {
    this.player.position.copy(this.data.player_spawn[0]);
    Camera.set_center(this.data.player_spawn[0]);

    this._start();
  }

  *iterate() {
    Caption.render('We should go slow... Remember last time');
    yield;

    Caption.render('Let me know if you need a hand');
    yield * this.ranbir_script.generator();

    Caption.render('3333');
    yield;
  }

  async _start() {
    //console.log('here');
    //console.log(this.ranbir);

    //this.theme_song.play();
    //keyboardManager.disable();
    //const intro_white = fill_screen_at(this.player, 0xffffff);
    //intro_white.fade_out(1000);

    //this.ranbir.logic_start();

    //this.player.events.once('killed', () => this.generator.next());

    // this.script.button.on('mousedown', () => {
    //   this.script.button.tint = 0xffffff;
    //   this.generator.next();
    // });
  }

  _set_dev_settings() {
    keyboardManager.on('released', event => {
      if(event === 13) this.generator.next('hi');
    });

    keyboardManager.enable();

    this.player.vitals.speed = 30;
  }
}

module.exports = {
  Ranbir_Room,
};
