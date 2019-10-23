const { Texture, tween, tweenManager, extras } = require('pixi.js');

const { World } = require('../../engine/pixi_containers');
const { radian    } = require('../../utils/math');
const { draw_path } = require('../../utils/line');

class PathSprite extends extras.AnimatedSprite {
  constructor({
    image_name,
    id,
    speed = 600,
    y,
    x,
    polyline,
  }) {
    super([ Texture.fromFrame(image_name || 'bird_8') ]);
    this.id = id;

    this.rotation = 1;
    this.anchor.set(0.5);
    this.animationSpeed = 0.29;
    this.tween = tweenManager.createTween(this);
    this.speed = speed;

    this.position.copy({ x, y });
    if(polyline) {
      this.path = polyline.map(({ x, y }) => ({ 'x': this.x + x, 'y': this.y + y }));
    }
    this.turn = true;
    World.add_to('enemy', this);
  }

  set path(path_array) {
    this.tween.path = new tween.TweenPath();
    for (let i = 1; i < path_array.length; i++) {
      this.tween.path.arcTo(
        path_array[i - 1].x,
        path_array[i - 1].y,
        path_array[i].x,
        path_array[i].y,
        50);
    }

    this.tween.time = path_array.length * this.speed;
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
    if(!bool) {
      return;
    }
    if(!this.tween.path) {
      return;
    }

    this.tween.on('update', () => {
      this.rotation = radian(this, this.tween.path._tmpPoint) + 1.57;
    });
  }

  add_component(component) {
    this[component.name] = component;
  }
}

module.exports = {
  PathSprite,
};

