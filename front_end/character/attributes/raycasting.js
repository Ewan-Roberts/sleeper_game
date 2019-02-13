'use strict';

const PIXI = require('pixi.js');
const { timer                } = require('../../engine/ticker');
const { get_intersection     } = require('../../engine/raycasting');
const { raycasting_container } = require('../../engine/pixi_containers');


const raycast_timer = timer.createTimer(1000);
raycast_timer.repeat = 10;
raycast_timer.expire = true;

raycast_timer.on('end', () => {
  console.log('end end');
});
/*
 * @param {Object} PIXI.Sprite
 **/

class Raycasting {
  constructor(sprite) {
    this.raycast = new PIXI.Graphics();
    this.name = 'raycasting';
    this.sprite = sprite;
  }

  add(level_segments) {
    const points = [];
    level_segments.forEach(seg => points.push(seg.a,seg.b));

    //const light = this.sprite.getChildByName('light');
    //light.mask = raycast;
    // light._filters = [new PIXI.filters.BlurFilter(10)]; // test a filter

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

      for(let k=0; k < unique_angles.length; k++){
        const angle = unique_angles[k];
        const dx = Math.cos(angle);
        const dy = Math.sin(angle);
        const ray = {
          a: {x: this.sprite.x,       y: this.sprite.y},
          b: {x: this.sprite.x + dx,  y: this.sprite.y + dy},
        };

        let closest_intersect = null;
        for(let i=0; i < level_segments.length; i++){
          const intersect = get_intersection(ray, level_segments[i]);
          if(!intersect) continue;
          if(!closest_intersect || intersect.param<closest_intersect.param){
            closest_intersect = intersect;
          }
        }
        if(!closest_intersect) continue;

        closest_intersect.angle = angle;
        intersects.push(closest_intersect);
      }

      intersects = intersects.sort((a,b) => a.angle - b.angle);

      this.raycast.moveTo(intersects[0].x, intersects[0].y).lineStyle(0.5, 0xffd900, 5);

      for (let i = 0; i < intersects.length; i++) {
        this.raycast.lineTo(intersects[i].x, intersects[i].y);
      }

      //const player_sprite = viewport.getChildByName('player');
      //const player_position = player_sprite.getGlobalPosition();

      //if(this.sprite.getChildByName('sight_line').containsPoint(player_position) && raycast.containsPoint(player_position)){
      //  this.action_on_seeing_player(player_sprite);
      //}

      //if(this.sprite.getChildByName('influence_box').containsPoint(player_position) && raycast.containsPoint(player_position)){
      //  this.action_on_hearing_player(player_sprite);
      //}
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
