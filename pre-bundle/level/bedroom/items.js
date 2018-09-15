
const PIXI = require("pixi.js"),
$ = require('jQuery')

function getIntersection(a,b){const c=a.a.x,d=a.a.y,e=a.b.x-a.a.x,f=a.b.y-a.a.y,g=b.a.x,h=b.a.y,i=b.b.x-b.a.x,j=b.b.y-b.a.y,k=Math.sqrt(e*e+f*f),l=Math.sqrt(i*i+j*j);if(e/k==i/l&&f/k==j/l)return null;const m=(e*(h-d)+f*(c-g))/(i*f-j*e),n=(g+i*m-c)/e;return 0>n||0>m||1<m?null:{x:c+e*n,y:d+f*n,param:n}}

const addToSegments = item => {

    global.bedroom_segments.push(
        {a:{x:item.x,y:item.y+item.height},             b:{x:item.x,y:item.y}},
        {a:{x:item.x,y:item.y},                         b:{x:item.x+item.width,y:item.y}},
        {a:{x:item.x+item.width,y:item.y+item.height},  b:{x:item.x,y:item.y+item.height}},
        {a:{x:item.x+item.width,y:item.y+item.height},  b:{x:item.x+item.width,y:item.y}},
    )

}

function createPair(diffuseTex, normalTex, alpha) {
    
    const container = new PIXI.Container(),
    diffuseSprite = new PIXI.Sprite(diffuseTex),
    normalSprite = new PIXI.Sprite(normalTex);
    normalSprite.alpha = alpha
    diffuseSprite.parentGroup = PIXI.lights.diffuseGroup;
    normalSprite.parentGroup = PIXI.lights.normalGroup;
    container.addChild(diffuseSprite);
    container.addChild(normalSprite);
    // container.addChild(personal_light);
    return container;
}

const addLevelRaycasting = () =>{

    const raycast = new PIXI.Graphics();
    const points = (bedroom_segments=>{const a = [];global.bedroom_segments.forEach(seg=>a.push(seg.a,seg.b));return a;})(bedroom_segments);
    const uniquePoints = (points=>{const set = {};return points.filter(p=>{const key = p.x+","+p.y;if(key in set){return false;}else{set[key]=true;return true;}});})(points);

    global.app.ticker.add(delta => {

        const uniqueAngles = [];
        let intersects = [];
        PIXI.tweenManager.update();
        $(".fps").html("FPS: "+(app.ticker.FPS).toFixed(1));
        raycast.clear()
        raycast.beginFill(0xfffffff,0.14);
        for(let j=0;j<uniquePoints.length;j++){const uniquePoint = uniquePoints[j];const angle = Math.atan2(uniquePoint.y-Player.sprite.y,uniquePoint.x-Player.sprite.x);uniquePoint.angle = angle;uniqueAngles.push(angle-0.00001,angle-0.00001,angle+0.00001);}
        for(let k=0;k<uniqueAngles.length;k++){const angle = uniqueAngles[k];const dx = Math.cos(angle);const dy = Math.sin(angle);const ray = {a:{x:Player.sprite.x,y:Player.sprite.y},b:{x:Player.sprite.x+dx,y:Player.sprite.y+dy}};let closestIntersect = null;for(let i=0;i<global.bedroom_segments.length;i++){var intersect = getIntersection(ray,global.bedroom_segments[i]);if(!intersect) continue;if(!closestIntersect || intersect.param<closestIntersect.param){closestIntersect=intersect;}}if(!closestIntersect) continue;closestIntersect.angle = angle;intersects.push(closestIntersect);}
        intersects = intersects.sort((a,b)=>a.angle-b.angle);
        raycast.moveTo(intersects[0].x,intersects[0].y);
        raycast.lineStyle(1, 0xffd900, 1);
        for (let i = 1; i < intersects.length; i++) raycast.lineTo(intersects[i].x,intersects[i].y);

    });

    global.viewport.addChild(raycast)


}


module.exports.loadItem = (obj,func) => {
	return new Promise((resolve,reject)=>{

		PIXI.loader
		.add(obj.name,obj.path)
		.load((loader,res)=>{

			var item = new PIXI.Sprite(res.texture)

			item.position.set(obj.x,obj.y)
			item.rotation = obj.rotation
			item.interactive = obj.interactive || false;
			item.buttonMode = obj.buttonMode || false;
			item.on('pointerdown', () => {

				func()
			})
			resolve(item)
		})

	})

}


module.exports.add_items = (viewport) => {
	
	return new Promise((resolve,reject)=>{

		PIXI.loader
	    .add('box_full','images/chest_full.png')
	    // .add('box_full_NORM','images/chest_full_NORM.png')
	    .add('box_empty','images/chest_empty.png')
	    .add('dirty_matress','images/dirty_matress.png')
	    // .add('dirty_matress_NORM','images/dirty_matress_NORM.png')
	    .add('workbench','images/workbench.png')
	    // .add('workbench_NORM','images/workbench_NORM.png')
	    .add('cupboard','images/cupboard.png')
	    // .add('cupboard_NORM','images/cupboard_NORM.png')
	    .add('binder','images/binder.png')
	    .load((loader, res)=>{
		
		    const box_full  = new PIXI.Sprite(res.box_full.texture)
		    dirty_matress   = new PIXI.Sprite(res.dirty_matress.texture),
		    workbench       = new PIXI.Sprite(res.workbench.texture),
		    cupboard        = new PIXI.Sprite(res.cupboard.texture),
		    box_empty       = new PIXI.Sprite(res.box_empty.texture)

		    // socket.emit("get_player_data", ()=>{
		    //     console.log('sent')
		    // })

		    box_full.position.set(20,920)
		    box_full.width *=2
		    box_full.height *=2
		    box_full.rotation = 0.06
		    box_full.interactive = true
		    box_full.buttonMode = true;
		    box_full.id = 35
		    box_full.on('pointerdown', ()=> {
		        
		        console.log('box clicked')
		        socket.emit("get_container_contents", box_full.id)
		        box_full.children[0].texture = PIXI.utils.TextureCache["box_empty"];
		        $(".lootMenu").show()

		    }); 

		    dirty_matress.rotation = -0.9
		    dirty_matress.position.set(1000,1300)
		    dirty_matress.interactive = true
		    dirty_matress.buttonMode = true;
		    dirty_matress.name = "dirty_matress"
		    dirty_matress.on('pointerdown', () =>{
		        
		        console.log('bed clicked')
		        socket.emit("player_sleep", 8)

		    });

		    workbench.interactive = true;
		    workbench.buttonMode = true;
		    workbench.width = workbench.width/2
		    workbench.height = workbench.height/2
		    workbench.name = "workbench"
		    workbench.position.set(240,900)
		    workbench.on('pointerdown', function () {
		        
		    	console.log('workbench clicked')

		    });
		    addToSegments(workbench)

		    cupboard.interactive = true;
		    cupboard.buttonMode = true;
		    cupboard.position.set(5,2200)
		    cupboard.height *= 1.5
		    cupboard.width *= 1.35
		    cupboard.name = "cupboard"
		    addToSegments(cupboard)

	    	global.collisionItems.addChild(
	        	workbench,
	        	cupboard,
	        	box_full
	        );

	        global.viewport.addChild(
	        	dirty_matress,
	        	global.collisionItems
	        )
	        addLevelRaycasting()

	        resolve()

	    });

	})

}