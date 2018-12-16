'use strict';

const viewport = require('../engine/viewport');

class Cutscene {
  constructor() {
    this.player = viewport.getChildByName('player');
  }

  teleport_player_to_point(x,y) {
    this.player.position.set(x,y);
  }

}

module.exports = {
  Cutscene,
};



