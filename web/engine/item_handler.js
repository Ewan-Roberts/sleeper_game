'use strict';
const event = require('events');
const { Item_Manager } = require('../items/item_manager');

const item_events   = new event();
const player_events = new event();
class PlayerEvents {
  constructor(player) {
    this.name = 'events';
    this.player_events = player_events;

    this.player_events.on('give_item', item => {
      player.inventory.give_item(item);
    });

    this.player_events.on('check_items', callback => {
      const result = player.inventory.take_items('blood');

      callback(result);
    });

    this.player_events.on('equip_weapon', item => {
      const found_item = Item_Manager.get_item_by_image_name(item.image_name);

      player.inventory.equip_weapon(found_item);

      player.animation.prefix = found_item.animation_name;
      player.animation.idle();
    });
  }
}

class Items {
  constructor(id) {
    this.items  = [];
    this.id     = id;
    this.events = item_events;
  }

  give(item) {
    this.items.push(item);
  }

  find(id) {
    this.items.find(item => item.id === id);
  }

  remove(id) {
    const index = this.items.findIndex(item => item.id === id);

    this.items.splice(index, 1);
  }

  includes(id) {
    this.items.some(item => item.id === id);
  }

  take_items(name) {
    const index = this.items.map(item => item.name).indexOf(name);
    const result = this.items.splice(index,1);

    return result;
  }
}

module.exports = {
  PlayerEvents,
  Items,
  item_events,
  player_events,
};
