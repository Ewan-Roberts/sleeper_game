
const $     = require('jQuery'),
player      = require("../../player/player.js"),
items       = require("./items.js"),
trigger     = require("./bedroom_triggers.js")
// Intersects  = require('yy-intersects');




const addToSegments = item => {

    global.bedroom_segments.push(
        {a:{x:item.x,y:item.y+item.height},             b:{x:item.x,y:item.y}},
        {a:{x:item.x,y:item.y},                         b:{x:item.x+item.width,y:item.y}},
        {a:{x:item.x+item.width,y:item.y+item.height},  b:{x:item.x,y:item.y+item.height}},
        {a:{x:item.x+item.width,y:item.y+item.height},  b:{x:item.x+item.width,y:item.y}},
    )

}

module.exports.add_floor = () => {
    return new Promise((resolve,reject)=>{

        PIXI.loader
        .add('floor','images/flat_floor_low_2.jpg')
        .add('debug_wall','images/black_wall.png')
        .load((loader,res)=>{

            
            let floor = new PIXI.Sprite(res.floor.texture)
            // floor.alpha = 0.5
            floor.interactive = true;
            floor.zIndex =1;
            
            
            // global.stage.updateStage();
            // floor.on('mousemove', event => {

            //     // Create a new Graphics object and add it to the scene
            //     let myGraph = new PIXI.Graphics();
            //     myGraph.clear()
            //     viewport.addChild(myGraph);

            //     // Move it to the beginning of the line
            //     myGraph.position.set(global.Player.sprite.x, global.Player.sprite.y);


            //     // Draw the line (endPoint should be relative to myGraph's position)
            //     myGraph.lineStyle(1, 0xffffff)
            //     .moveTo(global.Player.sprite.x, global.Player.sprite.y)
            //     .lineTo(event.data.global.y, event.data.global.x);

            //     // personal_light.rotation = 200
            //     // Mouse.x = event.data.global.x
            //     // Mouse.y = event.data.global.y
            //     // personal_light.position.x = event.data.global.x +100
            //     // personal_light.position.y = event.data.global.y +100
                
            // });
            
            // viewport.addChild(floor)
            //TOP
            const   bedroom_top_left = new PIXI.Sprite(res.black_wall.texture);
            
            bedroom_top_left.position.set(0,820)
            bedroom_top_left.height =80
            bedroom_top_left.width =600
            addToSegments(bedroom_top_left)
            
            // bedroom_top_left.shape = new Intersects.Rectangle(bedroom_top_left)
            console.log("fwefewfewf")
            const   collision_door = new PIXI.Sprite(res.black_wall.texture);
            collision_door.position.set(1050,2125)

            collision_door.height =50
            collision_door.width =400
            collision_door.name = "door"
            addToSegments(collision_door)


            const   bedroom_top_right = new PIXI.Sprite(res.black_wall.texture);
            bedroom_top_right.position.set(970,825)
            bedroom_top_right.height +=27
            bedroom_top_right.width =1410
            
            addToSegments(bedroom_top_right)

            const   living_room_top_right = new PIXI.Sprite(res.black_wall.texture);
            living_room_top_right.position.set(2770,825)
            living_room_top_right.height +=27
            living_room_top_right.width =800
            addToSegments(living_room_top_right)

            const   middle_wall = new PIXI.Sprite(res.black_wall.texture);
            middle_wall.position.set(1647,880)
            middle_wall.height =2100
            middle_wall.width =85
            addToSegments(middle_wall)

            const   hallway_right_wall = new PIXI.Sprite(res.black_wall.texture);
            hallway_right_wall.position.set(332,2100)
            hallway_right_wall.height =2570
            hallway_right_wall.width =81
            addToSegments(hallway_right_wall)

            const   bathroom_top_left = new PIXI.Sprite(res.black_wall.texture);
            bathroom_top_left.position.set(400,2100)
            bathroom_top_left.width = 650
            bathroom_top_left.height = 90
            addToSegments(bathroom_top_left)

            const   bathroom_bottom = new PIXI.Sprite(res.black_wall.texture);
            bathroom_bottom.position.set(410,2760)
            bathroom_bottom.width = 1240
            bathroom_bottom.height = 90
            addToSegments(bathroom_bottom)

            const   bathroom_top_right = new PIXI.Sprite(res.black_wall.texture);
            bathroom_top_right.position.set(1370,2100)
            bathroom_top_right.height = 90
            bathroom_top_right.width = 280
            addToSegments(bathroom_top_right)

            const   caroline_bottom = new PIXI.Sprite(res.black_wall.texture);
            caroline_bottom.position.set(410,3630)
            caroline_bottom.width = 1240
            caroline_bottom.height = 90
            addToSegments(caroline_bottom)    

            const   caroline_right = new PIXI.Sprite(res.black_wall.texture);
            caroline_right.position.set(1647,3380)
            caroline_right.height =520
            caroline_right.width =83
            addToSegments(caroline_right)

            const   ben_bottom = new PIXI.Sprite(res.black_wall.texture);
            ben_bottom.position.set(410,4580)
            ben_bottom.width = 1240
            ben_bottom.height = 90
            addToSegments(ben_bottom)  

            const   ben_right = new PIXI.Sprite(res.black_wall.texture);
            ben_right.position.set(1647,4280)
            ben_right.height =390
            ben_right.width =85
            addToSegments(ben_right)

            const   kitchen_left = new PIXI.Sprite(res.black_wall.texture);
            kitchen_left.position.set(2300,2780)
            kitchen_left.height =1800
            kitchen_left.width =80
            addToSegments(kitchen_left)

            const   main_bathroom_left = new PIXI.Sprite(res.black_wall.texture);
            main_bathroom_left.position.set(2300,4880)
            main_bathroom_left.height =125
            main_bathroom_left.width =80
            addToSegments(main_bathroom_left)

            const   main_bathroom_top = new PIXI.Sprite(res.black_wall.texture);
            main_bathroom_top.position.set(2300,4112)
            main_bathroom_top.height = 78
            main_bathroom_top.width =1300
            addToSegments(main_bathroom_top)
            
            global.collisionItems.addChild(
                bedroom_top_left,
                collision_door,
                bedroom_top_right,
                middle_wall,
                main_bathroom_left,
                living_room_top_right,
                main_bathroom_top,
                hallway_right_wall,
                bathroom_top_left,
                bathroom_top_right,
                bathroom_bottom,
                caroline_bottom,
                caroline_right,
                ben_right,
                ben_bottom,
                kitchen_left
            )


            global.collisionItems.zIndex = -1;
            // console.log(bounds)
            global.viewport.addChild(floor,global.collisionItems)
            
            global.viewport.updateLayersOrder();
            
            trigger.createTriggerPad()

            trigger.createDebugTrigger()

            resolve()

        })

    })

}














