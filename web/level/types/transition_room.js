const { visuals       } = require('../../engine/pixi_containers');
const { Text          } = require('pixi.js');
const { Trigger_Pad   } = require('../elements');
const { Level_Factory } = require('./level_factory');
const { Player        } = require('../../character/archetypes/player');

class Transition_Room {
  constructor() {
    this.name     = 'transition_room';
    this.player   = new Player();
    this.elements = require('../data/transition_room.json');

    this._set_elements();
  }

  _set_elements() {
    Level_Factory.generate(this.elements);

    const { exit_pad, player } = this.elements;
    this.player.position.copy(player[0]);

    exit_pad.forEach(data => {
      new Trigger_Pad(data, this.player);
      const {properties, x, y, width, height} = data;

      const level_names = new Text(
        properties.level_name,{fontSize: 40, fill: 'grey'}
      );

      level_names.x = x + width/4;
      level_names.y = y + height/2;

      visuals.addChild(level_names);
    });

    this.player.vitals.speed = 30;
    const level_text = new Text(
      'THE HUB',
      {
        fontSize: 100,
        fill:     'grey',
        fontWeight: 'bold',
        dropShadow: true,
        dropShadowColor: '#000000',
        dropShadowBlur: 8,
        dropShadowDistance: 10,
      }
    );

    level_text.x = player[0].x -150;
    level_text.y = player[0].y -50;

    visuals.addChild(level_text);
    console.timeEnd();
  }
}

module.exports = {
  Transition_Room,
};

