'use strict';

const { Lootable       } = require('../../character/attributes/lootable');
const { item_container } = require('../../engine/pixi_containers');
const { Item           } = require('./item_model');

class Chest extends Item {
  constructor() {
    super('chest_full');
    this.name  = 'chest';

    this.state = 'closed';
    this.add_component(new Lootable(this));

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
