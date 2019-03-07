'use strict';
const PIXI         = require('pixi.js');

const { collision_container } = require('../../engine/pixi_containers');

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
    collision_container.addChild(this.sprite);

  }

  add_state_handling() {
    this.sprite.click = () => {

      switch(this.state) {
        case 'transition':
          return;
        case 'locked':
          return;
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
    //const tween = createjs.Tween.get(this.sprite);

    //tween.to({
    //  rotation: this.sprite.rotation,
    //}).to({
    //  rotation: this.sprite.rotation +2,
    //}, 1000).call(()=>{
    //  this.state = 'open';
    //});
    //return this;
  }

  close() {
    //const tween = createjs.Tween.get(this.sprite);

    //tween.to({
    //  rotation: this.sprite.rotation,
    //}).to({
    //  rotation: this.sprite.rotation -2,
    //}, 1000).call(()=>{
    //  this.state = 'closed';
    //});
    //return this;
  }
}

module.exports = {
  Door,
};
