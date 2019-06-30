const { tweenManager }= require('pixi.js');
const { Sprite, Texture } = require('pixi.js');
const { guis } = require('./pixi_containers');
const { enemys } = require('./pixi_containers');
const { damage_events } = require('./damage_handler');

const enemies = enemys.children;

class Box extends Sprite {
  constructor() {
    super(Texture.fromImage('black_dot'));
    this.name   = 'box';
    this.width  = 150;
    this.height = 50;
    this.anchor.set(0, 0.5);
    this.visible = false;

    guis.addChild(this);
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

      this.box.position.set(origin);
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
