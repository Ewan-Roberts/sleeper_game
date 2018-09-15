


module.exports.load_network_sprite = () => {

  const bunny = PIXI.Sprite.fromImage('images/bunny.png');


  global.viewport.addChild(bunny)

  const playerDets = {
    x: global.Player.sprite.x,
    y: global.Player.sprite.y
  }
  
  global.socket.emit("get_network_sprites", ({x: global.Player.sprite.x, y: global.Player.sprite.y}));

  global.socket.on('server_sprite' , server_sprite =>{

    console.log(server_sprite);
    bunny.x = server_sprite.x;
    bunny.y = server_sprite.y;
    
  })

  

}