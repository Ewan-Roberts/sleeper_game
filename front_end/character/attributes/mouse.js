'use strict';

const { viewport         } = require('../../engine/viewport');
const { radian           } = require('../../engine/math');
const { arrow_management } = require('../../engine/bow');
const { Aiming_Cone      } = require('../../view/view_aiming_cone');

class Mouse {
  constructor({ vitals, sprite, animation }) {
    this.name   = 'mouse';
    this.vitals    = vitals;
    this.sprite    = sprite;
    this.animation = animation;

    viewport.on('mouseup',   event => this.mouse_up(event));
    viewport.on('mousemove', event => this.mouse_move(event));
    viewport.on('mousedown', event => this.mouse_down(event));
  }

  mouse_up(event) {
    this.animation.idle();
    this.cone_timer.stop();

    const target = event.data.getLocalPosition(viewport);
    const origin = this.sprite;

    const { equiped_weapon } = this.inventory;
    const { power          } = this.vitals;

    switch(equiped_weapon) {
      case 'bow': arrow_management(power, origin, target); return;
    }
  }

  mouse_down(event) {
    const mouse_position = event.data.getLocalPosition(viewport);
    const direction = radian(mouse_position, this.sprite);

    this.animation.ready_weapon();

    this.sprite.rotation = direction;

    const { cone_timer, cone } =
      Aiming_Cone.start_at(this.sprite, direction - 1.57);

    this.cone_timer = cone_timer;
    this.cone = cone;
    this.cone_timer.start();
  }

  mouse_move(event) {
    const mouse_position = event.data.getLocalPosition(viewport);

    this.sprite.rotation = radian(mouse_position, this.sprite);

    if(this.cone) {
      this.cone.rotation = this.sprite.rotation - 1.57;
    }
  }
}

module.exports = {
  Mouse,
};
