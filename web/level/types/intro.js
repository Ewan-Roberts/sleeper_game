'use strict';
const { collision_container } = require('../../engine/pixi_containers');
const { visual_effects_container } = require('../../engine/pixi_containers');
const { Tween } = require('../../engine/tween');
const { generate_crow } = require('../../effects/click_events');

const { Tiled_Data  } = require('../attributes/parse_tiled_data');
const { Trigger_Pad } = require('../elements/pad');
const { Camera      } = require('../../engine/camera');
const { Click_Pad   } = require('../elements/click_pad');


class Intro  {
  constructor(player, options) {
    const level_data  = require('../data/intro_room.json');
    this.name         = 'intro';
    this.player       = player;
    this.elements     = new Tiled_Data(level_data);
    this.camera       = new Camera();

    visual_effects_container.addChild(player.light.candle.sprite);
    visual_effects_container.addChild(player.light.candle.shadow);
    this._set_elements();
    if(options && options.cutscene) this._cutscene();
  }

  _cutscene() {
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
    this.player.tween.movement.on('update', () => {
      this.player.light.set_position(this.player.sprite);
    });

    this.player.keyboard.enable();
  }

  _set_elements() {
    const { Level_Factory } = require('./level_factory');
    Level_Factory.generate(this.player, this.elements);

    global.set_light_level(0.3);

    const {exit_pad, click_pad, player} = this.elements;
    this.player.set_position(player[0]);

    global.set_light_level(0.5);

    click_pad.forEach(data => {
      const pad  = new Click_Pad(data);
      pad.click = () => {
        const dumpster = collision_container.children.find(item => item.id === 102);
        const tween_it = new Tween(dumpster);
        tween_it.from(dumpster);
        tween_it.to({x: dumpster.x + 100, y:dumpster.y});
        tween_it.time = 2000;
        tween_it.start();

        generate_crow({
          from: {x: 400, y: 60},
          to:   {x: 3000, y: -1000},
        });
      };
    });

    exit_pad.forEach(data => {
      const pad  = new Trigger_Pad(data);
      pad.area.rotation = (data.rotation * (Math.PI/180));
      pad.area.events.on('trigger', () => {
        Level_Factory.create(data.properties, this.player);
      });
    });
  }
}

module.exports = {
  Intro,
};
