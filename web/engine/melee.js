const { tweenManager } = require('pixi.js');
const { Sprite, Texture } = require('pixi.js');
const { guis            } = require('./pixi_containers');
const { enemys          } = require('./pixi_containers');
const { players         } = require('./pixi_containers');
const { items           } = require('./pixi_containers');
const { damage_events   } = require('./damage_handler');
const { env             } = require('../../config');

class Box extends Sprite {
  constructor() {
    super(Texture.fromImage('black_dot'));
    this.name   = 'box';
    this.width  = 150;
    this.height = 50;
    this.anchor.set(0, 0.5);
    this.visible = env.dev;

    guis.addChild(this);
  }
}

class MeleeBox{
  slash(speed, damage, origin) {
    if(this.tween) this.tween.remove();
    this.box = new Box();
    this.box.position.copy(origin);
    this.box.alpha = 1;
    this.box.rotation = origin.rotation;

    this.tween        = tweenManager.createTween(this.box);
    this.tween.time   = 1000;
    this.tween.expire = true;
    this.tween.delay  = speed;

    this.tween.on('update', delta => {
      if(delta > this.tween.time) this.tween.remove();

      this.box.position.copy(origin);
      this.box.alpha = 1;
      this.box.rotation = origin.rotation;
      const player = players.children.find(player =>
        this.box.containsPoint(player.getGlobalPosition()));

      if(player) {
        if(player.id !== origin.id) {
          this.box.alpha = 0.2;
          damage_events.emit('damage', {id: player.id, damage});
          this.tween.active = false;
          this.tween.remove();
          return;
        }
      }

      const found = enemys.children.find(enemy => this.box.containsPoint(enemy.getGlobalPosition()));
      if(found) {
        if(found.id !== origin.id) {
          this.box.alpha = 0.2;
          damage_events.emit('damage', {id: found.id, damage});
          this.tween.active = false;
          this.tween.remove();
          return;
        }
      }

      const item = items.children.find(item=> this.box.containsPoint(item.getGlobalPosition()));
      if(item) {
        if(item.id !== origin.id) {
          this.box.alpha = 0.2;
          damage_events.emit('damage', {id: item.id, damage});
          this.tween.active = false;
          this.tween.remove();
          return;
        }
      }
    });

    this.tween.start();
  }
}


module.exports = {
  MeleeBox,
};
