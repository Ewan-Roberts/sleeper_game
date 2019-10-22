const { tweenManager } = require('pixi.js');
const { Sprite, Texture } = require('pixi.js');
const { guis            } = require('./pixi_containers');
const { enemys          } = require('./pixi_containers');
const { players         } = require('./pixi_containers');
const { items           } = require('./pixi_containers');
const { damage_events   } = require('./damage_handler');
const { env             } = require('../../config');

class Box extends Sprite {
  constructor(speed) {
    super(Texture.fromImage('black_dot'));
    this.name    = 'box';
    this.width   = 100;
    this.height  = 50;
    this.visible = env.dev;
    this.alpha   = 0.2;
    this.anchor.set(0, 0.5);

    this.tween        = tweenManager.createTween(this);
    this.tween.time   = 400;
    this.tween.delay  = speed;
    this.tween.expire = true;

    guis.addChild(this);
  }

  destroy() {
    super.destroy();
    this.tween.remove();
  }
}

class MeleeBox{
  constructor () {
    this.name = 'melee';
  }

  slash(speed, damage, origin) {
    this.box = new Box(speed);
    this.box.position.copy(origin);
    this.box.rotation = origin.rotation;
    this.box.renderable = false;

    this.box.tween.on('end', () => {
      if(this.box._destroyed) {
        return;
      }
      this.box.destroy();
    });

    this.box.tween.on('update', () => {
      this.box.renderable = true;
      // TODO remove reliance on transform
      if(!this.box.transform) {
        return;
      }

      this.box.position.copy(origin);
      this.box.rotation = origin.rotation;
      const player = players.children.find(player =>
        this.box.containsPoint(player.getGlobalPosition()));

      if(player) {
        if(player.id !== origin.id) {
          damage_events.emit('damage', { 'id': player.id, damage });
          this.box.destroy();
          return;
        }
      }

      const found = enemys.children.find(enemy => this.box.containsPoint(enemy.getGlobalPosition()));
      if(found) {
        if(found.id !== origin.id) {
          damage_events.emit('damage', { 'id': found.id, damage });
          this.box.destroy();
          return;
        }
      }

      const item = items.children.find(item => this.box.containsPoint(item.getGlobalPosition()));
      if(item) {
        if(item.id !== origin.id) {
          damage_events.emit('damage', { 'id': item.id, damage });
          this.box.destroy();
          return;
        }
      }
    });

    this.box.tween.start();
  }
}


module.exports = {
  MeleeBox,
};
