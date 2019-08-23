const PIXI = require('pixi.js');
const {
  viewport,
  ticker,
} = require('./app');
console.log(ticker);

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

console.log('wwwwwwwwwwwwww');

module.exports.angle = (sprite, point) => Math.atan2(
  (point.y) - (sprite.y + getCenter(sprite, sprite.height, 'y')),
  (point.x) - (sprite.x + getCenter(sprite, sprite.width, 'x'))
);

module.exports.drawPolygon = (points, color) => {
  color = typeof color === 'undefined' ? 0xffffff : color;
  const polygon = viewport.addChild(new PIXI.Graphics());
  polygon.beginFill(color).drawPolygon(points).endFill();
  return polygon;
};

module.exports.drawPathAndShow = (path) => {
  const pathVisualGuide = new PIXI.Graphics()
    .lineStyle(1, 0xffffff, 1)
    .drawPath(path);

  viewport.addChild(pathVisualGuide);
};

module.exports.trimVertexData = (sprite) => {
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

module.exports.hitBoxContainerObj = (container, player) => new Promise((resolve) => {
  for (let a = 0; a < container.length; a += 1) {
    const vertexData = this.trimVertexData(container[a]);
    if (this.hitBox(player.x, player.y, vertexData)) {
      resolve(container[a]);
    }
  }
});

module.exports.hitBoxSpriteObj = (sprite, player) => new Promise((resolve) => {
  const vertexData = this.trimVertexData(sprite);

  if (this.hitBox(player.x, player.y, vertexData)) {
    resolve(sprite);
  }
});

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

  // // Polygon #1
  // {a:{x:100,y:150}, b:{x:120,y:50}},
  // {a:{x:120,y:50}, b:{x:200,y:80}},
  // {a:{x:200,y:80}, b:{x:140,y:210}},
  // {a:{x:140,y:210}, b:{x:100,y:150}},

  // // Polygon #2
  // {a:{x:100,y:200}, b:{x:120,y:250}},
  // {a:{x:120,y:250}, b:{x:60,y:300}},
  // {a:{x:60,y:300}, b:{x:100,y:200}},

  // // Polygon #3
  // {a:{x:200,y:260}, b:{x:220,y:150}},
  // {a:{x:220,y:150}, b:{x:300,y:200}},
  // {a:{x:300,y:200}, b:{x:350,y:320}},
  // {a:{x:350,y:320}, b:{x:200,y:260}},

  // // Polygon #4
  // {a:{x:340,y:60}, b:{x:360,y:40}},
  // {a:{x:360,y:40}, b:{x:370,y:70}},
  // {a:{x:370,y:70}, b:{x:340,y:60}},

  // // Polygon #5
  // {a:{x:450,y:190}, b:{x:560,y:170}},
  // {a:{x:560,y:170}, b:{x:540,y:270}},
  // {a:{x:540,y:270}, b:{x:430,y:290}},
  // {a:{x:430,y:290}, b:{x:450,y:190}},

  // // Polygon #6
  // {a:{x:400,y:95}, b:{x:580,y:50}},
  // {a:{x:580,y:50}, b:{x:480,y:150}},
  // {a:{x:480,y:150}, b:{x:400,y:95}}

];


const convertToRays = (vertex) => {

  const info = [
    {a:{x:vertex[0],y:vertex[1]}, b:{x:vertex[2],y:vertex[3]}},
    {a:{x:vertex[2],y:vertex[3]}, b:{x:vertex[4],y:vertex[5]}},
    {a:{x:vertex[4],y:vertex[5]}, b:{x:vertex[6],y:vertex[7]}},
    {a:{x:vertex[6],y:vertex[7]}, b:{x:vertex[0],y:vertex[1]}},
  ];
  return info;
};

module.exports.addVertexFromContainer = (containers) => {

  const containerVertexData = [];

  containers.children.forEach((child)=>{

    containerVertexData.push(child.vertexData);

  });

  this.addRaycastingOnVertex(containerVertexData[0]);
};

module.exports.addVertexFromSprite = (sprite) => {
  const trimmed = this.trimVertexData(sprite);

  const foo = convertToRays(trimmed);

  foo.forEach((elem) => {
    segments.push(elem);
  });
};


module.exports.addRaycastingOnVertex = (data) => {
  const vertexData = convertToRays(data);
  const raycast = new PIXI.Graphics();
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

  ticker.add(delta => {
    const uniqueAngles = [];
    let intersects = [];
    PIXI.tweenManager.update();
    console.log(ticker.FPS.toFixed(1));
    raycast.clear();
    raycast.beginFill(0xfffffff,0.14);
    for(let j=0;j<uniquePoints.length;j++){
      const uniquePoint = uniquePoints[j];
      const angle = Math.atan2(uniquePoint.y-Player.sprite.y,uniquePoint.x-Player.sprite.x);
      uniquePoint.angle = angle;
      uniqueAngles.push(angle-0.00001,angle-0.00001,angle+0.00001);
    }
    for(let k=0;k<uniqueAngles.length;k++){const angle = uniqueAngles[k];const dx = Math.cos(angle);const dy = Math.sin(angle);const ray = {a:{x:Player.sprite.x,y:Player.sprite.y},b:{x:Player.sprite.x+dx,y:Player.sprite.y+dy}};let closestIntersect = null;for(let i=0;i<segments.length;i++){const intersect = getIntersection(ray,segments[i]);if(!intersect) continue;if(!closestIntersect || intersect.param<closestIntersect.param){closestIntersect=intersect;}}if(!closestIntersect) continue;closestIntersect.angle = angle;intersects.push(closestIntersect);}
    intersects = intersects.sort((a,b)=>a.angle-b.angle);
    raycast.moveTo(intersects[0].x,intersects[0].y);
    raycast.lineStyle(1, 0xffd900, 1);
    for (let i = 1; i < intersects.length; i++) raycast.lineTo(intersects[i].x,intersects[i].y);

  });

  viewport.addChild(raycast);

};


module.exports.addLevelRaycasting = () => {
  const raycast = new PIXI.Graphics();
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


  const getSightPolygon = (PlayerX, PlayerY) => {

    const uniqueAngles = [];
    let intersects = [];
    raycast.clear();
    raycast.beginFill(0xfffffff, 0.14);
    for (let j=0;j<uniquePoints.length;j++){
      const uniquePoint = uniquePoints[j];
      const angle = Math.atan2(uniquePoint.y-PlayerY,uniquePoint.x-PlayerX);
      uniquePoint.angle = angle;
      uniqueAngles.push(angle-0.00001,angle-0.00001,angle+0.00001);
    }

    for(let k=0;k<uniqueAngles.length;k++){
      const angle = uniqueAngles[k];

      const dx = Math.cos(angle);
      const dy = Math.sin(angle);

      const ray = {
        a:{x:PlayerX,y:PlayerY},
        b:{x:PlayerX+dx,y:Player.sprite.y+dy},
      };

      let closestIntersect = null;
      for(let i=0;i<segments.length;i++){
        const intersect = getIntersection(ray,segments[i]);
        if(!intersect) continue;
        if(!closestIntersect || intersect.param<closestIntersect.param){
          closestIntersect=intersect;
        }
      }
      if(!closestIntersect) continue;
      closestIntersect.angle = angle;

      intersects.push(closestIntersect);
    }
    intersects = intersects.sort((a,b)=>a.angle-b.angle);

    return intersects;
  };

  function drawPolygon(polygon){

    raycast.moveTo(polygon[0].x,polygon[0].y);
    for(let i=1;i<polygon.length;i++){
      const intersect = polygon[i];
      raycast.lineTo(intersect.x,intersect.y);
    }
  }

  console.log(ticker);
  ticker.add(() => {
    console.log(1);

    drawPolygon(getSightPolygon(Player.sprite.x,Player.sprite.y));
    // var fuzzyRadius = 30;
    // var polygons = [getSightPolygon(global.Player.sprite.x,global.Player.sprite.y)];
    // for(var angle=0;angle<Math.PI*1.2;angle+=(Math.PI*2)/10){
    //   var dx = Math.cos(angle)*fuzzyRadius;
    //   var dy = Math.sin(angle)*fuzzyRadius;
    //   polygons.push(getSightPolygon(global.Player.sprite.x+dx,global.Player.sprite.y+dy));
    // };

    // for (let i = 0; i < polygons.length; i++) {
    //   drawPolygon(polygons[i]);
    // }

    // PIXI.tweenManager.update();
    // let intersects = getSightPolygon(global.Player.sprite.x, global.Player.sprite.y);
    // raycast.moveTo(intersects[0].x,intersects[0].y);
    // raycast.lineStyle(1, 0xffd900, 1);
    // for (let i = 1; i < intersects.length; i++) {
    //   raycast.lineTo(intersects[i].x,intersects[i].y);
    // };
    // 	// Sight Polygons
    // var fuzzyRadius = 10;
    // var polygons = [getSightPolygon(Mouse.x,Mouse.y)];
    // for(var angle=0;angle<Math.PI*2;angle+=(Math.PI*2)/10){
    //   var dx = Math.cos(angle)*fuzzyRadius;
    //   var dy = Math.sin(angle)*fuzzyRadius;
    //   polygons.push(getSightPolygon(Mouse.x+dx,Mouse.y+dy));
    // };

  });

  viewport.addChild(raycast);

};

//module.exports.addLevelRaycasting();
