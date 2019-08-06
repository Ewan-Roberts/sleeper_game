const { renderer      } = require('../../engine/app');
//const { viewport      } = require('../../engine/app');
const { Dialog_Script } = require('../../engine/script_generator');
const { visuals       } = require('../../engine/pixi_containers');
const { sleep         } = require('../../utils/time.js');
const { random_bound  } = require('../../utils/math.js');
const { players      } = require('../../engine/pixi_containers');

const { Caption } = require('../../view/caption');

const { flash_at, fill_screen_at } = require('../../effects/fade_sprite.js');
const { LogicHuman    } = require('../../character/archetypes/logic_human');
const { Animation     } = require('../../character/attributes/animation');
const { zombie_frames } = require('../../character/animations/zombie');
const { Nightmare     } = require('../../effects/nightmare.js');

//const { Player          } = require('../../character/archetypes/player');
const { keyboardManager } = require('pixi.js');
const { sound           } = require('pixi.js');
const { filters         } = require('pixi.js');
const { Text } = require('pixi.js');
const { Level_Factory   } = require('./level_factory');
const { env             } = require('../../../config');

async function flicker(light) {
  const small = random_bound(-10, 10);
  const big = random_bound(-100, 100);

  await sleep(400+big);
  light.alpha = 0;

  await sleep(30+small);
  light.alpha = 1;

  await sleep(20+small);
  light.alpha = 0;

  await sleep(15+small);
  light.alpha = 1;

  await sleep(180+big);
  light.alpha = 0;

  await sleep(20+small);
  light.alpha = 1;

  await sleep(200+small);
  light.alpha = 0;

  // cube the randomixwe
  await sleep(9000+(big ** 2));

  await flicker(light);
}

const {
  Wall,
  Decal,
  Door,
  Background,
  Chest,
  Roof,
  Shroud,
  Collision,
  Floor,
  Trigger_Pad,
} = require('../elements');

// TODO put test above point is
class SpeechText extends Text {
  constructor(text) {
    super(text, {
      fill:   'white',
      weight: 'bolder',
    });

    this.anchor.set(0.5);
    this.alpha = 0.5;

    visuals.addChild(this);
  }
}

class Christina extends LogicHuman {
  constructor(data) {
    data.image_name = 'top_down_woman_00';
    super(data);
    this.script = this.script_iterator();
    this.current = new SpeechText('start');
    this.interactive = true;
    this.add_component(new Animation(this, zombie_frames));

    this._set_sound();
  }

  _set_sound() {
    this.weep_sound = sound.find('woman_weeping');
    this.weep_sound.volume = 0.5;

    this.attack_sound = sound.find('crazy_woman_repent');
    this.attack_sound.volume = 0.5;
  }

  render_text(value) {
    this.current.text = value;
    this.current.position.copy(this);
    this.current.y -= 50;
  }

  attack() {
    this.attack_sound.play();
    this.logic_start();
    this.end_script();
  }

  weep() {
    this.weep_sound.play();
  }

  * script_iterator() {
    this.current.text = 'one';
    this.current.position.copy(this);
    this.current.y -= 50;

    yield;

    this.current.text = 'two';
    this.current.position.copy(this);
    this.current.y -= 50;

    yield;

    this.current.text = 'three';
    this.current.position.copy(this);
    this.current.y -= 50;

    yield;
  }

  end_script() {
    this.script.return();
  }

}

class RanbirRoom  {
  constructor() {
    this.name   = 'ranbir_flat';
    this.data   = require('../data/ranbir_flat.json');
    this.player = players.children[0];

    renderer.backgroundColor = 0x000000;

    this.items          = this.data.item.map(data => new Chest(data));
    this.roofs          = this.data.roof.map(data => new Roof(data));
    this.shrouds        = this.data.shroud.map(data => new Shroud(data));
    this.backgrounds    = this.data.background.map(data => new Background(data));
    this.walls          = this.data.walls.map(data => new Wall(data));
    this.proximity_pads = this.data.proximity.map(data => new Trigger_Pad(data));
    this.doors          = this.data.door.map(data => new Door(data));
    this.exit_pad       = this.data.exit_pad.map(data => new Trigger_Pad(data));
    this.lights         = this.data.lights.map(data => new Decal(data));
    this.floors         = this.data.floor.map(data => new Floor(data));
    this.decals         = this.data.decal.map(data => new Decal(data));
    this.collisions     = this.data.collision.map(data => new Collision(data));

    const colourMatrix = new filters.ColorMatrixFilter();
    colourMatrix.saturate(2);
    this.lights.forEach(light => light.filters = [colourMatrix]);

    const christina_data  = this.data.prey.find(data => data.id === 280);
    this.christina        = new Christina(christina_data);
    this.weeping_pad      = this.exit_pad.find(pad => pad.id === 236);
    this.enter_room_pad   = this.exit_pad.find(pad => pad.id === 285);
    this.attack_pad       = this.exit_pad.find(pad => pad.id === 289);
    this.butcher_room_pad = this.exit_pad.find(pad => pad.id === 292);

    this.light_shroud = this.shrouds.find(roof => roof.id === 306);
    this.generator    = this.iterate('input');

    // pathfind.create_level_grid(this.data.grid[0]);

    this._set_sounds();
    this._set_elements();
    this._valkerie();
    //this._start();
    if(env.dev) this._set_dev_settings();
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

  _christina() {
    this.christina.target(this.player);
    this.butcher_room_pad.once('trigger', () => {
      this.christina.script.next();
      this.christina.render_text('Coming to player');

      this.christina.attack();
    });

    this.weeping_pad.once('trigger', () =>
      this.christina.script.next());

    this.enter_room_pad.once('trigger', () =>
      this.christina.script.next());

    this.attack_pad.once('trigger', () => {
      this.christina.interactive = true;
      this.christina.script.next();

      // second time the pad is entered
      const second_pad = new Trigger_Pad(this.enter_room_pad);
      second_pad.once('trigger', () =>
        this.christina.render_text('Coming to player'));

    });

    this.christina.click = () => {
      this.christina.script.next();

      this.christina.attack();
    };
  }

  async _set_elements() {
    Caption.render('Careful, lets go slow here');
    this.player.position.copy(this.data.player_spawn[0]);

    this.player.events.on('hit', () => {
      flash_at(this.player, 300);
      sound.play('thud_2');
    });

  }

  * iterate() {
    Caption.render('We should go slow... Keep our distance');
    //setInterval(() => this.ranbir_script.happy_iterator.next(),4000);
    //yield * this.ranbir_script.happy();

    Caption.render('3333');
    yield;
  }

  async _start() {
    keyboardManager.enable();
    const intro_white = fill_screen_at(this.player, 0xffffff);
    intro_white.fade_out(1000);
    //this.ranbir.logic_start();
    //this.player.events.once('killed', () => this.generator.next());
    flicker(this.light_shroud);
  }

  _ranbir() {
    this.ranbir = this.prey.find(unit => unit.id === 257);
    this.ranbir_script = new Dialog_Script(this.ranbir);

    this.sofa = this.items.find(item => item.id === 279);
    this.sofa.on('click', () => {
      this.ranbir_script.speech_iterator.next();
      keyboardManager.disable();
    });

    this.proximity_pads.forEach(pad => {
      pad.once('trigger', () => {
        const {done} = this.ranbir_script.angry_iterator.next();
        if(done) this.ranbir.logic_start();
      });
    });
  }

  _set_dev_settings() {
    keyboardManager.on('released', event => {
      if(event === 13) this.generator.next();
      if(event === 78) this.ranbir_script.happy_iterator.next(); // good
      if(event === 79) this.ranbir_script.angry_iterator.next(); // bad
      if(event === 188) this.ranbir_script.speech_iterator.next(); // normal
    });

    keyboardManager.enable();
    this.light_shroud.alpha =0;
    this.doors.forEach(i => i.x += 50);

    // this.roofs.forEach(i => i.alpha = 0);
    // this.shrouds.forEach(i => i.alpha = 0);
    // this.prey.forEach(i => i.alpha = 0);
  }
}

module.exports = {
  RanbirRoom,
};
