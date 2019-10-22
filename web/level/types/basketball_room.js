const { pathfind    } = require('../../engine/pathfind.js');
const { tweenManager, tween } = require('pixi.js');
const { Point } = require('pixi.js');
const { distance_between } = require('../../utils/math');
const { sleep } = require('../../utils/time');
const { Trigger_Pad } = require('../elements/pad');
const { LogicTest } = require('../../character/archetypes/logic_test');
const { ActorHuman } = require('../../character/archetypes/logic_human');
const { players     } = require('../../engine/pixi_containers');
const { viewport    } = require('../../engine/app');
const { flash_at       } = require('../../effects/fade_sprite.js');
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

    const lamps  = this.data.lamp.map(lamp => new Street_Lamp(lamp));
    const actors = this.data.actor.map(actor => new ActorHuman(actor));

    const timing = 500;
    Array(lamps.length)
      .fill()
      .forEach(async (_, i) => {
        let count_flicker = 0;

        const lamp = lamps[i];
        const actor = actors[i];
        // actor.tint = 0x000000;
        actor.alpha = 0.8;
        actor.visible = false;

        await sleep(timing);
        lamp.flicker_for(4000 + timing);
        lamp.events.on('on', () => {
          actor.face_point(this.player);
          count_flicker++;
          if(
            count_flicker > 7
            && count_flicker < 10
          ) {
            actor.visible = true;
          }
          if(count_flicker > 12) {
            lamp.turn_off();
          }
        });
        lamp.events.on('off', () => {
          count_flicker++;
          actor.face_point(this.player);
          if(count_flicker > 12) {
            actor.visible = false;
          }
        });
      });

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

    const zombie1 = this.zombies[1];
    zombie1.target(zombie);
    zombie1.animation.eat();
    // zombie1.logic_start({ 'speed': 1000 });

    // this.attack_pad.once('trigger', () => {
    //   this.zombies.forEach(zombie => {
    //     zombie.animation.eat();
    //     zombie.target(this.player);
    //     zombie.logic_start({ 'speed': 10000 });
    //   });
    // });
  }
}

module.exports = {
  BasketBallRoom,
};
