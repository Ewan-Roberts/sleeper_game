'use strict';
const event = require('events');
const { Item_Manager } = require('../items/item_manager');

const player_events = new event();

player_events.on('error', err => new Error(err));
class PlayerEvents {
  constructor(player) {
    this.name = 'events';

    player_events.on('give_item', item => {
      player.inventory.give_item(item);
    });

    player_events.on('check_items', callback => {
      const result = player.inventory.take_items('blood');

      callback(result);
    });

    player_events.on('equip_weapon', item => {
      const found_item = Item_Manager.get_item_by_image_name(item.image_name);

      player.inventory.equip_weapon(found_item);

      player.animation.prefix = found_item.animation_name;
      player.animation.idle();
    });
  }
}

module.exports = {
  PlayerEvents,
  player_events,
};
