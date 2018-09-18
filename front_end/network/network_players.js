const PIXI = require('pixi.js');

module.exports.load_network_sprite = () => {
  const bunny = PIXI.Sprite.fromFrame('bunny');

  global.socket.emit('get_network_sprites', ({ x: global.Player.sprite.x, y: global.Player.sprite.y }));

  global.socket.on('server_sprite', (serverSprite) => {
    bunny.x = serverSprite.x;
    bunny.y = serverSprite.y;
  });

  global.viewport.addChild(bunny);
};
