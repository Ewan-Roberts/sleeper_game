

const PIXI = require('pixi.js');

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
  (point.x) - (sprite.x + getCenter(sprite, sprite.width, 'x')),
);

module.exports.drawPolygon = (points, color) => {
  color = typeof color === 'undefined' ? 0xffffff : color;
  const polygon = global.viewport.addChild(new PIXI.Graphics());
  polygon.beginFill(color).drawPolygon(points).endFill();
  return polygon;
};

module.exports.drawPathAndShow = (path) => {
  const pathVisualGuide = new PIXI.Graphics()
    .lineStyle(1, 0xffffff, 1)
    .drawPath(path);

  global.viewport.addChild(pathVisualGuide);
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
