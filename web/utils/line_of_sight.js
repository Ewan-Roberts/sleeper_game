// from :https://github.com/kittykatattack/gameUtilities/blob/master/src/gameUtilities.js
class Sight {
  static _getCenter(o, dimension, axis) {
    if (o.anchor !== undefined) {
      if (o.anchor[axis] !== 0) {
        return 0;
      }
      return dimension / 2;
    }
    return dimension;
  }

  static lineOfSight(
    s1,
    s2,
    obstacles,
    segment = 32
  ) {

    const spriteOneCenterX = s1.x + this._getCenter(s1, s1.width, 'x');
    const spriteOneCenterY = s1.y + this._getCenter(s1, s1.height, 'y');
    const spriteTwoCenterX = s2.x + this._getCenter(s2, s2.width, 'x');
    const spriteTwoCenterY = s2.y + this._getCenter(s2, s2.height, 'y');

    const vx = spriteTwoCenterX - spriteOneCenterX,
      vy = spriteTwoCenterY - spriteOneCenterY;

    const magnitude = Math.sqrt(vx * vx + vy * vy);

    const numberOfPoints = magnitude / segment;

    const points = () => {

      const arrayOfPoints = [];

      for (let i = 1; i <= numberOfPoints; i++) {

        const newMagnitude = segment * i;

        const dx = vx / magnitude,
          dy = vy / magnitude;

        const x = spriteOneCenterX + dx * newMagnitude,
          y = spriteOneCenterY + dy * newMagnitude;

        arrayOfPoints.push({
          x, y,
        });
      }

      return arrayOfPoints;
    };

    const hitTestPoint = (point, sprite) => {

      const left = point.x > sprite.x,
        right = point.x < (sprite.x + sprite.width),
        top = point.y > sprite.y - sprite.height,
        bottom = point.y < (sprite.y);

      return left && right && top && bottom;
    };

    const noObstacles = points().every(point => {
      return obstacles.every(obstacle => {
        return !(hitTestPoint(point, obstacle));
      });
    });

    //Return the true/false value of the collision test
    return noObstacles;
  }
}
//for none y axis handling
// const left = point.x > sprite.x,
//   right = point.x < (sprite.x + sprite.width),
//   top = point.y > sprite.y,
//   bottom = point.y < (sprite.y + sprite.height);

module.exports = {
  Sight,
};

