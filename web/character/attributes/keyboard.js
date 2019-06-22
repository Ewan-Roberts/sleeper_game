'use strict';
const { keyboardManager } = require('pixi.js');

const {
  collisions,
  borders,
  pads,
  shrouds,
} = require('../../engine/pixi_containers');

const { world            } = require('../../engine/shadows');
const { Player_Inventory } = require('../../view/view_player_inventory');
const { Interaction_Menu } = require('../../view/interaction_menu');

function point_collides(position) {
  const border_hit = borders.children.find(child => child.containsPoint(position));
  if(border_hit) return true;

  const collision_hit = collisions.children.find(child => child.containsPoint(position));
  if(collision_hit) return true;
  return false;
}

//TODO this could be more performant using proximity
//and this logic should be split out or put in ceiling
function point_contains(position) {
  const found = shrouds.children.find(child => child.containsPoint(position));
  if (found){
    if(found.remove_on_enter) {
      found.destroy();
      return;
    }
    if (found.alpha_on_enter) {
      found.alpha = (found.alpha !== found.alpha_on_enter)?found.alpha_on_enter:1;
    }
  }
}

function event_pad(position) {
  const { children } = pads;

  const pad = children.find(child => child.containsPoint(position));

  if(pad && pad.events) pad.events.emit('trigger');
  return pad;
}

class Keyboard {
  constructor(sprite) {
    const { animation, vitals, inventory} = sprite;
    this.name           = 'keyboard';
    this.animation      = animation;
    this.sprite         = sprite;
    this.speed          = vitals.speed;
    this.vitals         = vitals;
    this.buffer         = 50;
    this.inventory      = inventory;
    this.inventory_view = new Player_Inventory();
    this.interaction    = new Interaction_Menu();

    keyboardManager.on('down',     key => this.key_down(key));
    keyboardManager.on('released', () => this.key_up());

    if(global.env === 'dev') this._set_dev_settings();
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
    if(w && a) return this.animation.face_up_left();
    if(w && d) return this.animation.face_up_right();
    if(s && a) return this.animation.face_down_left();
    if(s && d) return this.animation.face_down_right();
    if(w)      return this.animation.face_up();
    if(a)      return this.animation.face_left();
    if(s)      return this.animation.face_down();
    if(d)      return this.animation.face_right();
  }


  increase_run_speed() {
    if(global.env !== 'dev') return;
    this.speed *= 1.5;
  }

  small_inventory() {
    if(global.env !== 'dev') return;
    this.disable();
    this.inventory_view.thin();
    this.inventory_view.toggle();
    this.inventory_view.add_primary_weapon(this.inventory.equipped);

    this.inventory_view.fill_inventory('bunny');
    this.inventory_view.character_tile('bunny');
  }

  large_inventory() {
    if(global.env !== 'dev') return;
    this.disable();
    this.inventory_view.thin();
    this.inventory_view.toggle();
    this.inventory_view.add_primary_weapon(this.inventory.equipped);
    const { items } = this.inventory;

    const slots = this.inventory_view.populate_with_items(items);
    slots.forEach(slot => {
      slot.click = () => {
        slot.remove();
        this.inventory.remove(slot.id);
      };
    });
  }

  open_interaction() {
    if(global.env !== 'dev') return;
    this.disable();
    this.inventory_view.wide();
    this.inventory_view.toggle();
    this.interaction.show();
    this.interaction.image('bunny');
    this.interaction.decription('its a fireplace');

    this.inventory.items.forEach(item => this.interaction.populate(item));
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

    point_contains(point);
    const pad = event_pad(point);
    if(pad && pad.speed) {
      this.speed = pad.speed;
      this.sprite.animationSpeed = 0.60;
    }
    else {
      this.sprite.animationSpeed = 0.70;
      this.speed = this.vitals.speed;
    }

    this.animation.walk();
    this.sprite.y -= this.speed;

    world.y += this.speed;
  }

  keyboard_down() {
    const point = this.sprite.getGlobalPosition();
    point.y += this.buffer;

    if(point_collides(point)) return this.animation.idle();

    point_contains(point);
    const pad = event_pad(point);
    if(pad && pad.speed) {
      this.speed = pad.speed;
      this.sprite.animationSpeed = 0.60;
    }
    else {
      this.sprite.animationSpeed = 0.70;
      this.speed = this.vitals.speed;
    }

    this.animation.walk();
    this.sprite.y += this.speed;

    world.y -= this.speed;
  }

  keyboard_left() {
    const point = this.sprite.getGlobalPosition();
    point.x -= this.buffer;

    if(point_collides(point)) return this.animation.idle();

    point_contains(point);
    const pad = event_pad(point);
    if(pad && pad.speed) {
      this.speed = pad.speed;
      this.sprite.animationSpeed = 0.60;
    }
    else {
      this.sprite.animationSpeed = 0.70;
      this.speed = this.vitals.speed;
    }

    this.animation.walk();
    this.sprite.x -= this.speed;

    world.x += this.speed;
  }

  keyboard_right() {
    const point = this.sprite.getGlobalPosition();
    point.x += this.buffer;

    if(point_collides(point)) return this.animation.idle();

    point_contains(point);
    const pad = event_pad(point);
    if(pad && pad.speed) {
      this.speed = pad.speed;
      this.sprite.animationSpeed = 0.60;
    }
    else {
      this.sprite.animationSpeed = 0.70;
      this.speed = this.vitals.speed;
    }

    this.animation.walk();

    this.sprite.x += this.speed;
    world.x       -= this.speed;
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
        case 73: return this.large_inventory();    // i
        case 80: return this.small_inventory();    // p
        case 79: return this.open_interaction();   // o
      }
    });
  }

}

module.exports = {
  Keyboard,
};
