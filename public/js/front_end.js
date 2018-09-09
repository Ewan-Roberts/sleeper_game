
//floor/wall > player > items > lights > core/raycast

// var Intersects = require('yy-intersects');
// var intersects = x.boxBox(x1, y1, w1, h1, x2, y2, w2, h2);
const   PIXI = require('pixi.js'),
        Intersects = require('yy-intersects'),
        tweenManager = require('pixi-tween'),
        $ = require("jquery"),
        rat = require("./animals/rat.js");

var circle = new PIXI.Graphics();
circle.lineStyle(0);
circle.beginFill(0xFFFF0B, 0.5);
circle.drawCircle(90, 90,60);
circle.endFill();
circle.y = 2100
circle.x = 1050

let door = new PIXI.Graphics()
.beginFill(0xFF3300)
.lineStyle(1,0xffd900)
door.drawRect(0, 0, 500, 50);

door.width = 500
door.height = 50

door.x = 1050
door.y = 2100
door.dx = 1
door.dy = 1
door.rotation = 0.25 * Math.PI
door.interactive = true;
// door.hitArea = new PIXI.Rectangle(0, 0, 100, 100);
// door.interactive = true;
// door.requiresUpdate = true
// door.centerX = 1050
// door.centerY = 2050
// door.xAnchorOffset = 200
// door.yAnchorOffset = 200
// door.height *=10

let door_test = new PIXI.Graphics()
.beginFill(0xFF3300)
.lineStyle(1,0xffd900)
.drawRect(0, 0, 300, 50);
door_test.interactive = true;
door_test.pivot.x = 10
door_test.pivot.y = 25
door_test.position.set(1050,2150)  


module.exports.add_Core = () =>{    

    const Mouse = {};
    // socket.on( "get_level_data", data => {

    return new Promise((resolve,reject)=>{
        PIXI.loader
        .add('player','images/bunny.png')
        .add('wall','images/black_wall.png')
        // .on("progress", loader=>console.log("progress: " + loader.progress + "%"))
        .load((loader, res) =>{

            const raycast = new PIXI.Graphics();
            const points = (segments=>{const a = [];segments.forEach(seg=>a.push(seg.a,seg.b));return a;})(segments);
            const uniquePoints = (points=>{const set = {};return points.filter(p=>{const key = p.x+","+p.y;if(key in set){return false;}else{set[key]=true;return true;}});})(points);

            app.ticker.add(delta => {

                PIXI.tweenManager.update();
                // door_test.rotation += 0.01
                $(".fps").html("FPS: "+(app.ticker.FPS).toFixed(1));
                raycast.clear()
                //fill for shadows
                raycast.beginFill(0xfffffff,0.14);
                const uniqueAngles = [];
                let intersects = [];
                for(let j=0;j<uniquePoints.length;j++){const uniquePoint = uniquePoints[j];const angle = Math.atan2(uniquePoint.y-global.Player.sprite.y,uniquePoint.x-global.Player.sprite.x);uniquePoint.angle = angle;uniqueAngles.push(angle-0.00001,angle-0.00001,angle+0.00001);}
                for(let k=0;k<uniqueAngles.length;k++){const angle = uniqueAngles[k];const dx = Math.cos(angle);const dy = Math.sin(angle);const ray = {a:{x:global.Player.sprite.x,y:global.Player.sprite.y},b:{x:global.Player.sprite.x+dx,y:global.Player.sprite.y+dy}};let closestIntersect = null;for(let i=0;i<segments.length;i++){var intersect = getIntersection(ray,segments[i]);if(!intersect) continue;if(!closestIntersect || intersect.param<closestIntersect.param){closestIntersect=intersect;}}if(!closestIntersect) continue;closestIntersect.angle = angle;intersects.push(closestIntersect);}
                intersects = intersects.sort((a,b)=>a.angle-b.angle);
                raycast.moveTo(intersects[0].x,intersects[0].y);
                raycast.lineStyle(1, 0xffd900, 1);
                for (let i = 1; i < intersects.length; i++) raycast.lineTo(intersects[i].x,intersects[i].y);

            });

            // console.log(raycast)
            viewport.addChild(
                
                rat_trigger_pad,
                door_test
            )

            // rain_drop()

        });
            
        resolve()
    })

}

// })



            // $(".sleep_hours_submit").click(()=>{

            //     const input = $(".sleep_hours")[0].value
            //     console.log(input)
            //     socket.emit("player_sleep",input)

            // })


//misty





/*
function getIntersection(ray,segment){

    const r_px = ray.a.x,r_py = ray.a.y,r_dx = ray.b.x-ray.a.x,r_dy = ray.b.y-ray.a.y,s_px = segment.a.x,s_py = segment.a.y,s_dx = segment.b.x-segment.a.x,s_dy = segment.b.y-segment.a.y,r_mag = Math.sqrt(r_dx*r_dx+r_dy*r_dy),s_mag = Math.sqrt(s_dx*s_dx+s_dy*s_dy);
    if(r_dx/r_mag==s_dx/s_mag && r_dy/r_mag==s_dy/s_mag) return null;
    const T2 = (r_dx*(s_py-r_py) + r_dy*(r_px-s_px))/(s_dx*r_dy - s_dy*r_dx),T1 = (s_px+s_dx*T2-r_px)/r_dx;
    if(T1<0 || T2<0 || T2>1) return null;
    return {x: r_px+r_dx*T1,y: r_py+r_dy*T1,param: T1};

}


*/