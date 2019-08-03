const { items        } = require('../../engine/pixi_containers');
const { tweenManager } = require('pixi.js');

const { Sprite, Texture, sound, DEG_TO_RAD } = require('pixi.js');
const { Button  } = require('../../view/button');
const { Caption } = require('../../view/caption');

const { damage_events } = require('../../engine/damage_handler');
const { Vitals        } = require('../../character/attributes/vitals');
const { Floor         } = require('./floor');

class Door extends Sprite {
  constructor(data) {
    super(Texture.fromImage(data.image_name));
    this.id       = data.id;
    this.height   = data.height;
    this.width    = data.width;
    this.rotation = data.rotation * DEG_TO_RAD;
    this.interactive = true;
    this.add_component(new Vitals());

    this.rotation_on_interaction = data.open_rotation || 2;

    this.anchor.set(0, 1);
    this.position.copy(data);

    items.addChild(this);

    if(!data) return;
    this.alpha = data.alpha || 1;

    if(data.clickable) {
      this.closable = data.closable;
      this.tween = tweenManager.createTween(this);
      this.on('click', () => {
        if(this.opened) {
          if(this.closable === false) {
            return;
          }
          return this.close();
        }
        this.open();
      });
    }

    if(data.dialog_on_click) {
      this.on('click', () => {
        Caption.render(data.dialog_on_click);
        this.locked_door_effect.play();
      });
    }

    if(data.label) this.overlay(data);
    if(data.door)  this.pathfind_logic();

    damage_events.on('damage', data => this.damage(data));

    this._set_sound();
  }

  damage({id, damage}) {
    if(this.id !== id) return;
    this.vitals.damage(damage);
    this.wood_thump.play();

    if(!this.vitals.alive) this.kill();
  }

  kill() {
    console.log('door destroy');
  }

  _set_sound() {
    // TODO better sound
    this.wood_thump = sound.find('thud_1');
    this.wood_thump.volume = 0.5;

    this.locked_door_effect = sound.find('door_locked');
    this.locked_door_effect.volume = 0.1;
  }

  open() {
    if(this.in_motion) return;
    this.in_motion = true;
    this.tween.clear();
    this.tween.to({ rotation: this.rotation+this.rotation_on_interaction });
    this.tween.time = 500;
    this.tween.start();
    this.tween.on('end', () => {
      this.opened = true;
      this.in_motion = false;
      this.button.action_label.text = 'Close';
    });
  }

  close() {
    if(this.in_motion) return;
    this.in_motion = true;
    this.tween.clear();
    this.tween.to({ rotation: this.rotation-this.rotation_on_interaction });
    this.tween.time = 500;
    this.tween.start();
    this.tween.on('end', () => {
      this.opened = false;
      this.in_motion = false;
      this.button.action_label.text = 'Open';
    });
  }

  overlay(value) {
    this.button = new Button(value);
    this.button.visible = false;
    this.tint = 0xd3d3d3;
    this.on('mouseover', () => {
      this.tint = 0xffffff;
      if(this.button._destoyed) return;
      this.button.set_position(this);
      this.button.visible = true;
    });
    this.on('mouseout', () => {
      this.tint = 0xd3d3d3;
      if(this.button._destoyed) return;
      this.button.visible = false;
    });
  }

  pathfind_logic() {
    this.door = true;
    this.health = 50;

    damage_events.on('damage_tile', ({door_tile, damage}) => {
      door_tile.alpha = 0.6;
      if(door_tile.id === this.id) {
        if(this.health < 30) {
          delete door_tile.door;
          this.visible = false;
          const broken_door = new Floor({image_name: 'door_broken'});

          broken_door.position.copy(this);
        }
        this.health -= damage;
      }
    });
  }
  add_component(component) {
    this[component.name] = component;
  }

}

module.exports = {
  Door,
};
