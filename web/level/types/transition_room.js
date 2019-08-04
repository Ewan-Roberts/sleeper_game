const { visuals       } = require('../../engine/pixi_containers');
const { players       } = require('../../engine/pixi_containers');
const { distance_between } = require('../../utils/math');
const { ProgressBar   } = require('../../view/progress_bar');
const { Caption   } = require('../../view/caption');
const { Text          } = require('pixi.js');
const { Trigger_Pad   } = require('../elements');
const { Level_Factory } = require('./level_factory');
const { keyboardManager } = require('pixi.js');
//const { Simple_Room   } = require('./simple_room');

const {
  Floor,
  Generator,
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

    let item_with_fuel = 20;
    // TODO couple the progress bar to the generator?
    const bar = new ProgressBar();
    bar.visible = false;

    const generator = new Generator(this.data.generator[0]);
    generator.click = () => {
      if(generator.fuel > 0) {
        generator.turn_on();
        return;
      }

      keyboardManager.disable();
      bar.visible = true;
      bar.animate_increase(item_with_fuel);
    };

    bar.complete(() => {
      Caption.render('Its empty');
      generator.fuel = item_with_fuel;
      item_with_fuel = null;
      keyboardManager.enable();
    });

    keyboardManager.on('pressed', () => {
      const relative_distance = distance_between(this.player, generator);
      if(relative_distance<200) {
        generator.tint = 0x008b00;
        generator.interactive = true;
      } else {
        generator.tint = 0xffffff;
      }
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

