const { viewport  } = require('./app');
const { ticker    } = require('./app');
const { renderer  } = require('./app');

const { visuals } = require('./pixi_containers');
const { Container } = require('pixi.js');
const { Graphics  } = require('pixi.js');
const { Sprite    } = require('pixi.js');
const { Texture   } = require('pixi.js');
const { filters   } = require('pixi.js');

// A reverse mask as a blend mode
renderer.state.blendModes[20] = [0, renderer.gl.ONE_MINUS_SRC_ALPHA];
renderer.backgroundColor = 0x000000;

function get_intersection(sprite, segment, angle) {
  // RAY in parametric: Point + Delta*T1
  const r_px = sprite.x;
  const r_py = sprite.y;
  const r_dx = Math.cos(angle);
  const r_dy = Math.sin(angle);

  // SEGMENT in parametric: Point + Delta*T2
  const s_px = segment.a.x;
  const s_py = segment.a.y;
  const s_dx = segment.b.x-segment.a.x;
  const s_dy = segment.b.y-segment.a.y;

  // Are they parallel? If so, no intersect
  const r_mag = Math.sqrt(r_dx*r_dx+r_dy*r_dy);
  const s_mag = Math.sqrt(s_dx*s_dx+s_dy*s_dy);

  if(
    r_dx/r_mag===s_dx/s_mag &&
      r_dy/r_mag===s_dy/s_mag
  ){
    // Unit vectors are the same.
    return null;
  }

  const T2 = (r_dx*(s_py-r_py) + r_dy*(r_px-s_px))/(s_dx*r_dy - s_dy*r_dx);
  const T1 = (s_px+s_dx*T2-r_px)/r_dx;

  // Must be within parametic whatevers for RAY/SEGMENT
  if(T1<0) return null;
  if(T2<0 || T2>1) return null;

  // Return the POINT OF INTERSECTION
  return {
    x: r_px+r_dx*T1,
    y: r_py+r_dy*T1,
    param: T1,
  };

}

function convert_to_rays({
  x,
  y,
  width,
  height,
}) {
  return [
    {a:{x,         y         }, b:{x:x+width, y         }},
    {a:{x:x+width, y         }, b:{x:x+width, y:y-height}},
    {a:{x:x+width, y:y-height}, b:{x,         y:y-height}},
    {a:{x,         y:y-height}, b:{x,         y         }},
  ];
}

function get_intersects(sprite, segments, unique_points) {
  const unique_angles = get_unique_points(sprite, unique_points);

  const intersects = [];
  unique_angles.forEach(angle => {
    let closest_intersect = null;
    segments.forEach(seg => {
      const intersect = get_intersection(sprite, seg, angle);
      if(!intersect) return;
      if(!closest_intersect || intersect.param < closest_intersect.param){
        closest_intersect = intersect;
      }
    });
    if(!closest_intersect) return;
    closest_intersect.angle = angle;
    intersects.push(closest_intersect);
  });

  intersects.sort((a,b) => a.angle - b.angle);
  return intersects;
}

function get_unique_points(sprite, unique_points) {
  const unique_angles = [];
  unique_points.forEach(unique_point => {
    const angle = Math.atan2(
      unique_point.y - sprite.y,
      unique_point.x - sprite.x
    );
    unique_angles.push(angle-0.00001, angle+0.00001);
  });
  return unique_angles;
}


/*
 * creates raycasting light and shadow around it
 * @param  {Sprite}
 * @option {object}
 * @option {object}   option.border - border wih x, y, width, height
 * @option {Sprite[]} option.obstructions - array of sprite that cast shadows
 * @option {number}   option.radius - radius of light
 * @option {boolean}  option.follow - does the light move with the sprite?
 */
class Raycast extends Container {
  constructor(sprite, {
    border,
    obstructions,
    radius = 200,
    follow = true,
  }) {
    super();
    this.raycast = new Graphics();
    this.sprite = sprite;
    this.follow = follow;

    this.segments = [
      ...convert_to_rays(border),
    ];

    obstructions.forEach(sprite =>{
      if(sprite._destroyed) return;
      this.segments.push(...convert_to_rays(sprite));
    });

    this.shadow        = new Sprite(Texture.WHITE);
    this.shadow.tint   = 0x101010;
    this.shadow.width  = border.width;
    this.shadow.height = border.height;
    this.shadow.alpha  = 0.9;
    this.shadow.name   = 'shadow_area';
    this.shadow.position.copy(border);
    this.shadow.anchor.set(0,1);

    this.light = new Graphics()
      .beginFill(0xFFFFFFF)
      .drawCircle(radius, radius, radius)
      .endFill();

    this.light.blendMode = 20;
    this.light.alpha = 0.5;
    this.light.mask = this.raycast;
    this.light.x = sprite.x - this.light.width/2;
    this.light.y = sprite.y - this.light.height/2;

    this.addChild(
      this.shadow,
      this.light,
      this.raycast
    );

    //this.filters = [new filters.BlurFilter(1)];
    this.filters = [new filters.AlphaFilter()];

    visuals.addChild(this);

    this.start();
  }

  contains(sprite) {
    return (
      this.light.containsPoint(sprite) &&
      this.raycast.containsPoint(sprite)
    );
  }

  // TODO
  add_light(sprite, radius = 100) {
    this.newlight = new Graphics()
      .beginFill(0xFFFFFFF)
      .drawCircle(radius, radius, radius)
      .endFill();

    this.newlight.blendMode = 20;
    this.newlight.mask = this.raycast;
    this.newlight.x = sprite.x - this.newlight.width/2;
    this.newlight.y = sprite.y - this.newlight.height/2;

    this.addChild(this.newlight);
  }

  // for testing
  _move_light_with_cursor() {
    viewport.on('mousemove', ({data}) => {
      this.light.x = data.global.x;
      this.light.y = data.global.y;
    });
  }

  set follow(value) {
    this._follow = value;
  }

  start() {
    const unique_points = this.segments.map(({a,b}) => (a,b));

    ticker.add(() => {
      this.raycast.clear();
      this.raycast.beginFill();

      const intersects = get_intersects(this.sprite, this.segments, unique_points);
      this.raycast.moveTo(intersects[0].x,intersects[0].y);

      intersects.forEach(inter => this.raycast.lineTo(inter.x,inter.y));

      if(this._follow) {
        this.light.x = this.sprite.x - this.light.width/2;
        this.light.y = this.sprite.y - this.light.height/2;
      }
    });
  }
}

module.exports = {
  Raycast,
};

