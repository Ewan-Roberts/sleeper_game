const PIXI              = require('pixi.js');
const viewport          = require('../../engine/viewport');
const { createjs }      = require('@createjs/tweenjs');

const door_container    = new PIXI.Container();
door_container.name     = 'door_container';
door_container.zIndex   = -2;

class Door {
  constructor(door_data) {
    this.sprite = PIXI.Sprite.fromFrame('black_dot');

    this.sprite.position.set(door_data.x, door_data.y);
    this.sprite.width = door_data.width;
    this.sprite.height = door_data.height;
    this.sprite.interactive = true;
    this.sprite.buttonMode = true;
    this.sprite.name = 'door';
    this.state = 'closed';
    door_container.addChild(this.sprite);

    viewport.addChild(door_container);
  }

  add_state_handling() {
    this.sprite.click = () => {
      
      switch(this.state) {
        case 'transition':
          return;
          break;
        case 'locked':
          return;
          break;
        case 'closed': 
          this.open();
          break;
        case 'open':
          this.close();
          break;
      }
      this.state = 'transition';
    };
  }

  lock() {
    this.state = 'locked';
    return this;
  }
  
  unlock() {
    this.state = 'closed';
    return this;
  }

  open()  {
    const tween = createjs.Tween.get(this.sprite);

    tween.to({
      rotation: this.sprite.rotation,
    }).to({
      rotation: this.sprite.rotation +2,
    }, 1000).call(()=>{
      this.state = 'open';
    });
    return this;
  }

  close() {
    const tween = createjs.Tween.get(this.sprite);

    tween.to({
      rotation: this.sprite.rotation,
    }).to({
      rotation: this.sprite.rotation -2,
    }, 1000).call(()=>{
      this.state = 'closed';
    });
    return this;
  }
 }

module.exports = {
  Door,
}
