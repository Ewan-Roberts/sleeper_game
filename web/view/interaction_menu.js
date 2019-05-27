'use strict';

const { Item_Manager } = require('../items/item_manager');
// const { Item_Menu    } = require('./item_menu');
const { Items        } = require('../engine/item_handler');
const { select, select_all } = require('../utils/dom');

function get_node_dimensions(div) {
  const style = global.window.getComputedStyle(div, null);

  return {
    height: style.getPropertyValue('height').replace('px', ''),
    width:  style.getPropertyValue('width').replace('px', ''),
  };
}

function insert_all_div_with_image(class_name, image_name) {
  const selected_divs = select_all(class_name);

  selected_divs.forEach(div => {
    const image = Item_Manager.extract_item_image_by_name(image_name);

    div.appendChild(image);
  });
}

class Interaction_Menu {
  constructor() {
    this.menu_container = select('.interaction_inventory');
    this.visual = select('.interaction_inventory .visual');
    this.describe = select('.interaction_inventory .describe');
    this.inventory_slots = select_all('.interaction_item');

    this.manager = new Items();
    this.manager.events.on('interaction', item => {
      this.manager.give(item);
      this.manager.items.forEach(item => this.populate(item));
    });

    this.menu_container.onmouseleave = () => this.hide();
  }

  show() {
    this.menu_container.style.display = 'block';
  }

  hide() {
    this.menu_container.style.display = 'none';
  }

  image(image_name) {
    // clear
    this.visual.removeChild(this.visual.firstChild);

    const image  = Item_Manager.extract_image(image_name);
    image.width  = this.visual.clientWidth;
    image.height = this.visual.clientHeight;
    this.visual.appendChild(image);
  }

  decription(text) {
    // clear
    this.describe.removeChild(this.describe.firstChild);

    const option_text = global.document.createTextNode(text);

    this.describe.appendChild(option_text);
  }

  populate(item) {
    this.clear();
    const first_free_slot = Array.from(this.inventory_slots)
      .find(slot => slot.childElementCount === 0);

    if(!first_free_slot) {
      throw new Error('there are no free slots!');
    }
    const { height, width } = get_node_dimensions(first_free_slot);

    const image  = Item_Manager.extract_image_by_item_object(item);
    image.height = height;
    image.width  = width;

    first_free_slot.appendChild(image);

    // const menu = new Item_Menu();
    // image.oncontextmenu = ({clientX,clientY}) => {
    //   menu.set_position({
    //     x: clientX,
    //     y: clientY,
    //   });

    //   menu.populate(item);
    //   menu.show();
    //   return false;
    // };

    return image;
  }

  fill_inventory(image_name) {
    insert_all_div_with_image('.interaction_item', image_name);
  }

  clear () {
    this.inventory_slots.forEach(slot => {
      if(slot.firstChild) slot.firstChild.remove();
    });
  }
}

module.exports = {
  Interaction_Menu,
};
