'use strict';
const { item_container } = require('../../engine/pixi_containers');

const { Lootable } = require('../../character/attributes/lootable');
const { Button   } = require('../../view/button');
const { Item     } = require('./item_model');

class Chest extends Item {
  constructor(options) {
    super(options.image_name);
    this.name = 'chest';

    if(options.label) {
      this.sprite.interactive = true;
      this.state = '';

      const thing = new Button(options);
      thing.visible = false;

      this.sprite.on('mouseover', () => {
        thing.set_position(this.sprite);

        thing.visible = true;
      });

      this.sprite.on('mouseout', () => {
        thing.visible = false;
      });
    }

    if(options.shadow) {
      this.shadow = true;
      this.shade.anchor.y= 1;
      this.shade.anchor.x= 0;
    }

    if(options.unique_item) {
      this.click = () => {
        this.sprite.destroy();
      };
    }

    if(options.remove_on_click) {
      this.click = () => {
        this.sprite.destroy();
      };
    }

    if(options.container) {
      this.add_component(new Lootable(this));
      this.state  = 'closed';
      this.state_handling = true;
    }

    item_container.addChild(this.sprite);
  }

  set state_handling(bool) {
    if(bool) this._add_state_handling();
  }

  _add_state_handling() {
    this.click = () => {
      switch(this.state) {
        case 'closed': this._open();  break;
        case 'full'  : this._empty(); break;
      }
    };
  }

  _open() {
    if(this.state === 'open') return;
    this.state = 'open';

    global.set_light_level(1);
    this.loot.populate();
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
