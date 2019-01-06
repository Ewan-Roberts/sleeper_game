'use strict';

function distance_between_points(point_1, point_2) {
  const dx = point_2.x - point_1.x;
  const dy = point_2.y - point_1.y;

  return Math.sqrt((dx * dx) + (dy * dy));
}

function generate_number_between_min_and_max(min, max) {
  return Math.floor(Math.random() * max) + min;
}

function radian(anchor, point){
  return Math.atan2(anchor.y - point.y, anchor.x - point.x);
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
  radian,
  angle_360,
  generate_number_between_min_and_max,
  distance_between_points,
};
