'use strict';
const { collision_container } = require('../../engine/pixi_containers');
const { Tween } = require('../../engine/tween');
const { generate_crow } = require('../../effects/click_events');

const { Tiled_Data  } = require('../attributes/parse_tiled_data');
const { Trigger_Pad } = require('../elements/pad');
const { Camera      } = require('../../engine/camera');
const { Crow        } = require('../../character/archetypes/crow');
const { Lighter     } = require('../../light/types/lighter');
const { Lantern     } = require('../../light/types/lantern');
const { Click_Pad   } = require('../elements/click_pad');

const level_data  = require('../data/intro_room.json');

class Intro  {
  constructor(player, options) {
    this.name         = 'intro';
    this.player       = player;
    this.elements     = new Tiled_Data(level_data);
    this.lighter      = new Lighter();

    this.camera       = new Camera();
    this.lantern      = new Lantern();

    this._set_elements();
    if(options.cutscene) this._cutscene();
  }

  _cutscene() {
    this.player.keyboard.disable();

    this.lantern.set_position(800, 100);
    this.lantern.tween.add_path([
      {x: 1000, y: 100},
      {x: 1250, y: 140},
      {x: 1450, y: 100},
      {x: 1650, y: 120},
      {x: 1951, y: 110},
      {x: 2551, y: 110},
    ]);
    this.lantern.range = 700;
    this.lantern.tween.time = 10000;
    this.lantern.tween.start();
    this.lantern.tween.movement.on('end', () => this.lantern.remove());

    this.lighter.set_position({ x: 1115, y: 410 });
    this.lighter.strike.start();

    this.camera.tween.from_path({ x: -120, y: -150 });
    this.camera.tween.to_path({   x: -100, y: -120 });
    this.camera.tween.to_path({   x: -600, y: 0 });
    this.camera.tween.smooth();
    this.camera.tween.time = 1000;
    this.camera.tween.path_start();

    this.player.tween.no_path_from({ x: 1000, y: 400 });
    this.player.tween.no_path_to({ x: 1080, y: 410 });
    this.player.tween.smooth();
    this.player.tween.time = 1000;
    this.player.tween.no_path_start();
    this.player.tween.movement.on('update', () => {
      this.player.light.set_position(this.player.sprite);
    });

    this.player.keyboard.enable();
  }

  _set_elements() {
    const { Level_Factory } = require('./level_factory');
    Level_Factory.generate(this.player, this.elements);

    global.set_light_level(1);

    const {exit_pad, click_pad} = this.elements;

    click_pad.forEach(data => {
      const pad  = new Click_Pad();
      pad.height = data.height;
      pad.width  = data.width;
      pad.anchor = 0;
      pad.set_position(data);
      pad.click = () => {
        const dumpster = collision_container.children.find(item => item.id === 102);
        const tween_it = new Tween(dumpster);
        tween_it.no_path_from(dumpster);
        tween_it.no_path_to({x: dumpster.x + 100, y:dumpster.y});
        tween_it.no_path_time = 2000;
        tween_it.no_path_start();

        generate_crow({
          from: {x: 400, y: 60},
          to:   {x: 3000, y: -1000},
        });
      };
    });

    exit_pad.forEach(data => {
      const pad  = new Trigger_Pad();
      pad.height = data.height;
      pad.width  = data.width;
      pad.rotation = (data.rotation * (Math.PI/180));
      pad.anchor = 0;
      pad.set_position(data);
      pad.area.events.on('trigger', () => {
        Level_Factory.clear();
        Level_Factory.create(data.properties, this.player);
      });
    });
  }
}

module.exports = {
  Intro,
};
