'use strict';

const { viewport          } = require('../../engine/viewport');
const { radian            } = require('../../engine/math');

class Mouse {
  constructor(entity) {
    this.name   = 'mouse_manager';
    this.entity = entity;

    viewport.on('mouseup',   event => this.mouse_up(event));
    viewport.on('mousemove', event => this.mouse_move(event));
    viewport.on('mousedown', event => this.mouse_down(event));
  }

  mouse_up() {
    //TODO
  }

  mouse_down(event) {
    const mouse_position_player = event.data.getLocalPosition(viewport);

    this.entity.sprite.rotation = radian(mouse_position_player, this.entity.sprite);
  }

  mouse_move(event) {
    const mouse_position_player = event.data.getLocalPosition(viewport);

    this.entity.sprite.rotation = radian(mouse_position_player, this.entity.sprite);
  }
}

module.exports = {
  Mouse,
};
