'use strict';
const { item_container } = require('../../engine/pixi_containers');
const { player_events  } = require('../../engine/item_handler');

const { Lootable } = require('../../character/attributes/lootable');
const { Button   } = require('../../view/button');
const { Item     } = require('./item_model');

class Chest extends Item {
  constructor(options) {
    super(options.image_name);
    this.name = 'chest';

    if(options.label) {
      this.sprite.interactive = true;

      this.button = new Button(options);
      this.button.visible = false;

      this.sprite.on('mouseover', () => {
        this.button.set_position(this.sprite);
        this.button.visible = true;
      });

      this.sprite.on('mouseout', () => {
        this.button.visible = false;
      });
    }

    if(options.shadow) {
      this.shadow = true;
      this.shade.anchor.y = 1;
      this.shade.anchor.x = 0;
    }

    if(options.remove_on_click) {
      this.click = () => {
        this.sprite.destroy();

        player_events.emit('equip_weapon', options);

        if(this.button) this.button.visible = false;
      };
    }

    if(options.container) {
      this.add_component(new Lootable(this));
      this.state = 'closed';
      this.state_handling = true;

      if(options.random) this.loot.populate();

      if(!options.random && options.items) {
        const items_array = JSON.parse(options.items);

        this.loot.populate_with(items_array);
      }
    }

    item_container.addChild(this.sprite);
  }

  set state_handling(bool) {
    this.click = () => {
      switch(this.state) {
        case 'closed': this._open();  break;
        case 'full'  : this._empty(); break;
      }
    };
  }

  _open() {
    global.set_light_level(1);

    this.loot.set_position(this.sprite);

    this.loot.show();
  }

  _empty() {
    this.state = 'empty';
  }

  fill() {
    this.state = 'full';
  }
}

module.exports = {
  Chest,
};
