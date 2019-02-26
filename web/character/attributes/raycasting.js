'use strict';

const PIXI = require('pixi.js');

const { timer                } = require('../../engine/ticker');
const { get_intersection     } = require('../../engine/raycasting');
const { raycasting_container } = require('../../engine/pixi_containers');

class Raycasting {
  constructor(sprite) {
    this.raycast = new PIXI.Graphics();
    this.name    = 'raycasting';
    this.sprite  = sprite;
  }

  add(level_segments) {
    const raycast_timer  = timer.createTimer(80);
    raycast_timer.repeat = 80;
    raycast_timer.expire = true;

    const points = [];
    level_segments.forEach(seg => points.push(seg.a,seg.b));

    const light = this.sprite.getChildByName('light');
    if (light) light.mask = this.raycast;

    raycast_timer.on('repeat', () => {
      const unique_angles = [];
      let intersects = [];

      this.raycast.clear();
      this.raycast.beginFill(0xfffffff, 0.05);

      points.forEach(elem => {
        const angle = Math.atan2(elem.y - this.sprite.y, elem.x - this.sprite.x);
        elem.angle = angle;
        unique_angles.push(angle - 0.00001, angle + 0.00001);
      });

      unique_angles.forEach(angle => {
        const dx    = Math.cos(angle);
        const dy    = Math.sin(angle);
        const ray   = {
          a: {x: this.sprite.x,      y: this.sprite.y     },
          b: {x: this.sprite.x + dx, y: this.sprite.y + dy},
        };

        let closest_intersect = null;
        level_segments.forEach(segment => {
          const intersect = get_intersection(ray, segment);
          if(!intersect) return;
          if(!closest_intersect || intersect.param < closest_intersect.param){
            closest_intersect = intersect;
          }
        });

        if(!closest_intersect) return;

        closest_intersect.angle = angle;
        intersects.push(closest_intersect);
      });

      intersects = intersects.sort((a,b) => a.angle - b.angle);

      this.raycast.moveTo(intersects[0].x, intersects[0].y)
        .lineStyle(0.5, 0xffd900, 5);
      intersects.forEach(itersect => this.raycast.lineTo(itersect.x, itersect.y));
    });

    raycast_timer.start();
    raycasting_container.addChild(this.raycast);
  }

  contains_point(sprite) {
    const point = sprite.getGlobalPosition();

    return this.raycast.containsPoint(point);
  }
}

module.exports = {
  Raycasting,
};
