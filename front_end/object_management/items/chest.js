const PIXI = require('pixi.js');
const io = require('socket.io-client');
const viewport = require('../../engine/viewport.js');

class Chest {
  constructor(item_data) {
    this.container = new PIXI.Container();
    this.container.name = 'item_container';
    this.container.zIndex = -6;
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

    this.container.addChild(this.sprite);
    viewport.addChild(this.container);
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
    this.state = 'open';
    
    const inventory_box = PIXI.Sprite.fromFrame('black_dot');
    inventory_box.height = 200;
    inventory_box.width = 600;
    inventory_box.name = 'inventory_box';
    inventory_box.anchor.set(0.5);
    inventory_box.zIndex = -6;

    this.sprite.addChild(inventory_box);
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
