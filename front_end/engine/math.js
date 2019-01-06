'use strict';


function distance_between_points(point_1, point_2) {
  const dx = point_2.x - point_1.x;
  const dy = point_2.y - point_1.y;

  return Math.sqrt((dx * dx) + (dy * dy));
}


function generate_number_between_min_and_max(min, max) {
  return Math.floor(Math.random() * max) + min;
}

function angle(anchor, point){
  return Math.atan2( anchor.y - point.y,anchor.x - point.x);
}

module.exports = {
  angle,
  generate_number_between_min_and_max,
  distance_between_points,
};
