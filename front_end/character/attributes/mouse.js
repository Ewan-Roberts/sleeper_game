'use strict';

const { viewport         } = require('../../engine/viewport');
const { radian           } = require('../../utils/math');
const { shoot_arrow      } = require('../../engine/bow');
const { View_Aiming_Cone } = require('../../view/view_aiming_cone');

class Mouse {
  constructor(entity) {
    this.name   = 'mouse';
    this.entity = entity;

    viewport.on('mouseup',   event => this.mouse_up(event));
    viewport.on('mousemove', event => this.mouse_move(event));
    viewport.on('mousedown', event => this.mouse_down(event));
  }

  mouse_up(event) {
    this.entity.animation.idle();
    this.cone_timer.stop();

    const target = event.data.getLocalPosition(viewport);
    const origin = this.entity.sprite;

    const { equipped_weapon } = this.entity.inventory;
    const { power           } = this.entity.vitals;

    //TODO: consider weapon management system
    switch(equipped_weapon) {
      case 'bow': shoot_arrow(power, origin, target); return;
    }
  }

  mouse_down(event) {
    const mouse_position = event.data.getLocalPosition(viewport);
    const direction      = radian(mouse_position, this.entity.sprite);

    this.entity.animation.ready_weapon();
    this.entity.sprite.rotation = direction;

    const { cone_timer, cone } =
      View_Aiming_Cone.start_at(this.entity.sprite, direction - 1.57);

    //TODO remove cone manageemnt out of here
    this.cone_timer = cone_timer;
    this.cone       = cone;
    this.cone_timer.start();
  }

  mouse_move(event) {
    const mouse_position = event.data.getLocalPosition(viewport);

    this.entity.sprite.rotation = radian(mouse_position, this.entity.sprite);

    //TODO remove -1.57
    if(this.cone) {
      this.cone.rotation = this.entity.sprite.rotation - 1.57;
    }
  }
}

module.exports = {
  Mouse,
};
