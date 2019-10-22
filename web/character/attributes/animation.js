const { radian } = require('../../utils/math');
const event               = require('events');

class Animation {
  constructor(sprite, frames) {
    this.name = 'animation';

    this.frames = frames;
    this.sprite = sprite;
    this.events = new event();
  }

  switch(action) {
    if(this.state === action) {
      return;
    }
    let mixed_action;
    if(this.prefix) {
      mixed_action = this.prefix + '_' + action;
    } else {
      mixed_action = action;
    }

    this.sprite.textures = this.frames[mixed_action];
    this.sprite.play();
    this.state = action;
  }
  face_point(point) {
    this.sprite.rotation = radian(point, this.sprite);
  }
  ready()  {
    this.switch('shoot');
  }
  wait()   {
    this.switch('wait');
  }
  idle()   {
    this.events.emit('idle');
    this.switch('idle');
  }
  eat()    {
    this.switch('eat');
  }
  move()   {
    this.switch('move');
  }
  walk()   {
    this.events.emit('walk');
    this.switch('move');
  }
  attack() {
    this.switch('attack');
  }
  set speed(value) {
    this.sprite.animationSpeed = value;
  }
  kill() {
    this.switch('death');
    this.sprite.loop = false;
  }
}

module.exports = {
  Animation,
};
