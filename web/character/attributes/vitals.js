'use strict';
const { Blood         } = require('../../effects/blood');
const { Button        } = require('../../view/button');
const { damage_events } = require('../../engine/damage_handler');

class Vitals {
  constructor({ animation, tween, sprite, id, inventory, name }) {
    this.id     = id;
    this.name   ='vitals';
    this.sprite = sprite;
    this.blood  = new Blood();
    this.power  = 5000;
    this.speed  = 20;
    this.health = 80;
    this.food   = 40;
    this.water  = 20;
    this.heat   = 90;
    this.sleep  = 100;
    this.status = 'alive';
    this.inventory = inventory;
    this.tween  = tween;
    this.animation = animation;

    this.on_damage = ({id, damage}) => {
      if(this.id !== id) return;
      //player
      if(this.id === 1) throw 'GAME OVER';
      if(this.alive) return this.damage(damage);

      if(!this.inventory.items.length) this.inventory.populate();
      if(this.tween) this.tween.stop();

      this.animation.kill();

      this.sprite.interactive = true;
      this.button = new Button({
        label_action: 'Loot',
        label_description: name || 'Corpse',
        label_image: 'eye_icon',
        visible: false,
      });
      this.sprite.on('mouseover', () => {
        this.button.set_position(this.sprite);
        this.button.visible = true;
      });
      this.sprite.on('mouseout', () => {
        this.button.visible = false;
      });

      this.sprite.click = () => {
        this.button.visible = false;
        this.inventory.show();
      };

      damage_events.removeListener('damage', this.on_damage);
    };
    damage_events.on('damage', this.on_damage);

  }

  get alive() {
    return (this.status === 'alive');
  }

  _kill() {
    if (this.status === 'dead') return;

    this.status = 'dead';

    this.blood.add_at(this.sprite);
  }

  _dead(damage) {
    this.health -= damage;

    return this.health < 0;
  }

  damage(damage) {
    if (!damage) throw new Error('No damage being recieved');
    if(this.status === 'dead') return;

    this.health -= damage;

    if(this.health < 0) this._kill();
  }
}

module.exports = {
  Vitals,
};

