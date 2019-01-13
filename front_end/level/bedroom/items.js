
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
    const points = (bedroom_segments=>{
        const a = [];
        global.bedroom_segments.forEach(seg=>a.push(seg.a,seg.b));
        return a;
    })(bedroom_segments);
    const uniquePoints = (points=>{
        const set = {};
        return points.filter(p=>{
            const key = p.x+","+p.y;
            if(key in set){
                return false;
            }
            else{
                set[key]=true;
                return true;
            }
        });
    })(points);

    global.app.ticker.add(delta => {

        const uniqueAngles = [];
        let intersects = [];
        PIXI.tweenManager.update();
