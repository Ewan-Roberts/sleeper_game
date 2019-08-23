//const { Level_Factory } = require('./level_factory');
//const { Player       } = require('../../character/archetypes/player');
const { LogicRat     } = require('../../character/archetypes/logic_rat');
const { LogicZombie  } = require('../../character/archetypes/logic_zombie');
const { PathSprite   } = require('../../character/types/path');
const { players      } = require('../../engine/pixi_containers');
const { FloorWord    } = require('../../effects/floor_word');
const { Debris       } = require('../../effects/debris');
const { guis         } = require('../../engine/pixi_containers');
const { random_bound } = require('../../utils/math.js');
const { sleep        } = require('../../utils/time.js');
const { env          } = require('../../../config');
const { sound        } = require('pixi.js');
const { filters } = require('pixi.js');
const { flash_at     } = require('../../effects/fade_sprite.js');
const { VideoBaseTexture, tweenManager, Sprite, Texture, Text } = require('pixi.js');
const { Graphics } = require('pixi.js');

const {
  Wall,
  Decal,
  Door,
  Background,
  Chest,
  Roof,
  Shroud,
  Collision,
  Floor,
  Trigger_Pad,
} = require('../elements');

let first = false;
class DevRoom {
  constructor(spawn_id) {
    this.name   = 'dev_room';
    this.data   = require('../data/dev_room.json');
    this.player = players.children[0];

    this.items       = this.data.item.map(data => new Chest(data));
    this.shrouds     = this.data.shroud.map(data => new Shroud(data));
    this.roofs       = this.data.roof.map(data => new Roof(data));
    this.backgrounds = this.data.background.map(data => new Background(data));
    this.walls       = this.data.walls.map(data => new Wall(data));
    this.doors       = this.data.door.map(data => new Door(data));
    this.exit_pad    = this.data.exit_pad.map(data => new Trigger_Pad(data));
    this.floors      = this.data.floor.map(data => new Floor(data));
    this.decals      = this.data.decal.map(data => new Decal(data));
    this.collisions  = this.data.collision.map(data => new Collision(data));

    this.light_shroud = this.shrouds.find(roof => roof.id === 592);
    this.entry_point  = this.data.player_spawn.find(spawns => spawns.id === spawn_id);

    this._set_elements();
    if(env.dev) this._set_dev_settings();
    this._start();
  }

  _set_elements() {
    if(!first) {
      this.player.position.copy(this.entry_point);
      first = true;
    }
  }

  async _start() {
    this.rat = new LogicRat(this.data.path_rat[0]);
    this.rat.position.copy(this.player);

    this.rat.tween.loop = true;
    this.rat.start();
    this.ranbir = new LogicZombie(this.data.ranbir[0]);
    this.ranbir.target(this.player);
    this.data.debris.forEach(item => new Debris(item));

    //setTimeout(() => this.ranbir.logic_start(), 1000);

    this.player.events.on('hit', () => {
      flash_at(this.player, 500);
      console.log('hit');

      // sound.random_sound_from([
      //   'thud_2',
      //   'thud_3',
      //   'thud_5',
      //   'thud_6',
      //   'thud_7',
      // ]).play();
    });

    // const mouse_position = get_relative_mouse_position(this.player, event.data.global);
    // await flicker(this.light_shroud);
  }

  _set_dev_settings() {
    const [background] = this.data.background;
    setTimeout(()=> new Raycast(background, viewport.children[4]), 1000);
  }
}


const { viewport   } = require('../../engine/app');

const { ticker } = require('../../engine/app');

const Player = players.children[0];

function getIntersection(Player,segment,angle){
  // RAY in parametric: Point + Delta*T1
  const r_px = Player.x;
  const r_py = Player.y;
  const r_dx = Math.cos(angle);
  const r_dy = Math.sin(angle);

  // SEGMENT in parametric: Point + Delta*T2
  const s_px = segment.a.x;
  const s_py = segment.a.y;
  const s_dx = segment.b.x-segment.a.x;
  const s_dy = segment.b.y-segment.a.y;

  // Are they parallel? If so, no intersect
  const r_mag = Math.sqrt(r_dx*r_dx+r_dy*r_dy);
  const s_mag = Math.sqrt(s_dx*s_dx+s_dy*s_dy);

  if(
    r_dx/r_mag===s_dx/s_mag &&
    r_dy/r_mag===s_dy/s_mag
  ){
    // Unit vectors are the same.
    return null;
  }

  const T2 = (r_dx*(s_py-r_py) + r_dy*(r_px-s_px))/(s_dx*r_dy - s_dy*r_dx);
  const T1 = (s_px+s_dx*T2-r_px)/r_dx;

  // Must be within parametic whatevers for RAY/SEGMENT
  if(T1<0) return null;
  if(T2<0 || T2>1) return null;

  // Return the POINT OF INTERSECTION
  return {
    x: r_px+r_dx*T1,
    y: r_py+r_dy*T1,
    param: T1,
  };

}

class Raycast {
  constructor(bounds, container) {
    // Border
    this.segments = [
      ...this.convertToRays(bounds),
    ];
    const colorMatrix = new filters.BlurFilter();
    // colorMatrix.autoFit = true;
    // colorMatrix.greyscale(0.5);

    this.raycast = new Graphics();
    this.raycast.filters = [colorMatrix];

    this.addVertexFromContainer(container);
    this.start();
  }

  convertToRays(sprite) {
    const {x,y,width,height} = sprite;

    const info = [
      {a:{x,         y         }, b:{x:x+width, y         }},
      {a:{x:x+width, y         }, b:{x:x+width, y:y-height}},
      {a:{x:x+width, y:y-height}, b:{x,         y:y-height}},
      {a:{x,         y:y-height}, b:{x,         y         }},
    ];
    return info;
  }

  addVertexFromContainer(containers) {
    containers.children.forEach((child)=>{
      console.log(child.constructor.name);
      if(child.constructor.name === 'Wall') {

        this.segments.push(...this.convertToRays(child));
      }
    });
  }

  start() {
    const uniquePoints = this.segments.map(({a,b})=> (a,b));

    console.log(ticker);
    ticker.add(() => {
      this.raycast.clear();
      this.raycast.beginFill(0xfffffff,0.09);

      const uniqueAngles = [];
      uniquePoints.forEach(uniquePoint => {
        const angle = Math.atan2(uniquePoint.y-Player.y,uniquePoint.x-Player.x);
        uniquePoint.angle = angle;
        uniqueAngles.push(angle-0.00001,angle-0.00001,angle+0.00001);
      });

      let intersects = [];
      uniqueAngles.forEach(angle => {
        let closestIntersect = null;
        this.segments.forEach(seg => {
          const intersect = getIntersection(Player,seg, angle);
          if(!intersect) return;
          if(!closestIntersect || intersect.param < closestIntersect.param){
            closestIntersect = intersect;
          }
        });
        if(!closestIntersect) return;
        closestIntersect.angle = angle;
        intersects.push(closestIntersect);
      });

      intersects = intersects.sort((a,b) => a.angle - b.angle );
      this.raycast.moveTo(intersects[0].x,intersects[0].y);
      this.raycast.lineStyle(1, 0xffd900, 1);

      intersects.forEach(inter => this.raycast.lineTo(inter.x,inter.y));
    });

    viewport.addChild(this.raycast);
  }
}



// const addRaycastingOnVertex = () => {
//   const raycast = new Graphics();
//   const uniquePoints = segments.map(({a,b})=> (a,b));

//   ticker.add(() => {
//     raycast.clear();
//     raycast.beginFill(0xfffffff,0.34);
//     // raycast.position.copy({
//     //   x: Player.x -1500,
//     //   y: Player.y-400,
//     // });

//     const uniqueAngles = [];
//     uniquePoints.forEach(uniquePoint => {
//       const angle = Math.atan2(uniquePoint.y-Player.y,uniquePoint.x-Player.x);
//       uniquePoint.angle = angle;
//       uniqueAngles.push(angle-0.00001,angle-0.00001,angle+0.00001);
//     });

//     let intersects = [];
//     uniqueAngles.forEach(angle => {
//       let closestIntersect = null;
//       segments.forEach(seg => {
//         const intersect = getIntersection(Player,seg, angle);
//         if(!intersect) return;
//         if(!closestIntersect || intersect.param < closestIntersect.param){
//           closestIntersect = intersect;
//         }
//       });
//       if(!closestIntersect) return;
//       closestIntersect.angle = angle;
//       intersects.push(closestIntersect);
//     });

//     intersects = intersects.sort((a,b) => a.angle - b.angle );
//     raycast.moveTo(intersects[0].x,intersects[0].y);
//     raycast.lineStyle(1, 0xffd900, 1);

//     intersects.forEach(inter => raycast.lineTo(inter.x,inter.y));
//   });

//   viewport.addChild(raycast);
// };







module.exports = {
  DevRoom,
};
