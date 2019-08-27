const { items       } = require('../../engine/pixi_containers');
const { collisions  } = require('../../engine/pixi_containers');
const { item_events } = require('../../engine/item_handler');

const { Inventory } = require('../../character/attributes/inventory');
const { Button    } = require('../../view/button');
const { Note      } = require('../../view/overlay_object');
const { Caption   } = require('../../view/caption');
const { Element   } = require('./model');

class Chest extends Element {
  constructor(data) {
    super(data);
    this.interactive = true;
    this.buttonMode = true;

    const {
      type,
      equip_on_click,
      label,
      dialog_on_click,
      container,
      collision,
      give_on_click,
    } = data;

    // TODO handle player acquisition better
    if(type === 'note') this.on('click', () => {
      const {
        image_on_click,
        text,
        text_colour,
        sound_file,
      } = data;

      new Note({
        image_on_click,
        text,
        text_colour,
        sound_file,
      });
    });

    this.inventory = new Inventory(data);

    if(equip_on_click) {
      this.on('click', () => {
        console.log(data);
        item_events.emit('equip_weapon', 1, {item: data});
        this.destroy();
      });
    }

    if(give_on_click) {
      this.on('click', () => {
        //TODO this implies only one, which may be ok
        const [item] = this.inventory.items;
        item_events.emit('give', 1, {item});
        this.destroy();
      });
    }

    if(label) this.label(data);
    if(dialog_on_click) this.on('click', () => Caption.render(dialog_on_click));
    if(container) this.container(data);
    if(collision) collisions.addChild(this);

    items.addChild(this);
  }

  container() {
    this.on('click', () => {
      this.button.visible = false;
      this.inventory.set_position(this);
      this.inventory.fade_in();
    });
  }

  label({
    label_action,
    label_description,
    label_image,
  }) {
    this.tint = 0xd3d3d3;
    this.button = new Button(this, {
      label_action,
      label_description,
      label_image,
    });
  }

  remove() {
    this.button.destroy();
    this.destroy();
  }
}

module.exports = {
  Chest,
};
