
'use strict';
const PIXI = require('pixi.js');

const app               = require('../engine/app');
const { random_number } = require('../utils/math');
const { items         } = require('./data/item_data');

//TODO This needs to be broken down
//Consider this interface

// function condition () {}
// function cost() {}
// function cost() {}
// function rank() {}

// class Item {
//   pool(...args) {}
//   id() {}
//   melee() {}
//   ranged() {}
//   primary() {}
//   secondary() {}
//   material() {}
//   hat() {}
//   head() {}
//   slot() {}
//   feet() {}
//   chest() {}
//   util() {}
//   type() {}
//   all() {}
//   extract_image() {}
//   by_name() {}
//   by_image_name() {}
//   random() {}
// }

// const { Image } = require('../engine/image');

// const knife = {
//   name:           'rusty_knife',
//   animation_name: 'knife',
//   id:             1001,
//   rank:           0,
//   cost:           50,
//   category:       'primary',
//   range:          20,
//   damage:         10,
//   speed:          400,
//   condition:      100,

//   visual_name:    'rusty knife',
//   description:    'The rusty knife someone sharpened on what looks like a rock',
//   image_name:     'rusty_knife',
// };

// class Item {
//   constructor(attribute) {
//     this.name        = attribute.name;
//     this.visual      = attribute.visual;
//     this.image       = new Image(attribute.name);

//     this.id          = attribute.id;
//     this.cost        = attribute.cost;
//     this.category    = attribute.category;
//     this.description = attribute.description;
//   }

// }

// class Weapon extends Item {
//   constructor(...args) {
//     super(...args);
//     this.rank        = args[0].rank;
//     this.range       = args[0].range;
//     this.damage      = args[0].damage;
//     this.speed       = args[0].speed;
//     this.condition   = args[0].condition;
//   }
// }

// module.exports = {
//   Weapon,
// };

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

