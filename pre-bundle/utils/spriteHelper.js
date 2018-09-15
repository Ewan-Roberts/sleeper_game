const   PIXI        = require("pixi.js");


function distanceSquared(x1, y1, x2, y2)
{
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))
}


/**
 * box-box collision
 * @param {number} x1 top-left corner of first box
 * @param {number} y1 top-left corner of first box
 * @param {number} w1 width of first box
 * @param {number} h1 height of first box
 * @param {number} x2 top-left corner of second box
 * @param {number} y2 top-left corner of second box
 * @param {number} w2 width of second box
 * @param {number} h2 height of second box
 */
module.exports.boxBox = (x1, y1, w1, h1, x2, y2, w2, h2) =>{
    return x1 < x2 + w2 && x1 + w1 > x2 && y1 < y2 + h2 && y1 + h1 > y2
}

/**
 * line-point collision
 * from https://stackoverflow.com/a/17693146/1955997
 * @param {number} x1 first point in line
 * @param {number} y1 first point in line
 * @param {number} x2 second point in line
 * @param {number} y2 second point in line
 * @param {number} xp point
 * @param {number} yp point
 * @param {number} [tolerance=1]
 * @return {boolean}
 **/



 function linePoint(x1, y1, x2, y2, xp, yp, tolerance)
{
    tolerance = tolerance || 1
    return Math.abs(distanceSquared(x1, y1, x2, y2) - (distanceSquared(x1, y1, xp, yp) + distanceSquared(x2, y2, xp, yp))) <= tolerance
}


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

module.exports.drawPathAndShow = path => {

  const path_visual_guide = new PIXI.Graphics()
  .lineStyle(1, 0xffffff, 1)
  .drawPath(path)

  global.viewport.addChild(path_visual_guide)
}

module.exports.trimVertexData = sprite => {

  const trimmedData= [];
  
  for (let i = 0; i < sprite.vertexData.length; i++) {

    if(i % 2 === 0){
      trimmedData.push(sprite.vertexData[i]-sprite.vertexData[0]+sprite.x)
    } else {
      trimmedData.push(sprite.vertexData[i]-sprite.vertexData[1]+sprite.y)
    }
    
  }

  return trimmedData;

}

module.exports.hitBox = (x, y, points) => {
  var length = points.length
  var c = false
  var lastAction = "top"
  var i, j
  for (i = 0, j = length - 2; i < length; i += 2)
  {
      if (((points[i + 1] > y) !== (points[j + 1] > y)) && (x < (points[j] - points[i]) * (y - points[i + 1]) / (points[j + 1] - points[i + 1]) + points[i]))
      {
          
          c = !c
      }
      j = i
  }
  if (c)
  {
      return lastAction
      
  }
  for (i = 0; i < length; i += 2)
  {
      var p1x = points[i]
      var p1y = points[i + 1]
      var p2x, p2y
      if (i === length - 2)
      {
          
          p2x = points[0]
          p2y = points[1]
      }
      else
      {
          
          p2x = points[i + 2]
          p2y = points[i + 3]
      }
      if (linePoint(p1x, p1y, p2x, p2y, x, y,[1]))
      {
          
          if(p1x === points[0]){
              
              lastAction = "top"
              return "top"
              
          }else{
              lastAction = "bottom";
              return "bottom"
          }
          return true
      }
  }
  
  return false
}


module.exports.hitBoxContainer = (container, player) => {

  return new Promise((resolve,reject)=>{
    
    let hit = false

    for (let a = 0; a < container.length; a++) {

      if (this.hitBox(player.x, player.y, this.trimVertexData(container[a]))) {

        hit = true
        
      }

    }

    resolve(hit)

  })

}

module.exports.hitStepForward = (container, player, key) => {

  return new Promise((resolve,reject)=>{

      if(key === "up")    player.y-40
      if(key === "down")  player.y+40
      if(key === "left")  player.x-20
      if(key === "right") player.x+20

    for (let a = 0; a < container.length; a++) {

      const vertexData = this.trimVertexData(container[a])

      if (this.hitBox(player.x, player.y, vertexData)) {
        resolve(true)
      } else{
        resolve(false)
      }
    }

  })

}

module.exports.hitBoxContainerChildernObj = (container, player) => {

  return new Promise((resolve,reject)=>{

    for (let a = 0; a < container.length; a++) {
      console.log("container[a]")
      console.log(container[a])
      container[a].children.forEach(child => {

        
      
        if (this.hitBox(player.x, player.y, this.trimVertexData(child))) {
          resolve(child)
        }

      })


    }

  })

}

module.exports.hitBoxContainerObj = (container, player) => {

  return new Promise((resolve,reject)=>{

    for (let a = 0; a < container.length; a++) {

      const vertexData = this.trimVertexData(container[a])
      
      if (this.hitBox(player.x, player.y, vertexData)) {
        resolve(container[a])
      }
    }

  })

}

module.exports.hitBoxSpriteObj = (sprite, player) => {

  return new Promise((resolve,reject)=>{

      const vertexData = this.trimVertexData(sprite)
      
      if (this.hitBox(player.x, player.y, vertexData)) {
        resolve(sprite)
      }
    
  })

}

module.exports.hitBoxContainerObjAndBool = (container, player) => {

  return new Promise((resolve,reject)=>{

    for (let a = 0; a < container.length; a++) {

      const vertexData = module.exports.trimVertexData(container[a])
      
      if (module.exports.hitBox(player.x, player.y, vertexData)) {
        resolve(container[a])
      } else {
        resolve(false)
      }
    }

  })

}