'use strict';
const { collisions } = require('../../engine/pixi_containers');

const { Tween       } = require('../../engine/tween');
const { Camera      } = require('../../engine/camera');
const { Lurcher     } = require('../../character/archetypes/zombie');
const { Crow        } = require('../../character/archetypes/crow');
const { Tiled_Data  } = require('../attributes/parse_tiled_data');
const { Click_Pad   } = require('../elements/click_pad');

class Intro  {
  constructor(player, options) {
    this.name         = 'intro';
    this.player       = player;
    this._set_elements();

    if(options && options.cutscene) this._cutscene();
  }

  _cutscene() {
    this.camera = new Camera();
    this.player.keyboard.disable();

    this.camera.tween.from_path({ x: -120, y: -150 });
    this.camera.tween.to_path({   x: -100, y: -120 });
    this.camera.tween.to_path({   x: -600, y: 0 });
    this.camera.tween.smooth();
    this.camera.tween.time = 1000;
    this.camera.tween.start();

    this.player.tween.from({ x: 1000, y: 400 });
    this.player.tween.to({ x: 1080, y: 410 });
    this.player.tween.smooth();
    this.player.tween.time = 1000;
    this.player.tween.start();

    this.player.keyboard.enable();
  }

  _set_elements() {
    global.set_light_level(0.8);
    const level_data = require('../data/intro_room.json');

    const { Level_Factory } = require('./level_factory');
    const elements   = new Tiled_Data(level_data);
    Level_Factory.generate(elements);

    const { Trigger_Pad } = require('../elements/pad');
    const { exit_pad, click_pad, player, prey } = elements;

    this.player.set_position(player[0]);

    const characters = prey.map(npc => {
      const path = npc.polyline.map(({x,y})=>({x:npc.x+x, y:npc.y+y}));

      if(npc.name === 'zombie') {
        return new Lurcher({ path, time: 20000, turn: true});
      }

      return new Crow({path});
    });

    click_pad.forEach(data => {
      const pad = new Click_Pad(data);
      pad.click = () => {
        const dumpster = collisions.children.find(item => item.id === 102);
        const tween_it = new Tween(dumpster);
        tween_it.from(dumpster);
        tween_it.to({x: dumpster.x + 100, y:dumpster.y});
        tween_it.time = 2000;
        tween_it.start();

        characters.forEach(({tween}) => tween.start());
      };
    });

    exit_pad.forEach(data => new Trigger_Pad(data, this.player));
  }
}

module.exports = {
  Intro,
};
