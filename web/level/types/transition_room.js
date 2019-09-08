const { visuals       } = require('../../engine/pixi_containers');
const { players       } = require('../../engine/pixi_containers');
const { ProgressBar   } = require('../../view/progress_bar');
const { Caption       } = require('../../view/caption');
const { Text          } = require('pixi.js');
const { Trigger_Pad   } = require('../elements');
const { Level_Factory } = require('./level_factory');
const { keyboardManager } = require('pixi.js');

const {
  Floor,
  Generator,
} = require('../elements');

class Light extends Floor {
  constructor(data) {
    super(data);
  }

  turn_on() {
    this.tint = 0xff;
  }

  turn_off() {
    this.tint = 0x000000;
  }
}

// FOR TESTING
class HubRoom {
  constructor() {
    this.name   = 'transition_room';
    this.data   = require('../data/transition_room.json');
    this.player = players.children[0];

    this._set_data();
  }

  _set_data() {
    // TODO remove level factory
    Level_Factory.generate(this.data);

    const { exit_pad, player } = this.data;
    this.player.position.copy(player[0]);

    exit_pad.forEach(data => {
      new Trigger_Pad(data);
      const { x, y, width, height } = data;

      const level_names = new Text(
        data.level_name, { 'fontSize': 40, 'fill': 'black' }
      );

      level_names.x = x + width / 4;
      level_names.y = y + height / 2;

      visuals.addChild(level_names);
    });

    // TODO couple the progress bar to the generator?
    const lights = this.data.christmas_lights.map(
      light => new Light(light)
    );

    const generator = new Generator(this.data.generator[0]);

    this.player.inventory.populate_with_item(
      'gas_canister', { 'condition': 0.4 }
    );

    ProgressBar.percentage = 0.1;

    generator.on('click', () => {
      if(this.player.inventory.contains('gas_canister')) {
        const fuel = this.player.inventory.take_by_name('gas_canister');
        keyboardManager.disable();
        ProgressBar.show();

        generator.fuel = fuel.condition;
        ProgressBar.to_percentage(fuel.condition);
        generator.interactive = false;
        lights.forEach(light => light.turn_on());
      }
    });

    generator.end(() => {
      lights.forEach(light => light.turn_off());
    });

    ProgressBar.complete(() => {
      Caption.render('Its filled');
      generator.ready();
      keyboardManager.enable();
      generator.interactive = true;
    });

    const level_text = new Text(
      'THE HUB',
      {
        'fontSize'          : 100,
        'fill'              : 'grey',
        'fontWeight'        : 'bold',
        'dropShadow'        : true,
        'dropShadowColor'   : '#000000',
        'dropShadowBlur'    : 8,
        'dropShadowDistance': 10,
      }
    );

    level_text.x = player[0].x - 150;
    level_text.y = player[0].y - 50;

    visuals.addChild(level_text);
    console.timeEnd();
  }
}

module.exports = {
  HubRoom,
};

