const { visuals       } = require('../../engine/pixi_containers');
const { players       } = require('../../engine/pixi_containers');
const { distance_between } = require('../../utils/math');
const { ProgressBar   } = require('../../view/progress_bar');
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
    const bar = new ProgressBar();
    bar.visible = false;

    const generator = new Generator(this.data.generator[0]);
    generator.fuel_level = 0;

    generator.click = () => {
      console.log(item_with_fuel);
      console.log(generator);
      if(item_with_fuel <= 0) {
        console.log('no fuel');
        return;
      }
      keyboardManager.disable();
      bar.visible = true;
      bar.animate_increase(item_with_fuel);
    };


    bar.complete(() => {
      generator.fuel_level = item_with_fuel;
      item_with_fuel = null;
      keyboardManager.enable();
      console.log('done');
    });


    keyboardManager.on('pressed', () => {
      const relative_distance = distance_between(this.player, generator);
      if(relative_distance<200) {
        generator.tint = 0x008b00;
        generator.interactive = true;
      } else {
        generator.tint = 0xffffff;
      }
      console.log(relative_distance);
      //console.log(generator.gas);
    });


    // console.log('time');
    // const bar = new ProgressBar();
    // bar.percentage = 10;
    // bar.animate_increase();
    // const bar = new ProgressBar();
    // bar.percentage = 10;
    // bar.animate_increase();

    //setTimeout(() => bar.visible = false,2000);
    //setInterval(() => console.log(bar.percentage),200);

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

