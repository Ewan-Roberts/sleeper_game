
const PIXI = require("pixi.js");
module.exports.add_items = () => {

	global.loader.load((loader,res)=>{
		const resources = res['81e4e714ce807738e1a0583e2b7671348c72e274.png'].textures
    console.log(resources)
    console.log("resources1")
    // PIXI.Texture.fromLoader(resources[name])
		const box_full  = new PIXI.Sprite(resources.chest_empty);
		box_full.position.set(-1200,0);
		box_full.width *=2;
		box_full.height *=2;
		box_full.rotation = 0.06;
		box_full.interactive = true;
		box_full.buttonMode = true;
		box_full.id = 35;
		box_full.on('pointerdown', ()=> {
			
			box_full.texture = res.box_empty.texture
			console.log('box clicked')
			global.socket.emit("get_container_contents", box_full.id)

		}); 


		const movable_box  = new PIXI.Sprite(resources.chest_full);
		movable_box.position.set(-600,400);
		movable_box.width *=2;
		movable_box.height *=2;
		movable_box.rotation = 0.06;
		movable_box.interactive = true;
		movable_box.buttonMode = true;
		movable_box.weight = 10;
		movable_box.on('pointerdown', ()=> {
			
			console.log('movable')

		});
		
		global.movableItems.addChild(movable_box)
    global.collisionItems.addChild(box_full)
    global.viewport.addChild(global.collisionItems)
    
	
	})

	
	

	global.socket.on("container_contents", contents =>{
		console.log(contents)
	})

}