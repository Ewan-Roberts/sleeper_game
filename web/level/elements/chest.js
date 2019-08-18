const { items      } = require('../../engine/pixi_containers');
const { collisions } = require('../../engine/pixi_containers');
const { players    } = require('../../engine/pixi_containers');

const { Inventory } = require('../../character/attributes/inventory');
const { Button    } = require('../../view/button');
const { Note      } = require('../../view/overlay_object');
const { Caption   } = require('../../view/caption');
const { Element   } = require('./model');

class Chest extends Element {
  constructor(data) {
    super(data);
    this.interactive = true;

    // TODO handle player acquisition better
    const [player] = players.children;

    if(data.type === 'note') this.on('click', () => new Note(data));

    if(data.equip_on_click) this.on('click', () => player.events.emit('equip_weapon', data));
    if(data.label) this.label(data);
    if(data.dialog_on_click) this.on('click', () => Caption.render(data.dialog_on_click));
    if(data.remove_on_click) this.on('click', () => this.destroy());
    if(data.container) this.container(data);

    if(data.collision) {
      collisions.addChild(this);
    }
    items.addChild(this);
  }

  container(data) {
    this.inventory = new Inventory(data);
    this.on('click', () => {
      this.button.visible = false;
      this.inventory.set_position(this);
      this.inventory.fade_in();
    });
  }

  // TODO This is repeated in a few places
  label(data) {
    this.tint = 0xd3d3d3;
    this.button = new Button(this, data);
  }

  remove() {
    this.button.destroy();
    this.destroy();
  }
}

module.exports = {
  Chest,
};
