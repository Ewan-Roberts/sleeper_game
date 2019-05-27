'use strict';
const { collisions } = require('../../engine/pixi_containers');

const { Tween      } = require('../../engine/tween');
const { Camera     } = require('../../engine/camera');
const { Lurcher    } = require('../../character/archetypes/zombie');
const { Crow       } = require('../../character/archetypes/crow');
const { Tiled_Data } = require('../attributes/parse_tiled_data');
const { Click_Pad  } = require('../elements/click_pad');
const { Background } = require('../../view/overlay_object');
const { Button     } = require('../../view/button');

const level_data = require('../data/intro_room.json');
const elements = new Tiled_Data(level_data);
elements.dumpster_moved = false;

class Intro {
  constructor(player, {properties}) {
    this.name         = 'intro';
    this.properties   = properties;
    this.player       = player;

    this._set_elements();
  }

  _set_elements() {
    const { Level_Factory } = require('./level_factory');
    Level_Factory.generate(elements);
    const { Trigger_Pad } = require('../elements/pad');
    const { exit_pad, click_pad, player, prey } = elements;
    const background = new Background();

    if(this.properties.entry_id) {
      const entry_point = player.find(point => point.id === this.properties.entry_id);
      this.player.set_position(entry_point);
      background.set_position(entry_point);
      Camera.set_center(entry_point);
    } else {
      this.player.set_position(player[0]);
      background.set_position(player[0]);
    }
    background.fade_out(500);

    const characters = prey.map(npc => {
      const path = npc.polyline.map(({x,y})=>({x:npc.x+x, y:npc.y+y}));

      if(npc.name === 'zombie') {
        return new Lurcher({ path, time: 20000, turn: true});
      }

      return new Crow({path});
    });

    exit_pad.forEach(data => new Trigger_Pad(data, this.player));
    if(elements.dumpster_moved) {
      const dumpster = collisions.children.find(item => item.id === 102);
      dumpster.x -= 45;
      dumpster.y -= 60;
      return;
    }

    const dumpster = collisions.children.find(item => item.id === 102);
    dumpster.tint = 0xd3d3d3;

    click_pad.forEach(data => {
      const pad = new Click_Pad(data);
      const button = new Button(data.properties);
      button.visible = false;
      button.set_position(pad.sprite);
      pad.sprite.on('mouseover', () => {
        dumpster.tint = 0xffffff;
        button.visible = true;
      });
      pad.sprite.on('mouseout', () => {
        dumpster.tint = 0xd3d3d3;
        button.visible = false;
      });

      pad.click = () => {
        if(pad.number_clicks === 3) return;
        const tween_it = new Tween(dumpster);
        tween_it.from(dumpster);
        tween_it.to({x: dumpster.x - 15, y:dumpster.y - 20});
        tween_it.time = 1000;
        tween_it.start();
        characters.forEach(({tween}) => tween.start());
        pad.number_clicks++;
        elements.dumpster_moved = true;
      };
    });

  }
}

module.exports = {
  Intro,
};
