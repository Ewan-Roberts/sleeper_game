const { visuals       } = require('../../engine/pixi_containers');
const { players       } = require('../../engine/pixi_containers');
const { Text          } = require('pixi.js');
const { Trigger_Pad   } = require('../elements');
const { Level_Factory } = require('./level_factory');

const {
  Floor,
} = require('../elements');

class Transition_Room {
  constructor() {
    this.name   = 'transition_room';
    this.data   = require('../data/transition_room.json');
    this.player = players.children[0];

    this._set_data();
  }

  _set_data() {
    Level_Factory.generate(this.data);
    const lights = this.data.christmas_lights.map(light => new Floor(light));

    setInterval(() => lights.forEach(light => light.tint = 0x000000), 1000);
    setInterval(() => lights.forEach(light => light.tint = 0xffffff), 2000);

    const { exit_pad, player } = this.data;
    this.player.position.copy(player[0]);

    exit_pad.forEach(data => {
      new Trigger_Pad(data);
      const { x, y, width, height} = data;

      const level_names = new Text(
        data.level_name,{fontSize: 40, fill: 'black'}
      );

      level_names.x = x + width/4;
      level_names.y = y + height/2;

      visuals.addChild(level_names);
    });

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

