'use strict';
const { items } = require('../../engine/pixi_containers');
const { player_events  } = require('../../engine/item_handler');

const { Inventory } = require('../../character/attributes/inventory');
const { Button   } = require('../../view/button');
const { Note     } = require('../../view/overlay_object');
const { Caption_Dialog } = require('../../view/caption');
const { Item     } = require('./item_model');

class Chest extends Item {
  constructor(options) {
    super(options);
    this.name = 'chest';
    const { type, properties } = options;

    if(type === 'note') {
      this.click = () => new Note(properties);
    }

    if(properties.label) {
      this.sprite.interactive = true;
      this.sprite.tint = 0xd3d3d3;
      this.button = new Button(properties);
      this.button.visible = false;
      this.sprite.on('mouseover', () => {
        this.sprite.tint = 0xffffff;
        this.button.set_position(this.sprite);
        this.button.visible = true;
      });
      this.sprite.on('mouseout', () => {
        this.sprite.tint = 0xd3d3d3;
        this.button.visible = false;
      });
    }

    if(properties.shadow) {
      this.shadow = true;
      this.shade.anchor.y = 1;
      this.shade.anchor.x = 0;
    }

    if(properties.equip_on_click) {
      this.click = () => {
        this.sprite.destroy();
        player_events.emit('equip_weapon', properties);
        if(this.button) this.button.visible = false;
      };
    }

    this.sprite.alpha = 1;
    if(properties.dialog_on_click) {
      this.click = () => {
        const dialog = new Caption_Dialog();
        dialog.show();
        dialog.render_text(properties.dialog_on_click);
      };
    }

    if(properties.remove_on_click) {
      this.click = () => this.sprite.destroy();
    }

    if(properties.container) {
      this.add_component(new Inventory({
        ...this,
        properties,
      }));
      this.click = () => {
        this.button.visible = false;
        this.inventory.show();
      };
    }

    items.addChild(this.sprite);
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
    this.inventory.set_position(this.sprite);
    this.inventory.show();
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
