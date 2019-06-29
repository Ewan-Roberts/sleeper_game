'use strict';
const { items } = require('../../engine/pixi_containers');
const { collisions } = require('../../engine/pixi_containers');
const { player_events  } = require('../../engine/item_handler');

const { Inventory } = require('../../character/attributes/inventory');
const { Button    } = require('../../view/button');
const { Note      } = require('../../view/overlay_object');
const { Caption_Dialog  } = require('../../view/caption');
const { Sprite, Texture } = require('pixi.js');

class Chest extends Sprite {
  constructor(data) {
    const { type, properties } = data;
    super(Texture.fromImage(data.image_name));
    this.id       = data.id;
    this.height   = data.height;
    this.width    = data.width;
    this.rotation = data.rotation * (Math.PI/180);
    this.alpha    = data.properties && data.properties.alpha || 1;
    this.anchor.set(0, 1);
    this.position.copy(data);

    this.interactive = true;
    if(type === 'note') {
      this.click = () => new Note(properties);
    }

    if(properties && properties.label) {
      this.interactive = true;
      this.tint = 0xd3d3d3;
      this.button = new Button(properties);
      this.button.visible = false;
      this.on('mouseover', () => {
        console.log('22222222');
        this.tint = 0xffffff;
        this.button.set_position(this);
        this.button.visible = true;
      });
      this.on('mouseout', () => {
        this.tint = 0xd3d3d3;
        this.button.visible = false;
      });
    }

    if(properties && properties.equip_on_click) {
      this.click = () => {
        this.destroy();
        player_events.emit('equip_weapon', properties);
        if(this.button) this.button.visible = false;
      };
    }

    if(properties && properties.dialog_on_click) {
      this.click = () => {
        const dialog = new Caption_Dialog();
        dialog.show();
        dialog.render_text(properties.dialog_on_click);
      };
    }

    if(properties && properties.remove_on_click) {
      this.click = () => this.destroy();
    }

    if(properties && properties.container) {
      this.inventory = new Inventory(properties);
      this.click = () => {
        this.button.visible = false;
        this.inventory.set_position(this);
        this.inventory.fade_in();
      };
    }

    if(properties && properties.collision) {
      collisions.addChild(this);
    } else {
      items.addChild(this);
    }
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
    this.inventory.set_position(this);
    this.inventory.set_position(this);

    this.inventory.fade_in();
  }

  _empty() {
    this.state = 'empty';
  }

  remove() {
    this.button.destroy();
    this.destroy();
  }

  fill() {
    this.state = 'full';
  }
}

module.exports = {
  Chest,
};
