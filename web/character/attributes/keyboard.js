const { keyboardManager } = require('pixi.js');
const { env             } = require('../../../config');
const { viewport        } = require('../../engine/app');

const {
  collisions,
  items,
  borders,
  pads,
} = require('../../engine/pixi_containers');

function point_collides(position) {
  const collision_hit = collisions.children.find(child => child.containsPoint(position));
  if(collision_hit) return true;

  const border_hit = borders.children.find(child => child.containsPoint(position));
  if(border_hit) return true;

  const item_hit = items.children.find(child => child.containsPoint(position));
  if(item_hit) return true;

  return false;
}

//TODO this could be more performant using proximity
//and this logic should be split out or put in ceiling
function point_contains(player) {
  const point = player.getGlobalPosition();
  const pad = pads.children.find(child => child.containsPoint(point));
  if(pad) {
    player.animation.speed = 0.60;
    pad.events.emit('trigger');
    return pad.speed;
  }

  if(env.dev) return 30;
  return 3;
}

class Keyboard {
  constructor(sprite) {
    const { animation, vitals, inventory} = sprite;
    this.name           = 'keyboard';
    this.sprite         = sprite;
    this.animation      = animation;
    this.speed          = vitals.speed;
    this.buffer         = 15;
    this.vitals         = vitals;
    this.inventory      = inventory;

    keyboardManager.on('down',     key => this.key_down(key));
    keyboardManager.on('released', () => this.key_up());

    if(env.dev) this._set_dev_settings();
  }

  destroy() {
    keyboardManager.removeAllListeners();
  }

  key_down(key) {
    if(!keyboardManager.isEnabled) return;
    this.establish_direction();

    switch(key) {
      case 87: return this.keyboard_up();    // w
      case 83: return this.keyboard_down();  // s
      case 65: return this.keyboard_left();  // a
      case 68: return this.keyboard_right(); // d
    }
  }

  key_up() {
    // TODO abstract
    const w = keyboardManager.isDown(87);
    const a = keyboardManager.isDown(65);
    const s = keyboardManager.isDown(83);
    const d = keyboardManager.isDown(68);
    if(!w && !a && !s && !d) this.animation.idle();
  }

  establish_direction() {
    const w = keyboardManager.isDown(87);
    const a = keyboardManager.isDown(65);
    const s = keyboardManager.isDown(83);
    const d = keyboardManager.isDown(68);
    if(w && a) return this.sprite.rotation = -2.5;
    if(w && d) return this.sprite.rotation = -0.8;
    if(s && a) return this.sprite.rotation = 2.5;
    if(s && d) return this.sprite.rotation = 1;
    if(w)      return this.sprite.rotation = -2;  // up
    if(a)      return this.sprite.rotation = -3;  // left
    if(s)      return this.sprite.rotation = 1.5; // down
    if(d)      return this.sprite.rotation = 0;   // right
  }


  increase_run_speed() {
    if(env.keyboard_additions) return;
    this.speed *= 1.5;
  }

  disable_for(time) {
    keyboardManager.disable();
    setTimeout(()=> keyboardManager.enable(), time);
  }

  enable() {
    keyboardManager.enable();
  }

  disable() {
    keyboardManager.disable();
  }

  keyboard_up() {
    const point = this.sprite.getGlobalPosition();
    point.y -= this.buffer;
    if(point_collides(point)) return this.animation.idle();

    this.speed = point_contains(this.sprite);
    this.sprite.y -= this.speed;
    // this.animation.walk();
    viewport.moveCenter(this.sprite.x, this.sprite.y);
  }

  keyboard_down() {
    const point = this.sprite.getGlobalPosition();
    point.y += this.buffer;
    if(point_collides(point)) return this.animation.idle();

    this.speed = point_contains(this.sprite);
    this.sprite.y += this.speed;
    // this.animation.walk();
    viewport.moveCenter(this.sprite.x, this.sprite.y);
  }

  keyboard_left() {
    const point = this.sprite.getGlobalPosition();
    point.x -= this.buffer;

    if(point_collides(point)) return this.animation.idle();

    this.speed = point_contains(this.sprite);
    this.sprite.x -= this.speed;
    // this.animation.walk();

    viewport.moveCenter(this.sprite.x, this.sprite.y);
  }

  keyboard_right() {
    const point = this.sprite.getGlobalPosition();
    point.x += this.buffer;
    if(point_collides(point)) return this.animation.idle();

    this.speed = point_contains(this.sprite);
    this.sprite.x += this.speed;
    // this.animation.walk();
    viewport.moveCenter(this.sprite.x, this.sprite.y);
  }

  _set_dev_settings() {
    keyboardManager.on('down', key => {
      switch(key) {
        // vim
        case 75: return this.keyboard_up();    // k
        case 74: return this.keyboard_down();  // j
        case 72: return this.keyboard_left();  // h
        case 76: return this.keyboard_right(); // l

        // below are for dev only
        case 81: return this.increase_run_speed(); // q for speed
      }
    });
  }
}

module.exports = {
  Keyboard,
};
