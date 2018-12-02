const { GUI_HUD } = require('../gui/hud');
const gui = new GUI_HUD();
const ticker = require('../engine/ticker');
const viewport = require('../engine/viewport');

const keymap = {
  w: 'up',
  a: 'left',
  s: 'down',
  d: 'right',
  j: 'down',
  k: 'up',
  h: 'left',
  l: 'right',
  ArrowUp: 'up',
  ArrowLeft: 'left',
  ArrowDown: 'down',
  ArrowRight: 'right',
  i: 'i',
};

class Keyboard {
  constructor() {
    this.inventory_open = false;
    this.shift_pressed = false;
    this.moveable = true;
    this.collision_objects = viewport.getChildByName('collision_items').children;
    this.movement_speed = 15;
    this.buffer = 50;
    this.player = viewport.getChildByName('player');
  }
  
  key_down(e) {
    if (!this.moveable) return;
    if(!e) return;
    const key = keymap[e.key];
    if(!key) return;
    this.player.loop = true;

    switch(key) {
      case 'up':
        this.up();
        break;
      case 'left':
        this.left();
        break;
      case 'down':
        this.down();
        break;
      case 'right':
        this.right();
        break;
      case 'i':
        this.inventory();
        break;
      case 'Shift':
        this.shift();
        break;
    }
    
  }
  
  key_up() {
    this.shift_pressed = false;
    this.player.textures = this.sprite.animations.bow.idle;
    this.player.play();
  }

  up() {
    const player_point = {
      x: this.player_position._x,
      y: this.player_position._y,
    }
    for(let i =0; i< this.collision_objects.length; i++){
      player_point.y -= this.buffer;

      if(this.collision_objects[i].containsPoint(player_point)){
        console.log('poo')
        return;
      } 
    }

    this.player.y -= this.movement_speed;
    this.player.rotation = -2;
  }

  down() {
    const player_position = this.player.getGlobalPosition();
    
    this.collision_objects.forEach(object => {
      player_position.y += this.buffer;
      if(object.containsPoint(player_position)){
        return;
      }   
    });

    this.player.y += this.movement_speed;
    this.player.rotation = 2;
  }

  left() {
    const player_position = this.player.getGlobalPosition();
    
    this.collision_objects.forEach(object => {
      player_position.x -= this.buffer;
      if(object.containsPoint(player_position)){
        return;
      }   
    });

    this.player.x -= this.movement_speed;
    this.player.rotation = -3;
  }

  right() {
    const player_position = this.player.getGlobalPosition();
    
    this.collision_objects.forEach(object => {
      player_position.x += this.buffer;
      if(object.containsPoint(player_position)){
        return;
      }   
    });

    this.player.x += this.movement_speed;
    this.player.rotation = 0;
  }

  inventory() {
    if ( this.inventory_open === false ) {
      ticker.add(() => gui.update_location());
      gui.show()
      this.inventory_open = true;
    } else {
      ticker.remove(() => gui.update_location());
      gui.hide();
      this.inventory_open = false;
    }
  }

  shift() {
    this.shift_pressed = true;
  }
}

module.exports = {
  Keyboard,
}
