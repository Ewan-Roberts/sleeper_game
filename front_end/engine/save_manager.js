'use strict';

const { save_user } = require('../utils/socket');

class Game {
  constructor(player_data) {
    this.position  = {
      x: player_data.sprite.position.x,
      y: player_data.sprite.position.y,
    };
    //TODO: for testing
    this.user_name = 'ewan';
    this.inventory = player_data.inventory;
    this.vitals    = player_data.vitals;
  }

  static save(player_data) {
    const save_data = new Game(player_data);

    save_user(save_data);
  }
}

module.exports = {
  Game,
};
