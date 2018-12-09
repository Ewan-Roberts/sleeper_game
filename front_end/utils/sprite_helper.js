function getCenter(o, dimension, axis) {
  if (o.anchor !== undefined) {
    if (o.anchor[axis] !== 0) {
      return 0;
    }
    return dimension / 2;
  }
  return dimension;
}

module.exports.get_angle_from_point_to_point = (sprite, point) => Math.atan2(
  (point.y) - (sprite.y + getCenter(sprite, sprite.height, 'y')),
  (point.x) - (sprite.x + getCenter(sprite, sprite.width, 'x'))
);

