const { Point } = require('pixi.js');

function distance_between(point_1, point_2) {
  const dx = point_2.x - point_1.x;
  const dy = point_2.y - point_1.y;

  return Math.sqrt((dx * dx) + (dy * dy));
}

// TODO replace random number with this
function random_bound(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function random_number(min, max) {
  return Math.floor(Math.random() * max) + min;
}

// -1.57 to 1.57
function radian(anchor, point){
  const radian_value = Math.atan2(anchor.y - point.y, anchor.x - point.x);

  if(
    global.isNaN(radian_value)
    || radian_value === undefined
  ) {
    throw new Error('invald radian ' + radian_value);
  }

  return radian_value;
}

const face_point = (anchor, point) => radian(anchor, point);

// 0 - 3.14 always positive
function radian_positive(anchor, point){
  return Math.atan2(anchor.y - point.y, anchor.x - point.x) + 1.57;
}

// angle in degrees from -180 to 180
function angle(anchor, point) {
  return Math.atan2(point.y - anchor.y, point.x - anchor.x) * 180 / Math.PI;
}

// angle in degrees from 0 to 360
function angle_360(anchor, point) {
  return Math.atan2(anchor.y - point.y, anchor.x - point.x) * 180 / Math.PI + 180;
}

function point_radius_away_from_point(p1, p2, radius = -100) {
  const distance_point = Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2);
  const ratio = radius / distance_point;

  const x1 = ((1 - ratio * p2.x + ratio * p1.x));
  const y1 = ((1 - ratio * p2.y + ratio * p1.y));

  const x2 = p1.x + x1;
  const y2 = p1.y + y1;

  return new Point(x2, y2);
}

module.exports = {
  angle,
  face_point,
  radian_positive,
  radian,
  angle_360,
  random_number,
  random_bound,
  distance_between,
  point_radius_away_from_point,
};
