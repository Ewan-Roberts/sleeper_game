const { clear_level_containers } = require('../../engine/pixi_containers');
const { tweenManager } = require('pixi.js');

const { Wall        } = require('../elements/wall');
const { Decal       } = require('../elements/decals');
const { Background  } = require('../elements/background');
const { Chest       } = require('../elements/chest');
const { Door        } = require('../elements/door');
const { Roof        } = require('../elements/ceiling');
const { Shroud      } = require('../elements/shroud');
const { Collision   } = require('../elements/collision');
const { Floor       } = require('../elements/floor');
const { cull, viewport, ticker  } = require('../../engine/app');

// function add_cull_objects() {
//   viewport.children.forEach(child => {
//     if(child.name === 'player_container') {
//       return;
//     }
//     cull.addList(child.children);
//   });
// }

class Level_Factory {
  static create(level_name, spawn_id) {
    this.clear();

    const { ItemsRoom      } = require('./item_room');
    const { StreetRoom     } = require('./street');
    const { HubRoom        } = require('./transition_room');
    const { DefendRoom     } = require('./defend_room');
    const { ParkRoom       } = require('./park_room');
    const { StartRoom      } = require('./start');
    // const { SimpleRoom     } = require('./simple_room');
    const { DevRoom        } = require('./dev_room');
    const { RanbirFloor0   } = require('./ranbir_flat_0');
    const { RanbirFloor1   } = require('./ranbir_flat_1');
    const { RanbirFloor2   } = require('./ranbir_flat_2');
    const { StalkerRoom    } = require('./stalker_room');
    const { BasketBallRoom } = require('./basketball_room');
    const { IntroRoom      } = require('./intro');

    switch (level_name) {
      case 'intro':
        new IntroRoom();
        return;
      case 'start':
        new StartRoom();
        return;
      case 'street':
        new StreetRoom(spawn_id);
        return;
      case 'item':
        new ItemsRoom();
        return;
      case 'transition':
        new HubRoom();
        return;
      case 'defend':
        new DefendRoom();
        return;
      case 'park':
        new ParkRoom();
        return;
      case 'ranbir_flat_0' :
        new RanbirFloor0(spawn_id);
        return;
      case 'ranbir_flat_1' :
        new RanbirFloor1();
        return;
      case 'ranbir_flat_2' :
        new RanbirFloor2();
        return;
      case 'dev':
        new DevRoom(spawn_id);
        return;
      case 'stalker':
        new StalkerRoom();
        return;
      case 'basketball':
        new BasketBallRoom();
        return;
    }
  }

  // TODO remove
  static generate({
    walls,
    door,
    shroud,
    item,
    roof,
    floor,
    decal,
    background,
    collision,
    slow_pad,
  }
  ) {

    const { Trigger_Pad } = require('../elements');
    try {
      background.forEach(data => new Background(data));
      decal.forEach(data => new Decal(data));
      floor.forEach(data => new Floor(data));
      roof.forEach(data => new Roof(data));
      walls.forEach(data => new Wall(data));
      collision.forEach(data => new Collision(data));
      item.forEach(data => new Chest(data));
      door.forEach(data => new Door(data));
      shroud.forEach(data => new Shroud(data));
      if(slow_pad) {
        slow_pad.forEach(data => new Trigger_Pad(data));
      }

    } catch (error) {
      console.error(error);
    }
  }

  static clear() {
    console.log('clear');
    tweenManager.tweens.forEach(tween => {
      if(!tween.target) {
        return;
      }
      if(tween.target.name === 'zombie') {
        tween.target.remove();
      }
    });
    clear_level_containers();
  }
}

module.exports = {
  Level_Factory,
};
