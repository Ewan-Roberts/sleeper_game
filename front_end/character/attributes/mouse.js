'use strict';

const { gui_container } = require('../../engine/pixi_containers');
const { viewport         } = require('../../engine/viewport');
const { radian           } = require('../../utils/math');
const {
  shoot_arrow_with_collision,
} = require('../../engine/ranged');
const { View_Aiming_Cone } = require('../../view/view_aiming_cone');

const cone = gui_container.children.find(elem => elem.name === 'aiming_cone');

class Mouse {
  constructor(entity) {
    this.name   = 'mouse';
    this.entity = entity;

    viewport.on('mouseup',   event => this.mouse_up(event));
    viewport.on('mousemove', event => this.mouse_move(event));
    viewport.on('mousedown', event => this.mouse_down(event));
  }

  mouse_up(event) {
    this.cone_timer.stop();
    this.entity.animation.idle();

    const mouse_position = event.data.getLocalPosition(viewport);
    const { ammo_type, weapon_speed } = this.entity.inventory;

    switch(ammo_type) {
      case 'arrow':
        shoot_arrow_with_collision(this.entity, mouse_position, weapon_speed);
        return;
    }
  }

  mouse_down(event) {
    const mouse_position = event.data.getLocalPosition(viewport);
    const direction      = radian(mouse_position, this.entity.sprite);

    this.entity.animation.ready_weapon();
    this.entity.sprite.rotation = direction;

    this.cone_timer = View_Aiming_Cone.start_at(this.entity.sprite);

    this.cone_timer.start();
  }

  mouse_move(event) {
    const mouse_position = event.data.getLocalPosition(viewport);
    const rotation = radian(mouse_position, this.entity.sprite);

    this.entity.sprite.rotation = rotation;

    cone.rotation = rotation - 1.57;
  }
}

module.exports = {
  Mouse,
};
