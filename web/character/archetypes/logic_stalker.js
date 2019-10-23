const { LogicZombie              } = require('./logic_zombie');
const { random_word         } = require('../../effects/floor_word.js');
const { FadeSprite          } = require('../../effects/fade_sprite.js');
const { World } = require('../../engine/pixi_containers');
const { sound, tweenManager } = require('pixi.js');

class Stalker extends LogicZombie {
  constructor(data, target) {
    super(data);
    this.visible     = false;
    this.floor_words = false;
    this.target(target);

    this._set_sound();
  }

  _set_sound() {
    this.honk = sound.find('honk');
  }

  set floor_hands(value) {
    if(!value) {
      this.destroy();
    }

    this.hand_tween      = tweenManager.createTween(this);
    this.hand_tween.loop = true;
    this.hand_tween.time = 100;
    this.hand_tween.expire = true;

    let hand_state = true;
    this.hand_tween.on('repeat', () => {
      const hands = new FadeSprite({
        ...this,
        'image_name': hand_state ? 'left_hand' : 'right_hand',
        'width'     : 35,
        'height'    : 35,
      });
      hands.rotation = this.rotation + 1.5,
      hands.position.copy(this);
      hands.fade_out(1000);

      World.add_to('decal', hands);

      if(this.floor_words) {
        random_word({
          'point'    : this,
          'size'     : 10,
          'closeness': 40,
        });
      }

      hand_state = !hand_state;
    });

    this.hand_tween.start();
  }

  talk() {
    this.honk.play();
  }

  remove() {
    if(this.hand_tween) {
      this.hand_tween.remove();
    }
    this.remove_next_tick = true;
    this.tween.remove();
  }
}

module.exports = {
  Stalker,
};
