
const rain_drop = () => new Promise((resolve,reject)=>{

    PIXI.loader        
    .add('images/raindrop_01.png')
    .add('images/raindrop_02.png')
    .add('images/raindrop_03.png')
    .add('images/raindrop_04.png')
    .add('images/raindrop_05.png')
    .add('images/raindrop_06.png')
    .add('images/raindrop_07.png')
    .add('images/raindrop_08.png')
    .add('images/raindrop_09.png')
    .add('images/raindrop_10.png')
    .add('images/raindrop_11.png')
    .add('images/raindrop_12.png')
    .add('images/raindrop_13.png')
    // .on("progress", loader=>{})
    .load(()=>resolve('drop loaded'))

})
.then(res=>{
    let rain_frames = []
    for (let i = 1; i < 13; i++) {
        // magically works since the spritesheet was loaded with the pixi loader
        let val = i < 10 ? '0' + i : i;

        rain_frames.push(PIXI.Texture.fromFrame('images/raindrop_' + val + '.png'));
    }
    return rain_frames;
})
.then(frames => {

    const rain_noise = new Audio('audio/light_rain.wav')

    function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }

    for (var i = 0; i < 150; i++) {
        const animated_drop = new PIXI.extras.AnimatedSprite(frames);
        animated_drop.x = getRandomArbitrary(0,3400);
        animated_drop.y = getRandomArbitrary(400,850);
        animated_drop.width /= 2.5
        animated_drop.height /= 2.5
        animated_drop.alpha = getRandomArbitrary(0.03,0.3)
        animated_drop.anchor.set(0.5);
        animated_drop.animationSpeed = getRandomArbitrary(0.1,0.2);
        setInterval(()=>{

            animated_drop.play();

        },getRandomArbitrary(200,1100))
        
        setInterval(()=>{

            animated_drop.gotoAndStop(11);

        },getRandomArbitrary(100,1000))
        rain_noise.volume = 0.05;
        rain_noise.play()

        viewport.addChild(animated_drop)
    }

})

    // return new Promise((resolve,reject)=>{


    //     resolve([PIXI.Texture.fromFrame('images/rat_36.png'),PIXI.Texture.fromFrame('images/rat_37.png')])

    // })



// // LAYERS plugin is here: https://github.com/pixijs/pixi-display/tree/layers
// // LIGHTS plugin is here: https://github.com/pixijs/pixi-lights/tree/v4.x
// import * from "animals/rat"

// console.log(rat)

// const sessionData = {}
 
// let online = false;

// const player_server = {}
// player_server.name = "ewan"
// player_server.location = {
//     x: 10,
//     y: 0
// }

// //do all the user shit offline

// const socket = io.connect();

// socket.on("thing", res => console.log(res))

// socket.on("container_contents", items => {
    
//     console.log(items)

//     items.contents[0].img.height = items.contents[0].img.height *2
//     items.contents[0].img.width = items.contents[0].img.height*2 

//     $("#slot_1").attr("src",items.contents[0].img);
//     $("#slot_2").attr("src",items.contents[1].img);

//     console.log(items)

// })

// var defaultIcon = "url('images/bunny.png'),auto";
// // var hoverIcon   = "url('images/chest_full.png'),auto";

// //put on be
// let segments = [

//     // Border
//     {a:{x:0,y:0}, b:{x:4000,y:0}},
//     {a:{x:4000,y:0}, b:{x:4000,y:4000}},
//     {a:{x:4000,y:4000}, b:{x:0,y:4000}},
//     {a:{x:0,y:4000}, b:{x:0,y:0}},

//     // // Polygon #1
//     // {a:{x:100,y:150}, b:{x:100,y:100}},
//     // {a:{x:100,y:100}, b:{x:200,y:100}},
//     // {a:{x:200,y:150}, b:{x:100,y:150}},
//     // {a:{x:200,y:150}, b:{x:200,y:100}},

//     // sofa line
//     // {a:{x:60,y:255}, b:{x:90,y:460}},

//     // Polygon #3
//     // {a:{x:555,y:1296}, b:{x:1315,y:1296}},
//     // {a:{x:1315,y:1296}, b:{x:1315,y:1356}},
//     // {a:{x:1315,y:1356}, b:{x:590,y:1356}},
//     // {a:{x:320,y:360}, b:{x:320,y:300}},

//     // // Polygon #4
//     // {a:{x:450,y:190}, b:{x:560,y:170}},
//     // {a:{x:560,y:170}, b:{x:540,y:270}},
//     // {a:{x:540,y:270}, b:{x:430,y:290}},
//     // {a:{x:430,y:290}, b:{x:450,y:190}},


// ];


// // socket.on("get_level_data", data => {
    
//     b = new Bump(PIXI);

//     PIXI.loader
//         .add('box_full','images/chest_full.png')
//         .add('box_empty','images/chest_empty.png')
//         .add('dirty_matress','images/dirty_matress.png')
//         .add('dirty_matress_NORM','images/dirty_matress_NORM.png')
//         .add('player','images/bunny.png')
//         .add('floor_NORM','images/flat_floor_low_NORM.jpg')
//         .add('floor','images/flat_floor_low.jpg')
//         .add('black_wall','images/black_wall.png')
//         .add('workbench','images/workbench.png')
//         .add('workbench_NORM','images/workbench_NORM.png')
//         .add('binder','images/binder.png')
//         // .add('plane','images/plane.json')
//         .add('images/rat_01.png')
//         .add('images/rat_02.png')
//         .add('images/rat_03.png')
//         .add('images/rat_04.png')
//         .add('images/rat_05.png')
//         .add('images/rat_06.png')
//         .add('images/rat_07.png')
//         .add('images/rat_08.png')
//         .add('images/rat_09.png')
//         .add('images/rat_10.png')
//         .add('images/rat_11.png')
//         .add('images/rat_12.png')
//         .add('images/rat_13.png')
//         .add('images/rat_14.png')
//         .add('images/rat_15.png')
//         .add('images/rat_16.png')
//         .add('images/rat_17.png')
//         .add('images/rat_18.png')    
//         .add('images/rat_19.png')
//         .add('images/rat_20.png')
//         .add('images/rat_21.png')
//         .add('images/rat_22.png')
//         .add('images/rat_23.png')
//         .add('images/rat_24.png')
//         .add('images/rat_25.png')
//         .add('images/rat_26.png')
//         .add('images/rat_27.png')
//         .add('images/rat_28.png')
//         .add('images/rat_29.png')
//         .add('images/rat_30.png')
//         .add('images/rat_31.png')
//         .add('images/rat_32.png')
//         .add('images/rat_33.png')
//         .add('images/rat_34.png')
//         .add('images/rat_35.png')
//         .add('images/rat_36.png')
//         .add('images/rat_37.png')
//         .add('images/rat_38.png')
//         .add('images/rat_39.png')
//         .add('images/rat_40.png')
//         .add('images/rat_41.png')
//         .add('images/rat_42.png')
//         .add('images/rat_43.png')
//         .add('images/rat_44.png')
//         .add('images/rat_45.png')
//         .add('images/rat_46.png')
//         .add('images/rat_47.png')
//         .on("progress", loader=>console.log("progress: " + loader.progress + "%"))
//         .load(onAssetsLoaded);

// // })

// // Find intersection of RAY & SEGMENT
// function getIntersection(ray,segment){

//     // RAY in parametric: Point + Direction*T1
//     var r_px = ray.a.x;
//     var r_py = ray.a.y;
//     var r_dx = ray.b.x-ray.a.x;
//     var r_dy = ray.b.y-ray.a.y;

//     // SEGMENT in parametric: Point + Direction*T2
//     var s_px = segment.a.x;
//     var s_py = segment.a.y;
//     var s_dx = segment.b.x-segment.a.x;
//     var s_dy = segment.b.y-segment.a.y;

//     // Are they parallel? If so, no intersect
//     var r_mag = Math.sqrt(r_dx*r_dx+r_dy*r_dy);
//     var s_mag = Math.sqrt(s_dx*s_dx+s_dy*s_dy);
//     if(r_dx/r_mag==s_dx/s_mag && r_dy/r_mag==s_dy/s_mag){ // Directions are the same.
//         return null;
//     }

//     var T2 = (r_dx*(s_py-r_py) + r_dy*(r_px-s_px))/(s_dx*r_dy - s_dy*r_dx);
//     var T1 = (s_px+s_dx*T2-r_px)/r_dx;

//     // Must be within parametic whatevers for RAY/SEGMENT
//     if(T1<0) return null;
//     if(T2<0 || T2>1) return null;

//     // Return the POINT OF INTERSECTION
//     return {
//         x: r_px+r_dx*T1,
//         y: r_py+r_dy*T1,
//         param: T1
//     };

// }

// // const PIXI = require('pixi.js')

// //width , height
// const app = new PIXI.Application({ 
//     width: 2000,         // default: 800
//     height: 1000,        // default: 600
//     antialias: false,    // default: false
// });

// var viewport = new PIXI.extras.Viewport({
//     screenWidth: window.innerWidth,
//     screenHeight: window.innerHeight,
//     worldWidth: 2000,
//     worldHeight: 1000
// });



// app.renderer.plugins.interaction.cursorStyles.default = defaultIcon;


// // app.renderer.autoResize = true;
// // app.renderer.backgroundColor = 0x061639;
// document.body.appendChild(app.view);

// app.stage.addChild(viewport);

// // activate plugins
// viewport
//     .drag()
//     .decelerate();

// // add a red box
// // var sprite = viewport.addChild(new PIXI.Sprite(PIXI.Texture.WHITE));
// // sprite.tint = 0xff0000;
// // sprite.width = sprite.height = 100
// // sprite.position.set(100, 100);
// //put in drgging ad shit 
// // const   stage           = app.stage = viewport,
// const   stage           = app.stage = new PIXI.display.Stage(),
//         light           = new PIXI.lights.DirectionalLight(0xffffff,20,viewport),
//         personal_light  = new PIXI.lights.PointLight(0xffffff, 6),
//         lamp_shade      = new PIXI.lights.PointLight(0xffffff, 20);
        
// stage.addChild(viewport)
// stage.addChild(new PIXI.display.Layer(PIXI.lights.diffuseGroup));
// stage.addChild(new PIXI.display.Layer(PIXI.lights.normalGroup));
// stage.addChild(new PIXI.display.Layer(PIXI.lights.lightGroup));

// // const bunnyTexture = PIXI.Texture.fromImage("https://vignette.wikia.nocookie.net/vsbattles/images/3/34/Tiger-jumping-transparent-png-image.png/revision/latest?cb=20161021003138");
// // new PIXI.Sprite(bunnyTexture);

// const Mouse = {};

// function createPair(diffuseTex, normalTex, alpha) {
    
//     const container = new PIXI.Container();
//     const diffuseSprite = new PIXI.Sprite(diffuseTex);
//     const normalSprite = new PIXI.Sprite(normalTex);
//     normalSprite.alpha = alpha
//     diffuseSprite.parentGroup = PIXI.lights.diffuseGroup;
//     normalSprite.parentGroup = PIXI.lights.normalGroup;
//     container.addChild(diffuseSprite);
//     container.addChild(normalSprite);
//     // container.addChild(personal_light);
//     return container;
// }


// const addToSegments = item => {

//     segments.push(
//         {a:{x:item.x,y:item.y+item.height},             b:{x:item.x,y:item.y}},
//         {a:{x:item.x,y:item.y},                         b:{x:item.x+item.width,y:item.y}},
//         {a:{x:item.x+item.width,y:item.y+item.height},  b:{x:item.x,y:item.y+item.height}},
//         {a:{x:item.x+item.width,y:item.y+item.height},  b:{x:item.x+item.width,y:item.y}},
//     )

// }
// //misty
// function onAssetsLoaded(loader, res) {
  
//     let     player      = createPair(res.player.texture,res.player.texture)
//     let     bunny      = createPair(res.player.texture,res.player.texture)
//     const   box_full   = createPair(res.box_full.texture,res.binder.texture)
//     const   floor      = createPair(res.floor.texture, res.floor_NORM.texture,1)
//     const   dirty_matress = createPair(res.dirty_matress.texture, res.dirty_matress_NORM.texture,1)
//     const   workbench   = createPair(res.workbench.texture, res.workbench_NORM.texture, 1)
//     const   box_empty   = res.box_empty.texture

//     player.position.set(1000,1000)

//     // socket.emit("get_player_data", ()=>{
//     //     console.log('sent')
//     // })



//     const   bedroom_top_left = createPair(res.black_wall.texture,res.black_wall.texture,1);
//     bedroom_top_left.position.set(0,637)
//     bedroom_top_left.height +=27
//     // addToSegments(bedroom_top_left)

//     const   bedroom_top_right = createPair(res.black_wall.texture,res.black_wall.texture,1);
//     bedroom_top_right.position.set(1150,637)
//     bedroom_top_right.height +=27
//     bedroom_top_right.width +=600
//     // addToSegments(bedroom_top_right)


//     const   middle_wall = createPair(res.black_wall.texture,res.black_wall.texture,1);
//     middle_wall.position.set(1815,700)
//     middle_wall.height =2100
//     middle_wall.width =85
//     // addToSegments(middle_wall)

//     const   left_wall = createPair(res.black_wall.texture,res.black_wall.texture,1);
//     left_wall.position.set(0,700)
//     left_wall.height =2100
//     left_wall.width =70
//     // addToSegments(left_wall)


//     const   bathroom_top_left = createPair(res.black_wall.texture,res.black_wall.texture,1);
//     bathroom_top_left.position.set(500,1915)
//     bathroom_top_left.width = 800
//     bathroom_top_left.height = 90
//     // addToSegments(bathroom_top_left)


//     const   bathroom_top_right = createPair(res.black_wall.texture,res.black_wall.texture,1);
//     bathroom_top_right.position.set(1470,1915)
//     bathroom_top_right.height = 90
//     bathroom_top_right.width = 350
//     // addToSegments(bathroom_top_right)



//     // // create an array of textures from an image path
//     // var frames = [];

//     // for (var i = 0; i < 30; i++) {
//     //     var val = i < 10 ? '0' + i : i;

//     //     // magically works since the spritesheet was loaded with the pixi loader
//     //     frames.push(PIXI.Texture.fromFrame('rollSequence00' + val + '.png'));
//     // }

//     // console.log(frames)

//     // create an array of textures from an image path
//     var ratFrames = [];

//     for (var i = 1; i < 20; i++) {
//         // magically works since the spritesheet was loaded with the pixi loader
//         var val = i < 10 ? '0' + i : i;
//         ratFrames.push(PIXI.Texture.fromFrame('images/rat_' + val + '.png'));
//     }

//     for (var i = 20; i > 0; i--) {
//         // magically works since the spritesheet was loaded with the pixi loader
//         var val = i < 10 ? '0' + i : i;
//         ratFrames.push(PIXI.Texture.fromFrame('images/rat_' + val + '.png'));
//     }

//     var ratFrameLooking = [PIXI.Texture.fromFrame('images/rat_36.png'),PIXI.Texture.fromFrame('images/rat_37.png')]



//     // console.log(ratFrames)


//     // var anim = new PIXI.extras.AnimatedSprite(frames);
//     var anim2 = new PIXI.extras.AnimatedSprite(ratFrames);
//     var rat_looking = new PIXI.extras.AnimatedSprite(ratFrameLooking);

//     // anim.x = app.screen.width / 2;
//     // anim.y = app.screen.height / 2;
//     // anim.anchor.set(0.5);
//     // anim.animationSpeed = 0.5;
//     // anim.play();

//     anim2.x = 900;
//     anim2.y = 1000;
//     anim2.rotation = 3.1
//     anim2.anchor.set(0.5);
//     anim2.animationSpeed = 0.5;
//     anim2.play();

//     rat_looking.rotation = 2.1
//     rat_looking.anchor.set(0.5);
//     rat_looking.animationSpeed = 0.1;
    
//     // rat_looking.play();

//     floor.interactive = true;
//     floor.on('mousemove',  event=> {

//         // personal_light.rotation = 200
//         Mouse.x = event.data.global.x
//         Mouse.y = event.data.global.y
//         personal_light.position.x = event.data.global.x +100
//         personal_light.position.y = event.data.global.y +100
        
//     });
//     dirty_matress.rotation = -0.9
//     dirty_matress.position.set(1170,1150)
    
//     dirty_matress.interactive = true
//     dirty_matress.buttonMode = true;
//     dirty_matress.on('pointerdown', function () {
        
//         console.log('bed clicked')

//         socket.emit("player_sleep", 8)

//     });

//     workbench.interactive = true;
//     workbench.buttonMode = true;
//     workbench.width = workbench.width/2
//     workbench.height = workbench.height/2
//     workbench.position.set(600,700)
//     workbench.on('pointerdown', function () {
        
//         console.log('workbench clicked')

//     });

//     // addToSegments(workbench)

//     box_full.position.set(250,800)
//     box_full.height = box_full.height*2
//     box_full.width = box_full.width*2 
//     box_full.interactive = true
//     box_full.buttonMode = true;
//     box_full.id = 35
//     box_full.on('pointerdown', function () {
        
//         console.log('box clicked')
//         socket.emit("get_container_contents", this.id)

//         this.children[0].texture = PIXI.utils.TextureCache["box_empty"];
//         $(".lootMenu").show()

//     }); 

//     // addToSegments(box_full)


//     // const pointer = new PIXI.Graphics();
//     // pointer.beginFill(0xFFFF0B, 5);
//     // pointer.drawCircle(0, 0,2);
    
//     personal_light.position.set(100,1200);
//     personal_light.lightHeight = 0.5

//     lamp_shade.position.set(1100,1400);
//     lamp_shade.lightHeight = 1

//     light.lightHeight = 0.1

//     // personal_light.rotation = 200;
//     // stage.addChild(new PIXI.lights.AmbientLight(0xFFFF0B, 10));


//     const raycast = new PIXI.Graphics();
//     // raycast.lineStyle(2, 0xffd900, 1);
//     // // Get all unique points
//     // const points = (segments=>{
//     //     const a = [];
//     //     segments.forEach(seg=>a.push(seg.a,seg.b));
//     //     return a;
//     // })(segments);
    
//     // const uniquePoints = (points=>{
//     //     const set = {};
//     //     return points.filter(p=>{
//     //         const key = p.x+","+p.y;
//     //         if(key in set){
//     //             return false;
//     //         }else{
//     //             set[key]=true;
//     //             return true;
//     //         }
//     //     });
//     // })(points);

//     app.ticker.add(delta => {

//         PIXI.tweenManager.update();
//         // anim2.rotation -= 0.01;
//         // anim2.position.y += 4
//         // $(".fps").html("FPS: "+(app.ticker.FPS).toFixed(1));
//         // raycast.clear()
//         // raycast.lineStyle(2, 0xffd900, 1);
//         // raycast.beginFill(0xfffffff,0.14);
        
//         // const uniqueAngles = [];
//         // for(let j=0;j<uniquePoints.length;j++){
//         //     const uniquePoint = uniquePoints[j];
//         //     const angle = Math.atan2(uniquePoint.y-player.y,uniquePoint.x-player.x);
//         //     uniquePoint.angle = angle;
//         //     uniqueAngles.push(angle-0.00001,angle-0.00001,angle+0.00001);
//         // }
//         // let intersects = [];
//         // for(let k=0;k<uniqueAngles.length;k++){
//         //     const angle = uniqueAngles[k];
//         //     const dx = Math.cos(angle);
//         //     const dy = Math.sin(angle);
//         //     const ray = {
//         //         a:{x:player.x,y:player.y},
//         //         b:{x:player.x+dx,y:player.y+dy}
//         //     };
//         //     let closestIntersect = null;
//         //     for(let i=0;i<segments.length;i++){
//         //         var intersect = getIntersection(ray,segments[i]);
//         //         if(!intersect) continue;
//         //         if(!closestIntersect || intersect.param<closestIntersect.param){
//         //             closestIntersect=intersect;
//         //         }
//         //     }
//         //     if(!closestIntersect) continue;
//         //     closestIntersect.angle = angle;
//         //     intersects.push(closestIntersect);
//         // }
//         // intersects = intersects.sort((a,b)=>a.angle-b.angle);
//         // raycast.moveTo(intersects[0].x,intersects[0].y);
//         // raycast.lineStyle(1, 0xffd900, 1);
//         // for (let i = 1; i < intersects.length; i++) {
//         //     raycast.lineTo(intersects[i].x,intersects[i].y);
//         // }
//     });
//     // second is up and down
//     // const pathway = new PIXI.Graphics();
//     // pathway.lineStyle(1, 0xffd900, 1)
//     // .moveTo(700,730)
//     // .lineTo(120,750)
//     // .lineTo(100,1230)
//     // .endFill()

//     // console.log(pathway)

//     bunny.position.set(900,900)

//     //Create a custom path
//     var path = new PIXI.tween.TweenPath()
//     .moveTo(700, 730)
//     .lineTo(120, 750)
//     // .lineTo(100, 1230)
//     // console.log(path.getPointAt(2))
//     var path2 = new PIXI.tween.TweenPath()
//     .moveTo(120,750)
//     .lineTo(100, 1230)

//     var path3 = new PIXI.tween.TweenPath()
//     .moveTo(120,750)
//     .lineTo(120, 751)
//     // path.closed = true;
//     // path.bezierCurveTo(700, 100, 700, 400, 100, 100);
    
    
//     //Display the path
//     var gPath = new PIXI.Graphics();
//     gPath.lineStyle(1, 0xffffff, 1);
//     gPath.drawPath(path);
//     viewport.addChild(gPath)
//     var gPath2 = new PIXI.Graphics();
//     gPath2.lineStyle(1, 0xffffff, 1);
//     gPath2.drawPath(path2);
//     viewport.addChild(gPath2);
    
//     //Tween animation
//     var tween = PIXI.tweenManager.createTween(anim2);
//     tween.path = path;
//     tween.target.anchor.x = 0.5
//     tween.target.anchor.y = 0.5
//     tween.target.rotation = -2
//     tween.time = 3000;
//     tween.easing = PIXI.tween.Easing.inOutQuad();
//     tween.on("end", function() {
//         console.log("ended")
//         rat_looking.play()
//         anim2.alpha = 0;
//         // tween.visable = false
//         // rat_looking.visable = true;
//         // setTimeout(()=>{

//         //     tween.chain(tween2)

//         // },2000)
//     })
    
//     var rat_pause = PIXI.tweenManager.createTween(rat_looking);
//     rat_pause.path = path3;
//     rat_pause.time = 1000
//     rat_pause.easing = PIXI.tween.Easing.inOutQuad();

//     rat_pause.on("end", function(){
//         console.log("END")        
//         // PIXI.tweenManager.removeTween(rat_pause)
//         // rat_pause.clear()
//         rat_looking.destroy()
//         anim2.alpha = 1;
//         tween2.target.rotation = -3.2
//         // rat_pause.expire = true;
//     })

//     var tween2 = PIXI.tweenManager.createTween(anim2);
//     tween2.path = path2;
//     tween2.time = 3000;

//     tween2.easing = PIXI.tween.Easing.inQuad();

//     //tween.pathReverse  =true;
//     // tween.loop = true;
//     tween.start()
//     .chain(rat_pause)
//     .chain(tween2)

//     console.log(tween)
//     // tween.on("stop",()=>{
//     //     console.log("hi")
//     // })

//     // setTimeout(()=>{
//     //     tween.stop()
//     // },3000)
//     // setTimeout(()=>{
//     //     tween.start()
//     // },4000)
    

//     // const moveSprintTo = (sprite,x,y) => {

//     //     if(sprite.position.x === x){
//     //         console.log('stop here')
        
//     //     } else {
//     //         sprite.position.x++
//     //     }

//     //     if(sprite.position.y === y){
//     //         console.log('stop here')
        
//     //     } else {
//     //         sprite.position.y++
//     //     }

//     // }

//     const collisionItems = new PIXI.Container();
//     collisionItems.addChild(box_full,workbench,bedroom_top_left,bedroom_top_right,middle_wall,left_wall,bathroom_top_left,bathroom_top_right,anim2,rat_looking);
//     viewport.addChild(floor,bunny,light,raycast,personal_light,lamp_shade,dirty_matress,collisionItems,player)

//     document.addEventListener("keydown", e=> {

//         b.hit(player,collisionItems.children,true)    

//         personal_light.position.x = player.x
//         personal_light.position.y = player.y

//         const keymap = {
//             "w": "up",
//             "a": "left",
//             "s": "down",
//             "d": "right",
//             "ArrowUp": "up",
//             "ArrowLeft": "left",
//             "ArrowDown": "down",
//             "ArrowRight": "right"
//         };

//         let key = keymap[e.key]

//         // console.log(player.position)

//         player_server.location.x = player.x
//         player_server.location.y = player.y

//         if(e.key === "/"){
//             console.log('yoyoyoyo')
//             socket.emit("set_player_data",player_server)
//         }

//         if(key === "up"){
//             player.y -= 15; 
//             viewport.y = viewport.y - (viewport.y + player.y -400)
            

//         }

//         if(key === "down"){

//             player.y += 15; 
//             viewport.y = viewport.y - (viewport.y + player.y - 400)

//         }

//         if(key === "left"){

//             player.x -= 15; 
//             viewport.x = viewport.x - (viewport.x + player.x-800)

//         }

//         if(key === "right"){
                
//             player.x += 15; 
//             viewport.x = viewport.x - (viewport.x + player.x-800)

//         }
//         console.log('here?')
//         // socket.emit("set_player_data",player_server)
        
//     });

//     $(".sleep_hours_submit").click(()=>{
      
//         console.log("hi")

//         const input = $(".sleep_hours")[0].value

//         console.log(input)

//         socket.emit("player_sleep",input)

//     })

// }

// socket.on("player_data", res => {

//     console.log(res)
//     console.log("HIHIHI")

// })



// /*



//     // Get all unique points
//     const points = (segments=>{
//         const a = [];
//         segments.forEach(seg=>a.push(seg.a,seg.b));
//         return a;
//     })(segments);
    
//     const uniquePoints = (points=>{
//         const set = {};
//         return points.filter(p=>{
//             const key = p.x+","+p.y;
//             if(key in set){
//                 return false;
//             }else{
//                 set[key]=true;
//                 return true;
//             }
//         });
//     })(points);

//     app.ticker.add(delta => {
//         $(".fps").html("FPS: "+(app.ticker.FPS).toFixed(1));
//         raycast.clear()
//         raycast.beginFill(0xfffffff,0.04);
//         raycast.lineStyle(2, 0xffd900, 1);
//         const uniqueAngles = [];
//         for(let j=0;j<uniquePoints.length;j++){
//             const uniquePoint = uniquePoints[j];
//             const angle = Math.atan2(uniquePoint.y-bunny.y,uniquePoint.x-bunny.x);
//             uniquePoint.angle = angle;
//             uniqueAngles.push(angle-0.00001,angle-0.00001,angle+0.00001);
//         }
//         let intersects = [];
//         for(let k=0;k<uniqueAngles.length;k++){
//             const angle = uniqueAngles[k];
//             const dx = Math.cos(angle);
//             const dy = Math.sin(angle);
//             const ray = {
//                 a:{x:bunny.x,y:bunny.y},
//                 b:{x:bunny.x+dx,y:bunny.y+dy}
//             };
//             let closestIntersect = null;
//             for(let i=0;i<segments.length;i++){
//                 var intersect = getIntersection(ray,segments[i]);
//                 if(!intersect) continue;
//                 if(!closestIntersect || intersect.param<closestIntersect.param){
//                     closestIntersect=intersect;
//                 }
//             }
//             if(!closestIntersect) continue;
//             closestIntersect.angle = angle;
//             intersects.push(closestIntersect);
//         }
//         intersects = intersects.sort((a,b)=>a.angle-b.angle);
//         raycast.moveTo(intersects[0].x,intersects[0].y);
//         raycast.lineStyle(0, 0xffd900, 0.5);
//         for (let i = 1; i < intersects.length; i++) {
//             raycast.lineTo(intersects[i].x,intersects[i].y);
//         }
//     });



// */


