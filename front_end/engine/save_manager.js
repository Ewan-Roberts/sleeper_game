'use strict';

const { save_user } = require('./socket');


class Game {
  constructor(player_data) {
    this.position  = {
      x: player_data.sprite.position.x,
      y: player_data.sprite.position.y,
    };

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
