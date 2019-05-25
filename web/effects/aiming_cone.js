'use strict';
const { Sprite, tweenManager } = require('pixi.js');

const { visuals } = require('../engine/pixi_containers');

//TODO this needs to be abstracted
const cone = new Sprite.fromFrame('yellow_triangle');
cone.alpha = 0;
cone.anchor.x = 0.5;
cone.name = 'aiming_cone';
visuals.addChild(cone);

//TODO use tween to and from
class Aiming_Cone {
  static start_at(point) {
    cone.position.set(point.x, point.y);
    cone.height   = 800;
    cone.width    = 600;
    cone.alpha    = 0;

    const cone_timer  = tweenManager.createTween(cone);
    cone_timer.repeat = 55;
    cone_timer.expire = true;

    cone_timer.on('repeat', () => {
      cone.width  -= 12;
      cone.height += 6;
      cone.alpha  += 0.005;
    });

    cone_timer.on('stop', function() {
      this.remove();
      cone.alpha = 0;
    });

    return cone_timer;
  }
}

module.exports = {
  Aiming_Cone,
};
