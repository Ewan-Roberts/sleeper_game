const PIXI = require('pixi.js');
const io = require('socket.io-client');
const viewport = require('../../engine/viewport.js');
const { GUI_Container } = require('../../gui/container')

const container = new PIXI.Container();
container.name = 'item_container';
container.zIndex = -6;
viewport.addChild(container);

class Chest {
  constructor(item_data) {
    this.image_cache = {
      state: {
        full:   PIXI.Texture.fromFrame('chest_full'),
        empty:  PIXI.Texture.fromFrame('chest_empty'),
      }
    }
    this.sprite = new PIXI.Sprite(this.image_cache.state.full);
    this.sprite.anchor.set(0.5);
    this.sprite.zIndex = -5;
    this.sprite.name = 'chest';
    this.sprite.position.set(item_data.x, item_data.y);
    this.sprite.interactive = true;
    this.sprite.buttonMode = true;
    this.state = 'closed';

    container.addChild(this.sprite);
  }

  add_state_handling() {
    this.sprite.click = () => {
      switch(this.state) {
        case 'closed':
          this.open_inventory_box();
          break;
        case 'full':
          this.empty();
          break;
      }
    }
  }

  open_inventory_box() {
    if(this.state === 'open') {
      return;
    }
    this.state = 'open';
    
    const inventory_box = new GUI_Container();
    inventory_box.add_item_tiles();
    inventory_box.populate_slot_1('bunny')
    inventory_box.populate_slot_2('bunny')
    inventory_box.populate_slot_3('bunny')
    inventory_box.populate_slot_4('bunny')
    this.sprite.addChild(inventory_box.container);
  }

  empty() {
    this.sprite.texture = this.image_cache.state.empty;
    this.state = 'empty';
    return this;
  }

  fill() {
    this.sprite.texture = this.image_cache.state.full;
    this.state = 'full';
    return this;
  }
}


module.exports = {
  Chest,
}
