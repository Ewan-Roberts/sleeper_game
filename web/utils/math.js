'use strict';

function distance_between_points(point_1, point_2) {
  const dx = point_2.x - point_1.x;
  const dy = point_2.y - point_1.y;

  return Math.sqrt((dx * dx) + (dy * dy));
}
//TODO replace random number with this
// function random_number1() {
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }

function random_number(min, max) {
  return Math.floor(Math.random() * max) + min;
}

// -1.57 to 1.57
function radian(anchor, point){
  return Math.atan2(anchor.y - point.y, anchor.x - point.x);
}

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


module.exports = {
  angle,
  radian_positive,
  radian,
  angle_360,
  random_number,
  distance_between_points,
};
