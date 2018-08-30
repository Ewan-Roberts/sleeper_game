const   PIXI        = require("pixi.js");

function _getCenter(o, dimension, axis) {
    if (o.anchor !== undefined) {
        if (o.anchor[axis] !== 0) {
            return 0
        }
        return dimension / 2
    }
    return dimension
}

module.exports.angle = (sprite, point) =>{
	return Math.atan2(
      	(point.y) - (sprite.y + _getCenter(sprite, sprite.height, "y")),
      	(point.x) - (sprite.x + _getCenter(sprite, sprite.width, "x"))
	)
}

module.exports.drawPolygon = (points, color) => {
    color = typeof color === 'undefined' ? 0xffffff : color
    const polygon = global.viewport.addChild(new PIXI.Graphics())
    polygon.beginFill(color).drawPolygon(points).endFill()
    return polygon
}