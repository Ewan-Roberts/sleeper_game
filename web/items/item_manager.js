const { Sprite        } = require('pixi.js');
const { random_number } = require('../utils/math');
const { items         } = require('./data/item_data');

// Temp interface
// TODO It may be time to break this up
// need condition and options for items
class Item_Manager {
  static get_random_items(
    {
      min = 1,
      max = 2,
    } = {}
  ) {
    const number_of_items_to_return = random_number(min, max);
    const item_array = [];

    for(let i = 0; i < number_of_items_to_return; i++) {
      item_array.push(items[Math.floor(Math.random()*items.length)]);
    }

    return item_array;
  }

  static get_random_item() {
    const random_item = items[
      Math.floor(
        Math.random() * items.length
      )
    ];

    return random_item;
  }

  static get_item(name, { condition } = {}) {
    const found_item = items.find(item => (item.name === name || item.image_name === name));

    if(!found_item) throw new Error('No item found for ' + JSON.stringify(name));

    found_item.condition = condition;

    return found_item;
  }

  static get_item_by_id(id) {
    return items.find(item => item.id === id);
  }

  static get_all_items() {
    return items;
  }

  // TODO remove below, they are extracting image info
  static extract_image(name) {
    const found_sprite = new Sprite.fromFrame(name);

    // TODO
    const { renderer } = require('../engine/app');
    const image_from_spritesheet = renderer.plugins.extract.image(found_sprite);

    return image_from_spritesheet;
  }

  static extract_item_image_by_name(name) {
    const item = this.get_item(name);
    const image_name = item.image_name || name;

    if(!image_name) throw new Error('Can not find ' + name);

    const found_sprite = new Sprite.fromFrame(image_name);

    // TODO
    const { renderer } = require('../engine/app');
    const image_from_spritesheet = renderer.plugins.extract.image(found_sprite);

    return image_from_spritesheet;
  }

  static extract_image_by_item_object(item) {
    const found_sprite = new Sprite.fromFrame(item.image_name);

    // TODO
    const { renderer } = require('../engine/app');
    const image_from_spritesheet = renderer.plugins.extract.image(found_sprite);

    return image_from_spritesheet;
  }
}

module.exports = {
  Item_Manager,
};

