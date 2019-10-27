const { pathfind    } = require('../../engine/pathfind.js');
const { tweenManager, tween } = require('pixi.js');
const { Point } = require('pixi.js');
const { distance_between } = require('../../utils/math');
const { sleep } = require('../../utils/time');
const { Trigger_Pad } = require('../elements/pad');
const { LogicTest } = require('../../character/archetypes/logic_test');
const { ActorHuman } = require('../../character/archetypes/actor_human');
const { PathCrow } = require('../../character/archetypes/path_crow');
const { players     } = require('../../engine/pixi_containers');
const { viewport    } = require('../../engine/app');
const { flash_at       } = require('../../effects/fade_sprite.js');
const { Debris       } = require('../../effects/debris.js');
const { point_radius_away_from_point } = require('../../utils/math');
// const { Raycast         } = require('../../engine/raycast');

const {
  Wall,
  Door,
  Decal,
  Background,
  Chest,
  Roof,
  Shroud,
  Collision,
  Floor,
  Street_Lamp,
  Click_Pad,
} = require('../elements');

class BasketBallRoom  {
  constructor() {
    this.name   = 'defend_room';
    this.player = players.children[0];
    this.data   = require('../data/basketball_room.json');

    this.walls        = this.data.walls.map(data => new Wall(data));
    this.shrouds      = this.data.shroud.map(data => new Shroud(data));
    this.roofs        = this.data.roof.map(data => new Roof(data));
    this.items        = this.data.item.map(data => new Chest(data));
    this.collisions   = this.data.collision.map(data => new Collision(data));
    this.decals       = this.data.decal.map(data => new Decal(data));
    this.floors       = this.data.floor.map(data => new Floor(data));
    this.exit_pad     = this.data.exit_pad.map(data => new Trigger_Pad(data, this.player));
    this.backgrounds  = this.data.background.map(data => new Background(data));
    this.doors        = this.data.door.map(data => new Door(data));
    this.entry_point  = this.data.player_spawn.find(spawns => spawns.id === 269);
    this.zombies      = this.data.prey.map(unit => new LogicTest(unit));
    this.obstacles    = this.data.obstacle.map(unit => new Collision(unit));
    this.bird         = this.data.birds.map(unit => new PathCrow(unit));
    this.click_pad    = this.data.click_pad.map(data => new Click_Pad(data));


    //  TODO
    // this.shadow      = new Raycast(this.player, {
    //   'border'      : this.data.shadow_area[0],
    //   'obstructions': this.walls,
    // });

    this.attack_pad      = this.exit_pad.find(pad => pad.id === 207);
    this.attack_pad.text = 'zombie attack';
    this.grid            = pathfind.create_level_grid(this.data.grid[0]);

    this._set_elements();
  }

  _set_elements() {
    this.player.position.copy(this.entry_point);
    // const point = global.place_bunny();
    // point.alpha = 1;
    // point.height = 20;
    // point.width = 20;

    const zombie = this.zombies[0];
    zombie.target(this.player);
    zombie.animation.eat();
    // zombie.logic_start({ 'speed': 1000 });

    // viewport.on('click', ({ data }) => {
    //   const mouse_position = data.getLocalPosition(viewport);
    //   point.position.copy(mouse_position);

    //   const player_position = this.player.position;
    //   const result = point_radius_away_from_point(player_position, point, -100);
    //   global.place_bunny({ 'x': result.x, 'y': result.y });
    // });


    // this.player.events.on('hit', () => {
    //   flash_at(this.player, 500);
    // });
    // viewport.on('click', ({ data }) => {
    //   const point = global.place_bunny();
    //   point.alpha = 1;
    //   point.height = 20;
    //   point.width = 20;
    //   const mouse_position = data.getLocalPosition(viewport);

    //   const distance = distance_between(mouse_position, point);

    //   const bunny_tween = tweenManager.createTween(point);
    //   // bunny_tween.easing = tween.Easing.outQuint();
    //   point.position.copy(mouse_position);

    //   // const time = 100;
    //   bunny_tween.time = ((0.2 / distance) * 100000000);

    //   bunny_tween.from(
    //     this.player
    //   ).to(
    //     mouse_position
    //   ).start();
    // });

    this.bird[0].tween.loop = true;
    this.bird[0].start();

    const foo = this.click_pad
      .find(pad => pad.id === 300);
    foo.alpha = 0.2;

    let thing = false;
    const soo = this.collisions
      .find(collision => collision.id === 301);

    const loo = this.collisions
      .find(collision => collision.id === 302);

    foo.on('mouseover', () => {
      soo.tint = 0xffffff;
      loo.tint = 0xffffff;
    });


    foo.on('mouseout', () => {
      soo.tint = 0xA9A9A9;
      loo.tint = 0xA9A9A9;
    });

    foo.on('click', () => {
      if(!thing) {
        new Debris(soo);

        soo.destroy();
        thing = true;
        return;
      }

      new Debris(loo);
      loo.destroy();
      foo.destroy();
    });

    const zombie1 = this.zombies[1];
    zombie1.target(zombie);
    zombie1.animation.eat();
    // zombie1.logic_start({ 'speed': 1000 });


    this.attack_pad.once('trigger', () => {
      const lamps  = this.data.lamp.map(lamp => new Street_Lamp(lamp));
      const actors = this.data.actor.map(actor => new ActorHuman(actor));

      viewport.snap(this.attack_pad.x, this.attack_pad.y, {
        'removeOnComplete' : true,
        'removeOnInterrupt': true,
      });


      const timing = 500;
      let alpha = 0;
      Array(lamps.length)
        .fill()
        .forEach(async (_, i) => {
          let count_flicker = 0;

          const lamp = lamps[i];
          const actor = actors[i];
          actor.tint = 0x000000;
          actor.face_point(this.player);
          actor.alpha = 0;

          await sleep(timing);
          lamp.flicker_for(4000 + timing);
          lamp.events.on('on', () => {
            actor.renderable = true;
            alpha += 0.05;
            actor.alpha = alpha;
            count_flicker++;
            if(
              count_flicker > 7
            && count_flicker < 10
            ) {
              actor.renderable = true;
            }
            if(count_flicker > 12) {
              lamp.turn_off();
            }
          });
          lamp.events.on('off', () => {
            count_flicker++;
            actor.renderable = false;
            actor.face_point(this.player);
            if(count_flicker > 12) {
              actor.renderable = false;
            }
          });
        });
    });
  }
}

module.exports = {
  BasketBallRoom,
};
