
const PIXI = require("pixi.js");
module.exports.add_items = () => {

  const box_full  = PIXI.Sprite.fromFrame('chest_full')
  box_full.position.set(-1200,0);
  box_full.width *=2;
  box_full.height *=2;
  box_full.rotation = 0.06;
  box_full.interactive = true;
  box_full.buttonMode = true;
  box_full.id = 35;
  box_full.on('pointerdown', ()=> { 
    box_full.texture = res.box_empty.texture
    
    global.socket.emit("get_container_contents", box_full.id)
  }); 

  const movable_box  = PIXI.Sprite.fromFrame('chest_full')
  movable_box.position.set(-600,400);
  movable_box.width *=2;
  movable_box.height *=2;
  movable_box.rotation = 0.06;
  movable_box.interactive = true;
  movable_box.buttonMode = true;
  movable_box.weight = 10;
  
  global.movableItems.addChild(movable_box)
  global.collisionItems.addChild(box_full)
  global.viewport.addChild(global.collisionItems)

	global.socket.on("container_contents", contents =>{
		console.log(contents)
	})

}