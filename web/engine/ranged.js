const { Sprite, Texture, tweenManager } = require('pixi.js');
const { radian        } = require('../utils/math');
const { damage_events } = require('./damage_handler');

// TODO
const { items      } = require('./pixi_containers');
const { collisions } = require('./pixi_containers');
const { enemys     } = require('./pixi_containers');

const objects  = collisions.children;
const enemies  = enemys.children;

class Arrow extends Sprite {
  constructor() {
    super(Texture.fromImage('arrow'));
    this.name    = 'arrow';
    this.width  /= 6;
    this.height /= 6;
    this.anchor.set(1);

    this.tween = tweenManager.createTween(this);
    items.addChild(this);
  }
}

function shoot_arrow(speed, damage, origin, point) {
  const arrow    = new Arrow();
  arrow.rotation = radian(point, origin);
  arrow.tween.from(origin);
  arrow.tween.to(point);
  arrow.tween.time = speed * 2;

  arrow.tween.on('update', () => {
    const arrow_point = arrow.getGlobalPosition();

    const collision_object = objects.find(object => object.containsPoint(arrow_point));
    if(collision_object) {
      arrow.tween.stop();
      damage_events.emit('damage', { 'id': collision_object.id, damage });
      return;
    }

    const collision_enemies = enemies.find(enemy => enemy.containsPoint(arrow_point));
    if(collision_enemies) {
      if(collision_enemies.id === origin.id) {
        return;
      }
      if(!collision_enemies.dead) {
        arrow.tween.stop();
        damage_events.emit('damage', { 'id': collision_enemies.id, damage });
        return;
      }
    }
  });

  arrow.tween.start();
}

module.exports = {
  shoot_arrow,
};

