
const PIXI = require('pixi.js');
const $ = require('jQuery.js');

function getIntersection(a,b){
  
  const c=a.a.x,d=a.a.y,e=a.b.x-a.a.x,f=a.b.y-a.a.y,g=b.a.x,h=b.a.y,i=b.b.x-b.a.x,j=b.b.y-b.a.y,k=Math.sqrt(e*e+f*f),l=Math.sqrt(i*i+j*j);if(e/k==i/l&&f/k==j/l)return null;const m=(e*(h-d)+f*(c-g))/(i*f-j*e),n=(g+i*m-c)/e;return 0>n||0>m||1<m?null:{x:c+e*n,y:d+f*n,param:n}

}

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