const { Texture, tween, tweenManager, extras } = require('pixi.js');
const { collisions       } = require('../../engine/pixi_containers');
const { enemys           } = require('../../engine/pixi_containers');
const { decals           } = require('../../engine/pixi_containers');
const { MeleeBox         } = require('../../engine/melee');
const { draw_path        } = require('../../utils/line');
const { distance_between } = require('../../utils/math');
const { point_radius_away_from_point } = require('../../utils/math');
const { damage_events    } = require('../../engine/damage_handler');
const { pathfind         } = require('../../engine/pathfind');
const { Sight            } = require('../../utils/line_of_sight');
const { Inventory        } = require('../attributes/inventory');
const { Vitals           } = require('../attributes/vitals');
const { Button           } = require('../../view/button');
const { Blood            } = require('../../effects/blood');


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
    super([ Texture.fromFrame(image_name) ]);
    this.name = 'zombie';
    this.id   = id;

    this.tween = tweenManager.createTween();
    this.add_component(new Inventory({ items, random, equip }));
    this.add_component(new Vitals());
    this.add_component(new MeleeBox());
    this.rotation_offset = 0;
    this.height = height || 50;
    this.width  = width  || 40;
    this.anchor.set(0.5);
    this.position.copy({ x, y });
    this._target = null;

    damage_events.on('damage', data => this.damage(data));

    enemys.addChild(this);
  }

  damage({ id, damage }) {
    if(this.id !== id) {
      return;
    }
    this.damage(damage);
    this.vitals.damage(damage);
    if(Math.random() >= 0.5) {
      Blood.random_at(this.position);
    }

    if(!this.vitals.alive) {
      this.kill();
    }
  }

  kill() {
    if(this.tween) {
      this.tween.stop();
    }
    this.inventory.populate();

    this.interactive = true;
    this.button = new Button(this, {
      'label_action'     : 'Loot',
      'label_description': 'Corpse',
      'label_image'      : 'eye_icon',
    });

    this.click = () => {
      this.inventory.set_position(this);
      this.inventory.fade_in();
    };

    this.animation.kill();
    damage_events.removeListener('damage', () => this.damage);

    const removed_enemy = enemys.removeChild(this);
    decals.addChild(removed_enemy);
  }

  get _target_far_away() {
    const distance = distance_between(this._target, this);
    return distance > 80;
  }

  // TODO change function name
  target(character) {
    this._target = character;
  }

  get sees_target() {
    return Sight.lineOfSight(this, this._target, collisions.children);
  }

  // TODO: extract and refactor
  // What is general and what is unique?
  logic_start({
    speed = 1000,
  } = {}) {
    this.tween.time   = speed * 2;
    this.tween.repeat = 20;
    const path_tween  = tweenManager.createTween(this);

    this.tween.on('repeat', async () => {
      // TODO this is a hack and shouldn't be done in here
      console.log(this);

      if(
        this._destroyed
        || this._target._destroyed
        || !this._target.vitals.alive
        || !this.vitals.alive
      ) {
        this.tween.remove();
        return;
      }

      path_tween.clear();
      path_tween.time = speed * 20;

      if(!this._target_far_away) {
        this.animation.attack();
        this.animation.face_point(this._target);
        this.melee.slash(750, 20, this);
        return;
      }

      this.animation.move();
      if(this.sees_target) {
        const { x, y } = point_radius_away_from_point(this._target, this, -50);

        this.animation.face_point(this._target);
        path_tween
          .from(this)
          .to({ x, y })
          .start();
        return;
      }

      const normal_path = await pathfind.get_sprite_to_sprite_path(this, this._target);
      path_tween.path = new tween.TweenPath();
      path_tween.path.moveTo(this.x, this.y);
      path_tween.time = speed * normal_path.length;

      for (let i = 2; i < normal_path.length; i++) {
        path_tween.path.arcTo(
          normal_path[i - 1].x + 50,
          normal_path[i - 1].y + 50,
          normal_path[i].x + 50,
          normal_path[i].y + 50,
          90);
      }

      this.animation.face_point(path_tween.path.getPoint(1));
      draw_path(path_tween.path);

      return this.tween
        .chain(path_tween)
        .start();
    });

    this.tween.start();
  }

  add_component(component) {
    this[component.name] = component;
  }
}

module.exports = {
  LogicSprite,
};
