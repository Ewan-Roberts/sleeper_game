'use strict';

const { save_user } = require('../vendor/socket');

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

  static over() {
    throw 'GAME OVER';
  }
}

module.exports = {
  Game,
};
