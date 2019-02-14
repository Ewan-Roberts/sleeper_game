'use strict';

const { viewport         } = require('../../engine/viewport');
const { timer            } = require('../../engine/ticker');
const { radian           } = require('../../utils/math');
const {
  shoot_arrow_with_collision,
} = require('../../engine/ranged');
const { View_Aiming_Cone } = require('../../view/view_aiming_cone');

let arrow_speed = 5000;

//TODO move this out of here
const power_timer = timer.createTimer(500);
power_timer.loop = true;
power_timer.expire = true;
power_timer.on('repeat', elapsed => {
  if(arrow_speed < 1000) {
    arrow_speed = 300;
    return;
  }

  arrow_speed -= elapsed;
});

power_timer.on('stop', function() {
  this.remove();
});

class Mouse {
  constructor(entity) {
    this.name   = 'mouse';
    this.entity = entity;

    viewport.on('mouseup',   event => this.mouse_up(event));
    viewport.on('mousemove', event => this.mouse_move(event));
    viewport.on('mousedown', event => this.mouse_down(event));
  }

  mouse_up(event) {
    power_timer.stop();
    this.cone_timer.stop();
    this.entity.animation.idle();

    const target = event.data.getLocalPosition(viewport);

    const { ammo_type, weapon_speed } = this.entity.inventory;

    switch(ammo_type) {
      case 'arrow':
        shoot_arrow_with_collision(this.entity, target, weapon_speed);
        return;
    }
  }

  mouse_down(event) {
    arrow_speed = 3000;
    power_timer.start();
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
