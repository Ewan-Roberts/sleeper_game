// from :https://github.com/kittykatattack/gameUtilities/blob/master/src/gameUtilities.js
class Sight {
  /* A utility that finds the center point of the sprite. If it's anchor point is the
  sprite's top left corner, then the center is calculated from that point.
  If the anchor point has been shifted, then the anchor x/y point is used as the sprite's center
  */

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
    s1, //The first sprite, with `centerX` and `centerY` properties
    s2, //The second sprite, with `centerX` and `centerY` properties
    obstacles, //An array of sprites which act as obstacles
    segment = 32 //The distance between collision points
  ) {

    //Calculate the center points of each sprite
    const spriteOneCenterX = s1.x + this._getCenter(s1, s1.width, 'x');
    const spriteOneCenterY = s1.y + this._getCenter(s1, s1.height, 'y');
    const spriteTwoCenterX = s2.x + this._getCenter(s2, s2.width, 'x');
    const spriteTwoCenterY = s2.y + this._getCenter(s2, s2.height, 'y');

    //Plot a vector between spriteTwo and spriteOne
    const vx = spriteTwoCenterX - spriteOneCenterX,
      vy = spriteTwoCenterY - spriteOneCenterY;

    //Find the vector's magnitude (its length in pixels)
    const magnitude = Math.sqrt(vx * vx + vy * vy);

    //How many points will we need to test?
    const numberOfPoints = magnitude / segment;

    //Create an array of x/y points, separated by 64 pixels, that
    //extends from `spriteOne` to `spriteTwo`
    const points = () => {

      //Initialize an array that is going to store all our points
      //along the vector
      const arrayOfPoints = [];

      //Create a point object for each segment of the vector and
      //store its x/y position as well as its index number on
      //the map array
      for (let i = 1; i <= numberOfPoints; i++) {

        //Calculate the new magnitude for this iteration of the loop
        const newMagnitude = segment * i;

        //Find the unit vector. This is a small, scaled down version of
        //the vector between the sprites that's less than one pixel long.
        //It points in the same direction as the main vector, but because it's
        //the smallest size that the vector can be, we can use it to create
        //new vectors of varying length
        const dx = vx / magnitude,
          dy = vy / magnitude;

        //Use the unit vector and newMagnitude to figure out the x/y
        //position of the next point in this loop iteration
        const x = spriteOneCenterX + dx * newMagnitude,
          y = spriteOneCenterY + dy * newMagnitude;

        //Push a point object with x and y properties into the `arrayOfPoints`
        arrayOfPoints.push({
          x, y,
        });
      }

      //Return the array of point objects
      return arrayOfPoints;
    };

    //Test for a collision between a point and a sprite
    const hitTestPoint = (point, sprite) => {

      //Find out if the point's position is inside the area defined
      //by the sprite's left, right, top and bottom sides
      const left = point.x > sprite.x,
        right = point.x < (sprite.x + sprite.width),
        top = point.y > sprite.y - sprite.height,
        bottom = point.y < (sprite.y);

      //If all the collision conditions are met, you know the
      //point is intersecting the sprite
      return left && right && top && bottom;
    };

    //The `noObstacles` function will return `true` if all the tile
    //index numbers along the vector are `0`, which means they contain
    //no obstacles. If any of them aren't 0, then the function returns
    //`false` which means there's an obstacle in the way
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



