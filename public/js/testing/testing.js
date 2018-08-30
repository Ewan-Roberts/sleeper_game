
console.log("testing layer")

const add_Test = () => {
	
	return new Promise((resolve,reject)=>{

		PIXI.loader
	    .add('door','images/black_wall.png')
	    .load((loader, res)=>{

		    //const door  = new PIXI.Sprite(res.door.texture);
		  
   //          // door.interactive = true;
   //          // door.width = door.width/3
   //          // door.position.set(1000,1500)
   //          let door = new PIXI.Graphics()
   //          .beginFill(0xFF3300)
   //          .lineStyle(1,0xffd900)
   //          .moveTo(0,0)
   //          .lineTo(250,0)
   //          .lineTo(250,50)
   //          .lineTo(0,50)
   //          .lineTo(0,0)
   //          .endFill()
   //          door.interactive = true;
   //          door.position.set(1000,1500)




   //          b.hit(door,Player.sprite,true,true,true, function(collision, platform){

			//     //`collision` tells you the side on player that the collision occurred on.
			//     //`platform` is the sprite from the `world.platforms` array
			//     //that the player is colliding with
			//     console.log(collision)
			// })

	  //       collisionItems.addChild(
	  //       	door
	  //       )



	        resolve()

	    });

	})

}