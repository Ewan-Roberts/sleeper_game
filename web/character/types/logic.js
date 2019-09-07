const { Texture, tween, tweenManager, extras } = require('pixi.js');
const { collisions       } = require('../../engine/pixi_containers');
const { enemys           } = require('../../engine/pixi_containers');
const { radian           } = require('../../utils/math');
const { draw_path        } = require('../../utils/line');
const { distance_between } = require('../../utils/math');
const { damage_events    } = require('../../engine/damage_handler');
const { pathfind         } = require('../../engine/pathfind');
const { Sight            } = require('../../utils/line_of_sight');
const { Inventory        } = require('../attributes/inventory');
const { Vitals           } = require('../attributes/vitals');
const { Button           } = require('../../view/button');
const { Blood            } = require('../../effects/blood');
const { env              } = require('../../../config');
const { MeleeBox         } = require('../../engine/melee');

// TODO
function break_at_door(path) {
  for (let i = 0; i < path.length; i++) {
    if(path[i].door) {
      path.length = i+1;
      return path;
    }
  }
  return path;
}

class LogicSprite extends extras.AnimatedSprite {
  constructor({
    image_name = 'bunny',
    height,
    width,
    id,
    x,
    y,
    items,
    random,
    equip,
  }) {
    super([Texture.fromFrame(image_name)]);
    this.name = 'zombie';
    this.id   = id;

    this.add_component(new Inventory({items,random,equip}));
    this.add_component(new Vitals());
    this.rotation_offset = 0;
    this.height = height || 100;
    this.width  = width || 100;
    this.anchor.set(0.5);
    this.position.copy({x,y});

    damage_events.on('damage', ({id,damage}) => {
      if(this.id !== id) return;
      this.damage(damage);
    });

    enemys.addChild(this);
  }

  damage(damage) {
    this.vitals.damage(damage);
    if(Math.random() >= 0.5) new Blood(this.position);

    if(!this.vitals.alive) this.kill();
  }

  kill() {
    if(this.tween) this.tween.stop();
    this.inventory.populate();

    this.interactive = true;
    this.button = new Button(this, {
      label_action:      'Loot',
      label_description: 'Corpse',
      label_image:       'eye_icon',
    });

    this.click = () => {
      this.inventory.set_position(this);
      this.inventory.fade_in();
    };

    this.animation.kill();
    damage_events.removeListener('damage', this.damage);
  }

  get _target_far_away() {
    const distance = distance_between(this.target, this);
    return distance > 80;
  }

  // TODO change function name
  target(character) {
    this.target = character;
  }

  async _pathfind() {
    this.animation.move();

    let normal_path;
    try {
      normal_path = await pathfind.get_sprite_to_sprite_path(this, this.target);
    } catch(err) {
      console.log(err);
    }
    if(!normal_path) {
      this.tween.time = 500;
      return;
    }

    const door_path = break_at_door(normal_path);
    const door_tile = door_path[door_path.length - 1];

    const { damage } = this.inventory.equipped;
    damage_events.emit('damage_tile', {door_tile, damage});

    this.tween.path.lineTo(
      door_path[0].x + 50,
      door_path[0].y + 50
    );

    for (let i = 1; i < door_path.length; i++) {
      this.tween.path.arcTo(
        door_path[i-1].x + 50,
        door_path[i-1].y + 50,
        door_path[i].x + 50,
        door_path[i].y + 50,
        20);
    }

    this.tween.time = door_path.length*500;
  }

  // TODO: extract and refactor
  // too much going on
  logic_start() {
    this.tween = tweenManager.createTween(this);
    this.tween.time = 2000;
    this.tween.expire = true;
    this.tween.start();

    this.tween.on('end', async () => {
      if(this.remove_next_tick) return;
      this.tween.clear();
      this.tween.expire = true;

      if(!this._target_far_away) {
        this.tween.time = 3000;
        this.tween.start();
        this.animation.attack();

        // TODO
        if(!this.target) throw 'set an enemy';
        this.animation.face_point(this.target);
        this.melee = new MeleeBox();

        damage_events.emit('damage', {id: this.target.id, damage: 10});
        return;
      }

      this.tween.path = new tween.TweenPath();
      this.tween.path.moveTo(this.x, this.y);
      if(Sight.lineOfSight(this, this.target, collisions.children)) {
        this.tween.path.lineTo(this.target.x, this.target.y);
        this.animation.move();

        this.tween.time = 200;
      } else {
        await this._pathfind();
        this.tween.time = 4000;
      }

      if(env.draw_paths) draw_path(this.tween.path);

      this.tween.start();
    });

    this.tween.on('update', () => {
      if(!this.vitals.alive) this.tween.remove();
      if(!this.tween.path) return;

      this.rotation = radian(this, this.tween.path._tmpPoint) + this.rotation_offset;
    });
  }

  add_component(component) {
    this[component.name] = component;
  }
}

module.exports = {
  LogicSprite,
};
