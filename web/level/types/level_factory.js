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

function add_cull_objects() {
  viewport.children.forEach(child => {
    cull.addList(child.children);
  });
}

// TODO
ticker.add(() => {
  if(viewport.dirty) {
    const bounds = viewport.getVisibleBounds();
    bounds.height *= 3;
    bounds.width *= 3;
    bounds.x -= 400;
    bounds.y -= (bounds.height / 2);

    console.log(cull.stats());
    cull.cull(bounds);

    viewport.dirty = false;
  }
});

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
        break;
      case 'start':
        new StartRoom();
        break;
      case 'street':
        new StreetRoom(spawn_id);
        break;
      case 'item':
        new ItemsRoom();
        break;
      case 'transition':
        new HubRoom();
        break;
      case 'defend':
        new DefendRoom();
        break;
      case 'park':
        new ParkRoom();
        break;
      case 'ranbir_flat_0' :
        new RanbirFloor0(spawn_id);
        break;
      case 'ranbir_flat_1' :
        new RanbirFloor1();
        break;
      case 'ranbir_flat_2' :
        new RanbirFloor2();
        break;
      case 'dev':
        new DevRoom(spawn_id);
        break;
      case 'stalker':
        new StalkerRoom();
        break;
      case 'basketball':
        new BasketBallRoom();
        break;
    }

    add_cull_objects();
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
