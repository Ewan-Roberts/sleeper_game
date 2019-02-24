'use strict';

const { gui_container              } = require('../../engine/pixi_containers');
const { world                      } = require('../../engine/shadows');
const { shoot_arrow_with_collision } = require('../../engine/ranged');

const { View_Aiming_Cone } = require('../../view/view_aiming_cone');
const { radian           } = require('../../utils/math');

const cone = gui_container.children.find(elem => elem.name === 'aiming_cone');

class Mouse {
  constructor(entity) {
    this.name   = 'mouse';
    this.entity = entity;

    world.on('pointerup',   event => this._mouse_up(event));
    world.on('pointermove', event => this._mouse_move(event));
    world.on('pointerdown', event => this._mouse_down(event));
  }

  _mouse_up(event) {
    const mouse_position = event.data.getLocalPosition(world);
    const { ammo_type, weapon_speed } = this.entity.inventory;

    this.cone_timer.stop();
    this.entity.animation.idle();

    //TODO ammo management engine
    if(this.entity.keyboard.shift_pressed) {
      switch(ammo_type) {
        case 'arrow':
          shoot_arrow_with_collision(this.entity, mouse_position, weapon_speed);
          return;
      }
    }
  }

  _mouse_down(event) {
    const mouse_position = event.data.getLocalPosition(world);

    this.entity.animation.ready_weapon();
    this.entity.face_point(mouse_position);

    //TODO: this should be managed better it creates a timer each time
    this.cone_timer = View_Aiming_Cone.start_at(this.entity.sprite);
    this.cone_timer.start();
  }

  _mouse_move(event) {
    const mouse_position = event.data.getLocalPosition(world);
    this.entity.face_point(mouse_position);

    const rotation = radian(mouse_position, this.entity.sprite);
    cone.rotation = rotation - 1.57;
  }
}

module.exports = {
  Mouse,
};
