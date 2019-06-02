'use strict';

const { pathfind      } = require('../../engine/pathfind.js');
const { Tiled_Data    } = require('../attributes/parse_tiled_data');
const { Trigger_Pad   } = require('../elements/pad');
const { BackgroundVisualItem } = require('../elements/visual_object');
const { Walker        } = require('../../character/archetypes/rat');
const { Player        } = require('../../character/archetypes/player');
const { Level_Factory } = require('./level_factory');
const { players       } = require('../../engine/pixi_containers');
const level_data        = require('../data/start.json');

class Start_Room  {
  constructor() {
    this.name     = 'defend_room';
    this.player   = new Player();
    this.elements = new Tiled_Data(level_data);

    this._set_elements();
  }

  _set_elements() {
    console.log(players);
    Level_Factory.generate(this.elements);

    const { prey, exit_pad, grid, player } = this.elements;

    this.player.set_position(player[0]);
    const zombies = prey.map((unit,i) => {
      const zombie = new Walker(unit);
      zombie.target(this.player);
      zombie.set_position(unit);
      if(i % 2) zombie.animation.eat();
      zombie.sprite.visible = false;
      return zombie;
    });

    let i = 0;
    // const blood_images = [
    //   'blood-tears-png-8',
    //   'Blood splatter 5-sc',
    //   'Blood splatter 7-sc',
    //   'Blood splatter 16-sc',
    //   'Blood splatter 18-sc',
    //   'Blood splatter 20-sc',
    //   'Blood_splatter_3-sc',
    //   'Blood_splatter_15-sc',
    //   'blood_trail',
    //   'Bloody_Trail-dried_jdale_hrc',
    //   'blood-tears-png-8',
    // ];
    const hands = [];
    setInterval(()=> {
      zombies.forEach(unit => {
        const name = ( i % 2 )?'left_hand':'right_hand';
        const blood_hands = new BackgroundVisualItem({
          properties: {
            image_name: name,
          },
          width: 20,
          height: 20,
        });

        blood_hands.set_position(unit.sprite);
        blood_hands.rotation = unit.sprite.rotation + 1.5;
        hands.push(blood_hands.sprite);
        hands.forEach((hand,i) => {
          if(hand.alpha < 0.1) {
            hand.destroy();
            hands.splice(i, 1);
          }
          hand.alpha-=0.1;
        });
      });
      i++;
    },500);

    exit_pad.forEach(data => {
      const pad = new Trigger_Pad(data);

      pad.sprite.events.once('trigger', () => {
        zombies.forEach(unit => unit.logic_start());
      });
      return pad;
    });

    pathfind.create_level_grid(grid[0]);
  }
}

module.exports = {
  Start_Room,
};
