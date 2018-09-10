
const PIXI = require("pixi.js"),
$ = require('jQuery')
module.exports.add_items = () => {

	PIXI.loader
	.add('box_full','images/chest_full.png')
	.add('movable_box','images/chest_full.png')
	.add('box_empty','images/chest_empty.png')
	.load((loader, res)=>{
	
		const box_full  = new PIXI.Sprite(res.box_full.texture);
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


		const movable_box  = new PIXI.Sprite(res.movable_box.texture);
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
		
		// triggers.createTriggerPad(0, 0, 250, 250, {x: 200, y:200})
        // .then(trigger => {
        //     console.log("trigger")
        //     console.log(trigger)
            
        //     global.collisionItems.addChild(trigger)
            
		// })
		
		global.movableItems.addChild(movable_box)
		global.collisionItems.addChild(box_full)
		
	});

	global.socket.on("container_contents", contents =>{
		console.log(contents)
	})

}