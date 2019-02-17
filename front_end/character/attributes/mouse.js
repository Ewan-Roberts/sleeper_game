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

    world.on('pointerup',   event => this.mouse_up(event));
    world.on('pointermove', event => this.mouse_move(event));
    world.on('pointerdown', event => this.mouse_down(event));
  }

  mouse_up(event) {
    if(!this.entity.mouse) return;

    this.cone_timer.stop();
    this.entity.animation.idle();

    const mouse_position = event.data.getLocalPosition(world);
    const { ammo_type, weapon_speed } = this.entity.inventory;

    switch(ammo_type) {
      case 'arrow':
        shoot_arrow_with_collision(this.entity, mouse_position, weapon_speed);
        return;
    }
  }

  mouse_down(event) {
    if(!this.entity.mouse) return;

    const mouse_position = event.data.getLocalPosition(world);
    const direction      = radian(mouse_position, this.entity.sprite);

    this.entity.animation.ready_weapon();
    this.entity.sprite.rotation = direction;

    this.cone_timer = View_Aiming_Cone.start_at(this.entity.sprite);

    this.cone_timer.start();
  }

  mouse_move(event) {
    if(!this.entity.mouse) return;
    const mouse_position = event.data.getLocalPosition(world);

    const rotation = radian(mouse_position, this.entity.sprite);

    this.entity.sprite.rotation = rotation;

    cone.rotation = rotation - 1.57;
  }
}

module.exports = {
  Mouse,
};
