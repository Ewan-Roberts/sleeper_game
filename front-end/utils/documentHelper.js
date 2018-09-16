//utils

const keymap = {
  "w": "up",
  "a": "left",
  "s": "down",
  "d": "right",
  "ArrowUp": "up",
  "ArrowLeft": "left",
  "ArrowDown": "down",
  "ArrowRight": "right"
};

module.exports.getDirection = key => keymap[key];

module.exports.mousePositionFromPlayer = (event, player, viewport) => {

  return {
    x:event.x + player.x - viewport.screenWidth/2,
    y:event.y + player.y - viewport.screenHeight/2
  }
}

module.exports.mousePositionFromScreen = (event, viewport) => {

  return {
    x:event.x - viewport.screenWidth/2,
    y:event.y - viewport.screenHeight/2
  }
}