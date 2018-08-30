


module.exports.clearViewport = () =>{

    for (var i = global.viewport.children.length - 1; i >= 0; i--) {  global.viewport.removeChild(global.viewport.children[i]);};
}

module.exports.clearCollision = () =>{

    for (var i = global.collisionItems.children.length - 1; i >= 0; i--) {  global.collisionItems.removeChild(global.collisionItems.children[i]);};
}