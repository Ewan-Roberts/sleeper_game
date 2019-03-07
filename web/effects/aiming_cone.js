'use strict';
const PIXI = require('pixi.js');

const { visual_effects_container } = require('../engine/pixi_containers');

const { timer                    } = require('../engine/ticker');

//TODO this needs to be abstracted
const cone = PIXI.Sprite.fromFrame('yellow_triangle');
cone.alpha = 0;
cone.anchor.x = 0.5;
cone.name = 'aiming_cone';
visual_effects_container.addChild(cone);

class Aiming_Cone {
  static start_at(point) {
    cone.position.set(point.x, point.y);
    cone.height   = 800;
    cone.width    = 600;
    cone.alpha    = 0;

    const cone_timer  = timer.createTimer(50);
    cone_timer.repeat = 55;

    cone_timer.on('repeat', () => {
      cone.width  -= 12;
      cone.height += 6;
      cone.alpha  += 0.005;
    });

    cone_timer.on('stop', function() {
      this.remove();
      cone.alpha = 0;
    });

    cone_timer.on('end', function() {
      this.remove();
    });

    return cone_timer;
  }
}

module.exports = {
  Aiming_Cone,
};