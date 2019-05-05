'use strict';
const { Sprite } = require('pixi.js');

const { renderer }      = require('../engine/app');
const { random_number } = require('../utils/math');
const { items         } = require('./data/item_data');

class Item_Manager {
  static get_random_items(max = 2) {
    const number_of_items_to_return = random_number(1, max);
    const item_array = [];

    for(let i = 0; i < number_of_items_to_return; i++) {
      item_array.push(items[Math.floor(Math.random()*items.length)]);
    }

    return item_array;
  }

  static get_item(name) {
    const found_item = items.find(item => (item.name === name || item.image_name === name));

    if(!found_item) throw new Error('No item found for ' + JSON.stringify( name ));

    return found_item;
  }

  static get_item_by_name(name) {
    const found_item = items.find(item => item.name === name);

    if(!found_item) throw new Error('no item found based on name ' + name);

    return found_item;
  }

  static get_item_by_image_name(name) {
    const found_item = items.find(item => item.image_name === name);

    if(!found_item) throw new Error('no item found based on image_name ' + name);

    return found_item;
  }

  static get_item_by_id(id) {
    return items.find(item => item.id === id);
  }

  static extract_item_image_by_name(name) {
    const item = this.get_item_by_name(name);
    const image_name = item ? item.image_name: name;

    if(!image_name) throw new Error('Can not find ' + name);

    const found_sprite = new Sprite.fromFrame(image_name);
    const image_from_spritesheet = renderer.plugins.extract.image(found_sprite);

    return image_from_spritesheet;
  }

  static extract_image_by_item_object(item) {
    const found_sprite = new Sprite.fromFrame(item.image_name);

    const image_from_spritesheet = renderer.plugins.extract.image(found_sprite);

    return image_from_spritesheet;
  }
}

module.exports = {
  Item_Manager,
};

