'use strict';

const PIXI                  = require('pixi.js');
const { viewport          } = require('./viewport');
const { ticker            } = require('./ticker');
const { radian            } = require('./math');
const { arrow_management  } = require('./bow.js');

class Mouse {
  constructor() {
    this.allow_shoot = true;
    this.aiming_cone = viewport.getChildByName('aiming_cone');
    this.weapon = 'bow';
    this.power = 1000;
    this.aiming_line = new PIXI.Graphics();
    this.aiming_line.name = 'aiming_line';
    this.add_aiming_cone();

    viewport.addChild(this.aiming_line);
  }

  add_aiming_cone() {
    this.aiming_cone = PIXI.Sprite.fromFrame('yellow_triangle');

    this.aiming_cone.height = 800;
    this.aiming_cone.width = 400;
    this.aiming_cone.anchor.x = 0.5;
    this.aiming_cone.alpha = 0;
    //this.aiming_cone.filters = [new PIXI.filters.BlurFilter()];
    this.aiming_cone.name = 'aiming_cone';

    viewport.addChild(this.aiming_cone);
  }

  mouse_up(event) {
    if(!this.shift_pressed) return;

    this.moveable = true;
    this.sprite.play();
    this.animation_switch('bow', 'idle');

    ticker.remove(this.count_down);
    this.aiming_cone.alpha = 0;
    if (this.weapon === 'bow' && this.allow_shoot) {
      const mouse_position_player = event.data.getLocalPosition(viewport);

      arrow_management(this.power, this.sprite, mouse_position_player);
    }
  }

  mouse_down(event) {
    if(!this.sprite.shift_pressed) return;
    this.aiming_cone.alpha = 0;
    this.aiming_cone.count = 10;
    this.aiming_cone.width = 500;
    this.aiming_cone.height = 300;
    this.power = 900;

    this.animation_switch('bow', 'ready');
    this.sprite.loop = false;
    //this.count_down = () => {
    //  if (!this.sprite.shift_pressed){
    //    ticker.remove(this.count_down);
    //    this.aiming_cone.alpha = 0;
    //    return;
    //  }
    //  if(this.power < 300) {
    //    this.sprite.textures = this.sprite.animations.bow.idle;
    //    ticker.remove(this.count_down);
    //    return;
    //  }
    //  if (this.power > 650) {
    //    this.allow_shoot = false;
    //  } else {
    //    this.allow_shoot = true;
    //  }

    //  this.aiming_cone.width -= 1.5;
    //  this.aiming_cone.height += 3;
    //  this.aiming_cone.alpha += 0.002;
    //  this.aiming_cone.count -= 0.04;
    //  //this.aiming_cone.filters[0].blur = this.aiming_cone.count;

    //  if (this.power > 400) {
    //    this.power -= 5;
    //  }
    //};
    //ticker.add(this.count_down);
    const mouse_position_player = event.data.getLocalPosition(viewport);
    this.sprite.rotation = radian(mouse_position_player, this.sprite);
    this.sprite.gotoAndPlay(0);
  }

  mouse_move(event) {
    const mouse_position_player = event.data.getLocalPosition(viewport);

    this.aiming_cone.position.set(this.sprite.x, this.sprite.y);
    this.aiming_cone.rotation = radian(this.sprite, mouse_position_player);

    this.sprite.rotation = radian(mouse_position_player, this.sprite);

    viewport.addChild(this.aiming_cone, this.aiming_line);
  }
}

module.exports = {
  Mouse,
};
