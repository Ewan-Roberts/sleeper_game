// 'use strict';
// const { Texture, tween, tweenManager, extras } = require('pixi.js');
// const { enemys    } = require('../../engine/pixi_containers');
// const { Vitals    } = require('../attributes/vitals');
// const { radian    } = require('../../utils/math');
// const { zombie_frames } = require('../animations/zombie');
// const { Inventory } = require('../attributes/inventory');
// const { Animation } = require('../attributes/animation');
// const { draw_path } = require('../../utils/line');
// const { Button    } = require('../../view/button');
// const { damage_events } = require('../../engine/damage_handler');
// const event = require('events');

// const dead = [ Texture.fromFrame('death01_0000') ];

// class Lurcher extends extras.AnimatedSprite {
//   constructor(data) {
//     super(dead);
//     this.id   = data.id;
//     this.name = 'zombie';

//     this.add_component(new Animation(this, zombie_frames));
//     this.add_component(new Inventory());
//     this.add_component(new Vitals());
//     this.anchor.set(0.5);
//     this.animationSpeed = 0.19;
//     this.tint           = 0x352925;
//     this.rotation       = 1.56;
//     this.events         = new event();
//     this.events.on('killed', () => this.on_death());

//     this.tween = tweenManager.createTween(this);

//     damage_events.on('damage', this.on_damage);
//     enemys.addChild(this);
//   }

//   on_death() {
//     this.button = new Button({
//       label_action: 'Loot',
//       label_description: 'Corpse',
//       label_image: 'eye_icon',
//     });

//     this.interactive = true;
//     this.on('mouseover', () => {
//       this.button.set_position(this);
//       this.button.visible = true;
//     });
//     this.on('mouseout', () => {
//       this.button.visible = false;
//     });
//     this.click = () => {
//       this.button.visible = false;
//       this.inventory.set_position(this);
//       this.inventory.fade_in();
//     };
//   }

//   set path(path_array) {
//     this.tween.path = new tween.TweenPath();
//     for (let i = 1; i < path_array.length; i++) {
//       this.tween.path.arcTo(
//         path_array[i-1].x,
//         path_array[i-1].y,
//         path_array[i].x,
//         path_array[i].y,
//         20);
//     }
//     this.tween.time = this.time || 10000;

//     this.tween.on('end', () => {
//       this.destroy();
//       this.tween.remove();
//       this.tween = null;
//     });
//   }

//   on_damage({id, damage}) {
//     if(this.id !== id) return;
//     this.events.emit('hit');
//     if(this.vitals.alive) return this.vitals.damage(damage);

//     this.events.emit('killed');
//     if(!this.inventory.items.length) this.inventory.populate();
//     if(id === 1) return;
//     this.animation.kill();

//     damage_events.removeListener('damage', this.on_damage);
//   }

//   start() {
//     this.tween.start();
//     this.animation.move();
//     this.play();
//   }

//   draw() {
//     draw_path(this.tween.path);
//   }

//   set turn(bool) {
//     if(!bool) return;

//     this.tween.on('update', () => {
//       this.rotation = radian(this, this.tween.path._tmpPoint);
//     });
//   }

//   add_component(component) {
//     this[component.name] = component;
//   }
// }

// module.exports = {
//   Lurcher,
// };
