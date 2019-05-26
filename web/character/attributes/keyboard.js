'use strict';
const { tweenManager, keyboardManager} = require('pixi.js');
const { item_events } = require('../../engine/item_handler');

const {
  collisions,
  roofs,
  pads,
  shrouds,
} = require('../../engine/pixi_containers');

const { world    } = require('../../engine/shadows');
const { Player_Inventory} = require('../../view/view_player_inventory');
const { Interaction_Menu } = require('../../view/interaction_menu');
const { Fade     } = require('../../effects/fade');

function point_collides(position) {
  const { children } = collisions;

  return !!children.find(child => child.containsPoint(position));
}

//TODO this could be more performant using proximity
//and this logic should be split out or put in ceiling
function point_contains(position) {
  const shroud = shrouds.children ;
  const shrouds_to_remove = shroud.find(child => child.containsPoint(position));
  if (shrouds_to_remove && shrouds_to_remove.remove_on_enter) {
    Fade.out_destroy(shrouds_to_remove);
    delete shrouds_to_remove.remove_on_enter;
  }
  return;
  const roof = roofs.children;
  roof.forEach(child => {
    const tweening = tweenManager.getTweensForTarget(child);
    if(tweening.length>=1) return;
    if(child.containsPoint(position)) {
      Fade.to(child, child.fade_opacity | 0.6);

      return;
    }
    if(child.alpha !== 1) {
      Fade.in(child);
    }
  });
}

function event_pad(position) {
  const { children } = pads;

  const pad = children.find(child => child.containsPoint(position));

  if(pad && pad.events) pad.events.emit('trigger');
}

class Keyboard {
  constructor({ animation, sprite, vitals, light, inventory}) {
    this.name          = 'keyboard';
    this.animation     = animation;
    this.sprite        = sprite;
    this.speed         = vitals.speed;
    this.buffer        = 50;
    this.can_move      = true;
    this.light         = light;
    this.inventory     = inventory;
    this.inventory_view= new Player_Inventory();
    this.interaction   = new Interaction_Menu();

    keyboardManager.on('down', key => this.key_down(key));
    keyboardManager.on('released', () => this.key_up());
  }

  //TODO
  save_game() {
  }

  key_down(key) {
    if(!keyboardManager.isEnabled) return;

    switch(key) {
      // wasd
      case  87 : return this.keyboard_up();      // w
      case  83 : return this.keyboard_down();    // s
      case  65 : return this.keyboard_left();    // a
      case  68 : return this.keyboard_right();   // d
      // vim
      case  75 : return this.keyboard_up();      // k
      case  74 : return this.keyboard_down();    // j
      case  72 : return this.keyboard_left();    // h
      case  76 : return this.keyboard_right();   // l

      case  81 : return this.speed *= 1.5;       // q for speed
      case  73 : return this.large_inventory();  // i
      case  80 : return this.small_inventory();  // p
      case  79 : return this.open_interaction(); // o
      case 'n' : return this.save_game();
      default  : return;
    }
  }

  small_inventory() {
    this.disable();
    this.inventory_view.thin();
    this.inventory_view.toggle();
    this.inventory_view.add_primary_weapon(this.inventory.equipped);

    this.inventory_view.fill_inventory('bunny');
    this.inventory_view.character_tile('bunny');
  }

  large_inventory() {
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
    this.disable();
    this.inventory_view.wide();
    this.inventory_view.toggle();
    this.interaction.show();
    this.interaction.image('fire_pit');
    this.interaction.decription('its a fireplace');

    this.inventory.items.forEach(item => this.interaction.populate(item));
  }

  key_up() {
    this.animation.idle();
    keyboardManager.enable();
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
    event_pad(point);

    this.animation.walk();
    this.animation.face_up();
    this.animation.move_up_by(this.speed);
    if(this.light) this.light.set_position(this.sprite);

    world.y += this.speed;
  }

  keyboard_down() {
    const point = this.sprite.getGlobalPosition();
    point.y += this.buffer;

    if(point_collides(point)) return this.animation.idle();

    point_contains(point);
    event_pad(point);

    this.animation.walk();
    this.animation.face_down();
    this.animation.move_down_by(this.speed);
    if(this.light) this.light.set_position(this.sprite);

    world.y -= this.speed;
  }

  keyboard_left() {
    const point = this.sprite.getGlobalPosition();
    point.x -= this.buffer;

    if(point_collides(point)) return this.animation.idle();

    point_contains(point);
    event_pad(point);

    this.animation.walk();
    this.animation.face_left();
    this.animation.move_left_by(this.speed);
    if(this.light) this.light.set_position(this.sprite);

    world.x += this.speed;
  }

  keyboard_right() {
    const point = this.sprite.getGlobalPosition();
    point.x += this.buffer;

    if(point_collides(point)) return this.animation.idle();

    point_contains(point);
    event_pad(point);

    this.animation.walk();
    this.animation.face_right();
    this.animation.move_right_by(this.speed);
    if(this.light) this.light.set_position(this.sprite);

    world.x -= this.speed;
  }
}

module.exports = {
  Keyboard,
};
