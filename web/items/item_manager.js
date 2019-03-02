
'use strict';
const PIXI = require('pixi.js');

const app  = require('../engine/app');

const { items } = require('./data/item_data');

const {
  generate_number_between_min_and_max,
} = require('../utils/math');

class Item_Manager {
  static get_random_items(max) {
    const number_of_items_to_return = generate_number_between_min_and_max(1, max|2);

    const item_array = [];

    for(let i = 0; i < number_of_items_to_return; i++) {
      item_array.push(items[Math.floor(Math.random()*items.length)]);
    }

    return item_array;
  }

  static get_item(name) {
    let found_item = items.find(item => item.name === name);

    if(!found_item) found_item = items.find(item => item.item_name === name);

    if(!found_item) throw new Error('No item found for ' + JSON.stringify( name ));

    return found_item;
  }

  static get_item_by_name(name) {
    const found_item = items.find(item => item.name === name);

    if(!found_item) throw new Error('no item found based on name ' + name);

    return found_item;
  }

  static get_item_by_id(id) {
    return items.find(item => item.id === id);
  }

  static extract_item_image_by_name(name) {
    const item = this.get_item_by_name(name);
    const image_name = item ? item.image_name: name;

    if(!image_name) throw new Error('Can not find ' + name);

    const found_sprite = PIXI.Sprite.fromFrame(image_name);
    const image_from_spritesheet = app.renderer.plugins.extract.image(found_sprite);

    return image_from_spritesheet;
  }

  static extract_image_by_item_object(item) {
    const found_sprite = PIXI.Sprite.fromFrame(item.image_name);

    const image_from_spritesheet = app.renderer.plugins.extract.image(found_sprite);

    return image_from_spritesheet;
  }
}

module.exports = {
  Item_Manager,
};

