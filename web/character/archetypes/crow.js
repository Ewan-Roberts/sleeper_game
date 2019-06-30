
const { Texture, tween, tweenManager, extras, sound } = require('pixi.js');

const { enemys    } = require('../../engine/pixi_containers');
const { radian    } = require('../../utils/math');
const { random_bound } = require('../../utils/math.js');
const { draw_path } = require('../../utils/line');
const { Animation } = require('../attributes/animation');
const { bird_frames } = require('../animations/bird');
const { rodent_frames     } = require('../animations/rat');

class PathSprite extends extras.AnimatedSprite {
  constructor(data) {
    super([Texture.fromFrame('bird_8')]);
    this.id    = data.id;
    this.name  = 'crow';

    this.rotation = 1;
    this.width    /= 2.5;
    this.height   /= 2.5;
    this.anchor.set(0.5);
    this.animationSpeed = 0.29;
    this.tween = tweenManager.createTween(this);

    this.position.copy(data);
    if(data.polyline) {
      this.path = data.polyline.map(({x,y})=>({x:this.x+x, y:this.y+y}));
    }
    this.turn = true;
    enemys.addChild(this);
  }

  set path(path_array) {
    this.tween.path = new tween.TweenPath();
    for (let i = 1; i < path_array.length; i++) {
      this.tween.path.arcTo(
        path_array[i-1].x,
        path_array[i-1].y,
        path_array[i].x,
        path_array[i].y,
        50);
    }

    this.tween.time = path_array.length*600;
  }

  set delay(value) {
    this.tween.delay = value;
  }

  start() {
    this.tween.start();
    this.tween.expire = true;
    this.animation.move();
    this.play();
    this.tween.on('end', () => {
      this.destroy();
      this.tween.remove();
    });
  }

  draw() {
    draw_path(this.tween.path);
  }

  set turn(bool) {
    if(!bool) return;

    this.tween.on('update', () => {
      this.rotation = radian(this, this.tween.path._tmpPoint) + 1.57;
    });
  }

  add_component(component) {
    this[component.name] = component;
  }
}

class PathCrow extends PathSprite {
  constructor(data) {
    super(data);
    this.add_component(new Animation(this, bird_frames));
    this.fly_sound = sound.find('birds_fly_away');
    this.fly_sound.volume = 0.40;
    this.wait();
  }

  wait() {
    this.animation.switch('wait');
    this.animationSpeed = 0.08;
    const random_start_frame = random_bound(0, 15);
    this.gotoAndPlay(random_start_frame);
  }

  talk() {
    this.fly_sound.play();
  }
}

class PathRat extends PathSprite {
  constructor(data) {
    super(data);
    this.add_component(new Animation(this, rodent_frames));
    this.animation.wait();
  }
}

module.exports = {
  PathCrow,
  PathRat,
};

