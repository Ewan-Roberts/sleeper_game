'use strict';

const PIXI = require('pixi.js');

const { gui_container } = require('../engine/pixi_containers');
const { timer         } = require('../engine/ticker');

class Aiming_Cone {
  static start_at(point, rotation) {
    const cone        = this.add_at(point, rotation);
    const cone_timer  = timer.createTimer(50);
    cone_timer.repeat = 55;
    cone_timer.on('repeat', () => {
      cone.width  -= 8;
      cone.height += 6;
      cone.alpha  += 0.01;
    });

    cone_timer.on('stop', () => gui_container.removeChild(cone));

    return { cone_timer, cone };
  }

  static add_at(point, rotation) {
    const aiming_cone = PIXI.Sprite.fromFrame('yellow_triangle');

    aiming_cone.rotation = rotation;
    aiming_cone.height   = 800;
    aiming_cone.width    = 400;
    aiming_cone.anchor.x = 0.5;
    aiming_cone.alpha    = 0;
    //aiming_cone.filters = [new PIXI.filters.BlurFilter()];
    aiming_cone.name = 'aiming_cone';
    aiming_cone.position.set(point.x, point.y);

    gui_container.addChild(aiming_cone);
    return aiming_cone;
  }
}

module.exports = {
  Aiming_Cone,
};
