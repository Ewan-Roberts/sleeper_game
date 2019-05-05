'use strict';
const { item_container } = require('../../engine/pixi_containers');
const { player_events  } = require('../../engine/item_handler');

const { Lootable } = require('../../character/attributes/lootable');
const { Button   } = require('../../view/button');
const { Note     } = require('../../view/overlay_object');
const { Caption_Dialog } = require('../../view/caption');
const { Item     } = require('./item_model');

class Chest extends Item {
  constructor(options) {
    super(options);
    this.name = 'chest';

    if(options.type === 'note') {
      this.click = () => new Note(options.properties);
    }

    if(options.properties.label) {
      this.sprite.interactive = true;
      this.button = new Button(options.properties);
      this.button.visible = false;
      this.sprite.on('mouseover', () => {
        this.button.set_position(this.sprite);
        this.button.visible = true;
      });
      this.sprite.on('mouseout', () => {
        this.button.visible = false;
      });
    }

    if(options.properties.shadow) {
      this.shadow = true;
      this.shade.anchor.y = 1;
      this.shade.anchor.x = 0;
    }

    if(options.properties.equip_on_click) {
      this.click = () => {
        this.sprite.destroy();
        player_events.emit('equip_weapon', options.properties);
        if(this.button) this.button.visible = false;
      };
    }

    if(options.properties.dialog_on_click) {
      this.click = () => {
        const dialog = new Caption_Dialog();
        dialog.show();
        dialog.render_text(options.properties.dialog_on_click);
      };
    }

    if(options.properties.remove_on_click) {
      this.click = () => this.sprite.destroy();
    }

    if(options.properties.container) {
      this.add_component(new Lootable(this));
      this.state = 'closed';
      this.state_handling = true;
      if(options.properties.random) this.loot.populate();
      if(!options.properties.random && options.properties.items) {
        const items_array = JSON.parse(options.properties.items);
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
