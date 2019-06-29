'use strict';

const { Walker              } = require('./rat');
const { random_word         } = require('../../effects/floor_word.js');
const { FadeSprite          } = require('../../effects/fade_sprite.js');
const { decals              } = require('../../engine/pixi_containers');
const { sound, tweenManager } = require('pixi.js');

class Stalker extends Walker {
  constructor(data, target) {
    super(data);
    this.visible     = false;
    this.floor_words = false;
    this.target      = target;

    this._set_sound();
  }

  _set_sound() {
    this.honk = sound.find('honk');
  }

  set floor_hands(value) {
    if(!value) this.destroy();

    this.hand_tween = tweenManager.createTween(this);
    this.hand_tween.loop = true;
    this.hand_tween.time = 300;
    this.hand_tween.expire = true;

    let hand_state = true;
    this.hand_tween.on('repeat',() => {
      const hands = new FadeSprite({
        ...this,
        image_name: hand_state?'left_hand':'right_hand',
        width:  35,
        height: 35,
      });
      hands.rotation = this.rotation + 1.5,
      hands.position.copy(this);

      decals.addChild(hands);

      hands.fade_out(2000);
      hand_state = !hand_state;

      if(this.floor_words) random_word(this,10, 40);
    });

    this.hand_tween.start();
  }

  talk() {
    this.honk.play();
  }

  remove() {
    this.hand_tween.remove();
    this.remove_next_tick = true;
    this.tween.remove();
  }
}

module.exports = {
  Stalker,
};
