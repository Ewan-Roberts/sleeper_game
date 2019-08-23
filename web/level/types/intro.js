const { visuals } = require('../../engine/pixi_containers');

const { sound, filters  } = require('pixi.js');
const { keyboardManager } = require('pixi.js');
const { Sprite } = require('pixi.js');
const { Texture } = require('pixi.js');
const { Graphics } = require('pixi.js');

const { renderer   } = require('../../engine/app.js');
const { Click_Pad  } = require('../elements/click_pad');
const { Button     } = require('../../view/button');
const { Caption    } = require('../../view/caption');
const { players    } = require('../../engine/pixi_containers');
const { Tween      } = require('../../engine/tween');
const { viewport   } = require('../../engine/app');
const { FadeSprite } = require('../../effects/fade_sprite.js');
const { flash_at   } = require('../../effects/fade_sprite.js');
const { env        } = require('../../../config');
const { random_bound } = require('../../utils/math.js');
const { sleep    } = require('../../utils/time.js');
const { ProgressBar   } = require('../../view/progress_bar');

const {
  Trigger_Pad,
  Wall,
  Decal,
  Background,
  Chest,
  Roof,
  Door,
  Shroud,
  Collision,
  Floor,
  Generator,
} = require('../elements');

const event = require('events');

class Lamp extends Collision {
  constructor(data) {
    super(data);
    this.cast_light = new Sprite(Texture.fromImage('LightStone_green30_kpl'));
    this.cast_light.height = 250;
    this.cast_light.width  = 250;
    this.cast_light.alpha  = 0.5;
    this.cast_light.anchor.set(0.4, 0.6);
    this.cast_light.position.copy(this);
    this.events = new event();

    visuals.addChild(this.cast_light);
    this._textures();
    this._random_flickering();
    this.turn_off();
  }

  turn_on() {
    this.state              = true;
    this.texture            = this.lamp_on_texture;
    this.cast_light.visible = true;
    this.events.emit('on');
  }

  turn_off() {
    this.state              = false;
    this.texture            = this.lamp_off_texture;
    this.cast_light.visible = false;
    this.events.emit('off');
  }

  flicker_for(milliseconds) {
    this.flicker_running = true;

    setTimeout(() => {
      this.flicker_running = false;
    }, milliseconds);

    this._flicker();
  }

  _random_flickering() {
    const randomiser = random_bound(8000, 40000);

    setInterval(async () => {
      if (!this.state) return;
      this.turn_off();
      await sleep(random_bound(10, 150));
      this.turn_on();

    }, randomiser);
  }

  // recursive
  async _flicker() {
    // breaks recursion
    if(!this.flicker_running) return;

    const randomiser = random_bound(10, 30);
    this.turn_on();

    await sleep(randomiser+400);
    this.turn_off();

    await sleep(randomiser);
    this.turn_on();

    await sleep(randomiser*2);
    this.turn_off();

    await sleep(randomiser**2);
    this.turn_on();

    this._flicker();
  }

  _textures() {
    this.lamp_on_texture = Texture.fromImage('MI01_FurnitureFloorLampOn_05x05[lamp, floor lamp, lamp on, lamp turned on, standing lamp, upright lamp, room lamp]');
    this.lamp_off_texture = Texture.fromImage('MI01_FurnitureFloorLampOff_05x05[lamp, floor lamp, lamp off, lamp turned off, standing lamp, upright lamp, room lamp]');
  }
}


const white_filter = new filters.ColorMatrixFilter();
white_filter.greyscale(3);

class IntroRoom {
  constructor() {
    this.name   = 'intro_room';
    this.data   = require('../data/intro_room.json');
    this.player = players.children[0];

    this.backgrounds = this.data.background.map(data => new Background(data));
    this.shrouds     = this.data.shroud.map(data => new Shroud(data));
    this.roofs       = this.data.roof.map(data => new Roof(data));
    this.collisions  = this.data.collision.map(data => new Collision(data));
    this.floors      = this.data.floor.map(data => new Floor(data));
    this.decals      = this.data.decal.map(data => new Decal(data));
    this.doors       = this.data.door.map(data => new Door(data));
    this.exit_pad    = this.data.exit_pad.map(data => new Trigger_Pad(data));
    this.walls       = this.data.walls.map(data => new Wall(data));
    this.items       = this.data.item.map(data => new Chest(data));
    this.lights      = this.data.lights.map(data => new Lamp(data));
    this.generator   = new Generator(this.data.generator[0]);

    this.bedroom_light       = this.lights.find(light => light.id === 615);
    this.living_room_light   = this.lights.find(light => light.id === 614);
    this.kitchen_light       = this.lights.find(light => light.id === 613);

    this.study_desk          = this.items.find(item => item.id === 303);
    this.locked_door         = this.doors.find(door => door.id === 528);

    this.study_door          = this.doors.find(door => door.id === 527);
    this.study_door_light    = this.decals.find(shroud => shroud.id === 606);
    this.main_room_shroud    = this.shrouds.find(shroud => shroud.id === 462);

    this.bedroom_shroud      = this.shrouds.find(shroud => shroud.id === 617);
    this.bathroom_door       = this.doors.find(door => door.id === 590);
    this.bathroom_shroud     = this.shrouds.find(shroud => shroud.id === 464);
    this.bathroom_door_light = this.decals.find(shroud => shroud.id === 609);

    this.kitchen_shroud      = this.shrouds.find(shroud => shroud.id === 463);

    this.exit_door           = this.doors.find(door => door.id === 619);
    this.dumpster            = this.collisions.find(item => item.id === 524);
    this.spear               = this.items.find(item => item.id === 601);
    this.key                 = this.items.find(item => item.id === 618);

    this._set_sounds();
    this._set_elements();
    this._set_cutscene();
    if(env.dev) this._set_dev_settings();
  }

  _set_cutscene() {
    this.intro_fade = flash_at(this.player, 5000);

    const hand = new FadeSprite(this.data.white_hands[0]);
    hand.filters = [white_filter];
    hand.fade_in_wait_out(100, 500, 4000);
    visuals.addChild(hand);

    keyboardManager.disable();
    setTimeout(() => keyboardManager.enable(), 5000);
  }

  _set_sounds() {
    this.theme_song = sound.find('start_theme');
    this.theme_song.volume = 0.01;

    this.dramatic_beat = sound.find('dramatic_beat');
    this.dramatic_beat.volume = 0.3;

    this.keys_effect = sound.find('keys_jingle');
    this.keys_effect.volume = 0.2;
  }

  _set_elements() {
    renderer.backgroundColor = 0x000000;
    this.theme_song.play();

    this.player.position.copy(this.data.player_spawn.find(spawn=>spawn.id===137));
    viewport.moveCenter(this.player.x, this.player.y);

    this.bedroom_shroud.alpha = 1;
    this.bedroom_shroud.fade_out(6000);

    const start_lights_fade_in = () => {
      //this.study_door_light.destroy();
      this.locked_door.interactive = true;
      this.main_room_shroud.fade_out(3000);
      this.kitchen_shroud.fade_out(4000);
      this.bedroom_light.flicker_for(1200);

      // this.bedroom_light.events.on('on', () => this.bedroom_shroud.alpha = 0);
      // this.bedroom_light.events.on('off', () => this.bedroom_shroud.alpha = 0.2);

      this.living_room_light.flicker_for(3000);
      this.living_room_light.events.on('on', () => this.main_room_shroud.alpha = 0);
      this.living_room_light.events.on('off', () => this.main_room_shroud.alpha = 0.2);

      this.kitchen_light.flicker_for(800);
      this.kitchen_light.events.on('on', () => this.kitchen_shroud.alpha = 0);
      this.kitchen_light.events.on('off', () => this.kitchen_shroud.alpha = 0.2);
    };

    //start_lights_fade_in();
    this.study_door.once('click', () => {
      Caption.render('The generator is almost out of fuel. There is a car to the North');
      start_lights_fade_in();
    });

    this.key.click = () => console.log(this.player.inventory);

    this.exit_door.lock();
    this.exit_door.click = () => {
      const keys_for_door = this.player.inventory.take_item('keys_brass');
      if(keys_for_door) {
        this.exit_door.unlock().open();
      }
    };

    this.bathroom_door.once('click', () => {
      this.bathroom_shroud.fade_out();
      this.bathroom_door_light.destroy();
    });

    this.generator.click = () => {
      if(this.player.inventory.contains('oil_canister')) {
        const fuel_item = this.player.inventory.take_item('oil_canister');
        keyboardManager.disable();
        ProgressBar.show();

        this.generator.fuel = fuel_item.condition;
        ProgressBar.to_percentage(fuel_item.condition);
      }
    };

    ProgressBar.complete(() => {
      Caption.render('The fuel tank is empty.');
      this.generator.ready();
      keyboardManager.enable();
    });

    this.generator.end(() => {
      this.bedroom_light.turn_off();
      this.living_room_light.turn_off();
      this.kitchen_light.turn_off();
      this.kitchen_shroud.alpha   = 0.5;
      this.main_room_shroud.alpha = 0.5;
      this.bedroom_shroud.alpha   = 0.5;
      this.bathroom_shroud.alpha  = 0.8;
    });

    this.locked_door.lock();
    this.locked_door.once('click', () => {
      this.locked_door.interactive = false;
      Caption.render('I cant get in');
    });

    const pad_data = this.data.click_pad[0];
    const pad = new Click_Pad(pad_data);
    const button = new Button(pad, pad_data);
    pad.on('mouseover', () => {
      this.dumpster.tint = 0xffffff;
    });

    pad.on('mouseout', () => {
      this.dumpster.tint = 0xd3d3d3;
    });

    pad.interactive = false;

    this.spear.click = () => {
      this.dramatic_beat.play();
      pad.interactive = true;
    };

    pad.on('click', () => {
      const tween_it = new Tween(this.dumpster);
      tween_it.to({x: this.dumpster.x - 45, y:this.dumpster.y - 20});
      tween_it.time = 1000;
      tween_it.start();
      button.destroy();
      pad.interactive = false;
    });
  }

  _set_dev_settings() {
    this.player.position.copy(this.data.player_spawn[1]);
    viewport.moveCenter(this.player.x, this.player.y);

    this.theme_song.volume = 0;
    this.theme_song.stop();

    this.study_door.position.x   += 40;
    this.study_door.interactive  = true;
    this.locked_door.interactive = true;
    this.intro_fade.visible = false;
    keyboardManager.enable();
    setTimeout(()=> addVertexFromContainer(viewport.children[4]), 2000);
  }
}


const { ticker } = require('../../engine/app');

const Player = players.children[0];
function distanceSquared(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow((x1 - x2)) + Math.pow(y1 - y2, 2));
}

function linePoint(x1, y1, x2, y2, xp, yp, tolerance) {
  tolerance = tolerance || 1;
  return Math.abs(distanceSquared(x1, y1, x2, y2) - (distanceSquared(x1, y1, xp, yp) + distanceSquared(x2, y2, xp, yp))) <= tolerance;
}


function getCenter(o, dimension, axis) {
  if (o.anchor !== undefined) {
    if (o.anchor[axis] !== 0) {
      return 0;
    }
    return dimension / 2;
  }
  return dimension;
}


module.exports.angle = (sprite, point) => Math.atan2(
  (point.y) - (sprite.y + getCenter(sprite, sprite.height, 'y')),
  (point.x) - (sprite.x + getCenter(sprite, sprite.width, 'x'))
);

const trimVertexData = (sprite) => {
  const trimmedData = [];

  for (let i = 0; i < sprite.vertexData.length; i += 1) {
    if (i % 2 === 0) trimmedData.push(sprite.vertexData[i] - sprite.vertexData[0] + sprite.x);
    else trimmedData.push(sprite.vertexData[i] - sprite.vertexData[1] + sprite.y);
  }

  return trimmedData;
};

module.exports.hitBox = (x, y, points) => {
  const length = points.length;
  let c = false;
  let lastAction = 'top';
  let i;
  let j;
  for (i = 0, j = length - 2; i < length; i += 2) {
    if (((points[i + 1] > y) !== (points[j + 1] > y)) && (x < (points[j] - points[i]) * (y - points[i + 1]) / (points[j + 1] - points[i + 1]) + points[i])) {
      c = !c;
    }
    j = i;
  }
  if (c) {
    return lastAction;
  }
  for (i = 0; i < length; i += 2) {
    const p1x = points[i];
    const p1y = points[i + 1];
    let p2x;
    let p2y;
    if (i === length - 2) {
      p2x = points[0];
      p2y = points[1];
    } else {
      p2x = points[i + 2];
      p2y = points[i + 3];
    }
    if (linePoint(p1x, p1y, p2x, p2y, x, y, [1])) {
      if (p1x === points[0]) {
        lastAction = 'top';
        return 'top';
      }
      lastAction = 'bottom';
      return 'bottom';
    }
  }
  return false;
};

function getIntersection(ray,segment){

  // RAY in parametric: Point + Delta*T1
  const r_px = ray.a.x;
  const r_py = ray.a.y;
  const r_dx = ray.b.x-ray.a.x;
  const r_dy = ray.b.y-ray.a.y;

  // SEGMENT in parametric: Point + Delta*T2
  const s_px = segment.a.x;
  const s_py = segment.a.y;
  const s_dx = segment.b.x-segment.a.x;
  const s_dy = segment.b.y-segment.a.y;

  // Are they parallel? If so, no intersect
  const r_mag = Math.sqrt(r_dx*r_dx+r_dy*r_dy);
  const s_mag = Math.sqrt(s_dx*s_dx+s_dy*s_dy);
  if(r_dx/r_mag==s_dx/s_mag && r_dy/r_mag==s_dy/s_mag){
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

const segments = [
  // Border
  {a:{x:0,y:0}, b:{x:3640,y:0}},
  {a:{x:3640,y:0}, b:{x:3640,y:3360}},
  {a:{x:3640,y:3360}, b:{x:0,y:3360}},
  {a:{x:0,y:3360}, b:{x:0,y:0}},

  // Polygon #1
  {a:{x:100,y:150}, b:{x:120,y:50}},
  {a:{x:120,y:50}, b:{x:200,y:80}},
  {a:{x:200,y:80}, b:{x:140,y:210}},
  {a:{x:140,y:210}, b:{x:100,y:150}},

  // Polygon #2
  {a:{x:100,y:200}, b:{x:120,y:250}},
  {a:{x:120,y:250}, b:{x:60,y:300}},
  {a:{x:60,y:300}, b:{x:100,y:200}},

  // Polygon #3
  {a:{x:200,y:260}, b:{x:220,y:150}},
  {a:{x:220,y:150}, b:{x:300,y:200}},
  {a:{x:300,y:200}, b:{x:350,y:320}},
  {a:{x:350,y:320}, b:{x:200,y:260}},

  // Polygon #4
  {a:{x:340,y:60}, b:{x:360,y:40}},
  {a:{x:360,y:40}, b:{x:370,y:70}},
  {a:{x:370,y:70}, b:{x:340,y:60}},

  // Polygon #5
  {a:{x:450,y:190}, b:{x:560,y:170}},
  {a:{x:560,y:170}, b:{x:540,y:270}},
  {a:{x:540,y:270}, b:{x:430,y:290}},
  {a:{x:430,y:290}, b:{x:450,y:190}},

  // Polygon #6
  {a:{x:400,y:95}, b:{x:580,y:50}},
  {a:{x:580,y:50}, b:{x:480,y:150}},
  {a:{x:480,y:150}, b:{x:400,y:95}},

];

const addRaycastingOnVertex = (data) => {
  console.log('===========');
  console.log(data);
  console.log(segments);
  console.log('===========');
  const raycast = new Graphics();
  const points = (segments=>{
    const a = [];
    segments.forEach(seg=>a.push(seg.a,seg.b));
    return a;
  })(segments);
  const uniquePoints = (points=>{
    const set = {};
    return points.filter(p=>{
      const key = p.x+','+p.y;
      if(key in set){
        return false;
      }

      set[key]=true;
      return true;

    });
  })(points);

  ticker.add(() => {
    const uniqueAngles = [];
    let intersects = [];
    raycast.clear();
    raycast.beginFill(0xfffffff,0.34);
    for(let j=0;j<uniquePoints.length;j++){
      const uniquePoint = uniquePoints[j];
      const angle = Math.atan2(uniquePoint.y-Player.y,uniquePoint.x-Player.x);
      uniquePoint.angle = angle;
      uniqueAngles.push(angle-0.00001,angle-0.00001,angle+0.00001);
    }
    for(let k=0;k<uniqueAngles.length;k++){const angle = uniqueAngles[k];const dx = Math.cos(angle);const dy = Math.sin(angle);const ray = {a:{x:Player.x,y:Player.y},b:{x:Player.x+dx,y:Player.y+dy}};let closestIntersect = null;for(let i=0;i<segments.length;i++){const intersect = getIntersection(ray,segments[i]);if(!intersect) continue;if(!closestIntersect || intersect.param<closestIntersect.param){closestIntersect=intersect;}}if(!closestIntersect) continue;closestIntersect.angle = angle;intersects.push(closestIntersect);}
    intersects = intersects.sort((a,b)=>a.angle-b.angle);
    raycast.moveTo(intersects[0].x,intersects[0].y);
    raycast.lineStyle(1, 0xffd900, 1);
    for (let i = 1; i < intersects.length; i++) raycast.lineTo(intersects[i].x,intersects[i].y);

  });

  viewport.addChild(raycast);

};

const convertToRays = (vertex) => {
  const info = [
    {a:{x:vertex[0],y:vertex[1]}, b:{x:vertex[2],y:vertex[3]}},
    {a:{x:vertex[2],y:vertex[3]}, b:{x:vertex[4],y:vertex[5]}},
    {a:{x:vertex[4],y:vertex[5]}, b:{x:vertex[6],y:vertex[7]}},
    {a:{x:vertex[6],y:vertex[7]}, b:{x:vertex[0],y:vertex[1]}},
  ];
  return info;
};

const addVertexFromContainer = (containers) => {
  const containerVertexData = [];

  containers.children.forEach((child)=>{
    segments.push(...convertToRays(child.vertexData));
  });

  console.log(containerVertexData);

  addRaycastingOnVertex(containerVertexData);
};



//
//module.exports.addLevelRaycasting = () => {
//  const raycast = new PIXI.Graphics();
//  const points = (segments=>{
//    const a = [];
//    segments.forEach(seg=>a.push(seg.a,seg.b));
//    return a;
//  })(segments);
//  const uniquePoints = (points=>{
//    const set = {};
//    return points.filter(p=>{
//      const key = p.x+','+p.y;
//      if(key in set){
//        return false;
//      }
//
//      set[key]=true;
//      return true;
//
//    });
//  })(points);
//
//
//  const getSightPolygon = (PlayerX, PlayerY) => {
//
//    const uniqueAngles = [];
//    let intersects = [];
//    raycast.clear();
//    raycast.beginFill(0xfffffff, 12);
//    for (let j=0;j<uniquePoints.length;j++){
//      const uniquePoint = uniquePoints[j];
//      const angle = Math.atan2(uniquePoint.y-PlayerY,uniquePoint.x-PlayerX);
//      uniquePoint.angle = angle;
//      uniqueAngles.push(angle-0.00001,angle-0.00001,angle+0.00001);
//    }
//
//    for(let k=0;k<uniqueAngles.length;k++){
//      const angle = uniqueAngles[k];
//
//      const dx = Math.cos(angle);
//      const dy = Math.sin(angle);
//
//      const ray = {
//        a:{x:PlayerX,y:PlayerY},
//        b:{x:PlayerX+dx,y:Player.y+dy},
//      };
//
//      let closestIntersect = null;
//      for(let i=0;i<segments.length;i++){
//        const intersect = getIntersection(ray,segments[i]);
//        if(!intersect) continue;
//        if(!closestIntersect || intersect.param<closestIntersect.param){
//          closestIntersect=intersect;
//        }
//      }
//      if(!closestIntersect) continue;
//      closestIntersect.angle = angle;
//
//      intersects.push(closestIntersect);
//    }
//    intersects = intersects.sort((a,b)=>a.angle-b.angle);
//
//    return intersects;
//  };
//
//  function drawPolygon(polygon){
//    raycast.moveTo(polygon[0].x,polygon[0].y);
//    for(let i=1;i<polygon.length;i++){
//      const intersect = polygon[i];
//      raycast.lineTo(intersect.x,intersect.y);
//    }
//  }
//
//  let Mouse = {x: 1, y: 0};
//  viewport.on('mousemove', event => {
//    Mouse = event.data.global;
//    console.log(Mouse);
//  });
//  ticker.add(() => {
//    //drawPolygon(getSightPolygon(Player.x,Player.y));
//    // var fuzzyRadius = 30;
//    // var polygons = [getSightPolygon(Player.x,Player.y)];
//    // for(var angle=0;angle<Math.PI*1.2;angle+=(Math.PI*2)/10){
//    //   var dx = Math.cos(angle)*fuzzyRadius;
//    //   var dy = Math.sin(angle)*fuzzyRadius;
//    //   polygons.push(getSightPolygon(Player.x+dx,Player.y+dy));
//    // }
//
//    // for (let i = 0; i < polygons.length; i++) {
//    //   drawPolygon(polygons[i]);
//    // }
//
//    // const intersects = getSightPolygon(Player.x, Player.y);
//    // raycast.moveTo(intersects[0].x,intersects[0].y);
//    // raycast.lineStyle(1, 0xffd900, 1);
//    // for (let i = 1; i < intersects.length; i++) {
//    //   raycast.lineTo(intersects[i].x,intersects[i].y);
//    // }
//    // var fuzzyRadius = 10;
//    // var polygons = [getSightPolygon(Mouse.x,Mouse.y)];
//    // for(var angle=0;angle<Math.PI*2;angle+=(Math.PI*2)/10){
//    //   var dx = Math.cos(angle)*fuzzyRadius;
//    //   var dy = Math.sin(angle)*fuzzyRadius;
//    //   polygons.push(getSightPolygon(Mouse.x+dx,Mouse.y+dy));
//    // }
//
//  });
//
//  raycast.name = 'loog look';
//  viewport.addChild(raycast);
//};

//module.exports.addLevelRaycasting();



module.exports = {
  IntroRoom,
};
