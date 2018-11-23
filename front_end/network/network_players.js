const PIXI = require('pixi.js');
const socket = require('./socket');
const viewport = require('../engine/viewport');

module.exports.load_network_sprite = () => {
  const bunny = PIXI.Sprite.fromFrame('bunny');

  socket.emit('get_network_sprites', ({ x: global.Player.sprite.x, y: global.Player.sprite.y }));

  socket.on('server_sprite', (serverSprite) => {
    bunny.x = serverSprite.x;
    bunny.y = serverSprite.y;
  });

  viewport.addChild(bunny);
};
