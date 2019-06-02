'use strict';
const { tweenManager }= require('pixi.js');
const { Sprite } = require('pixi.js');
const { items  } = require('./pixi_containers');
const { enemys } = require('./pixi_containers');
const { damage_events } = require('./damage_handler');

const enemies = enemys.children;

class Box{
  constructor() {
    this.name = 'box';
    this.sprite = new Sprite.fromFrame('black_dot');
    this.sprite.width  = 150;
    this.sprite.height = 50;
    this.sprite.anchor.x = 0;
    this.sprite.anchor.y = 0.5;

    items.addChild(this.sprite);
  }
  set rotation(value) {
    this.sprite.rotation = value;
  }

  set_position({x, y}) {
    this.sprite.position.set(x, y);
  }
}

class MeleeBox{
  constructor() {
    this.box = new Box();
  }

  slash(speed, damage, origin) {
    if(this.tween) this.tween.remove();
    this.box.rotation = origin.rotation;
    this.tween        = tweenManager.createTween(this.box.sprite);
    this.tween.time   = 1000;
    this.tween.expire = true;
    this.tween.delay  = speed;

    this.tween.on('update', delta => {
      if(delta > this.tween.time) this.tween.remove();

      this.box.set_position(origin);
      this.box.sprite.alpha = 1;
      this.box.rotation = origin.rotation;
      const found = enemies.find(enemy => this.box.sprite.containsPoint(enemy.getGlobalPosition()));
      if(found) {
        this.box.sprite.alpha = 0.2;
        damage_events.emit('damage', {id: found.id, damage});
        this.tween.active = false;
        this.tween.remove();
      }
    });
    this.tween.start();
  }
}


module.exports = {
  MeleeBox,
};
