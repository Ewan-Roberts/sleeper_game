const { viewport  } = require('./app');
const { ticker    } = require('./app');
const { renderer  } = require('./app');

const { Container } = require('pixi.js');
const { Graphics  } = require('pixi.js');
const { Sprite    } = require('pixi.js');
const { Texture   } = require('pixi.js');
const { filters   } = require('pixi.js');

renderer.state.blendModes[20] = [0, renderer.gl.ONE_MINUS_SRC_ALPHA];
renderer.backgroundColor = 0xFFC0CB;

/*
 * creates raycasting light and shadow around it
 * @param  {Sprite}
 * @option {object}
 * @option {object}   option.border - an object wih x, y, width, height
 * @option {Sprite[]} option.obstructions - array of sprite that cast shadows
 * @option {number}   option.radius - radius of light
 * @option {boolean}  option.follow - does the light move with the sprite
 */
class Raycast extends Container {
  constructor(sprite, {
    border,
    obstructions,
    radius = 400,
    follow = false,
  }) {
    super();
    this.raycast = new Graphics();
    this.sprite = sprite;
    this.follow = follow;

    this.segments = [
      ...this.convert_to_rays(border),
    ];

    obstructions.forEach(sprite =>{
      this.segments.push(...this.convert_to_rays(sprite));
    });

    this.shadow        = new Sprite(Texture.fromFrame('black_dot'));
    this.shadow.width  = border.width;
    this.shadow.height = border.height;
    this.shadow.alpha  = 0.7;
    this.shadow.name   = 'shadow_area';
    this.shadow.position.copy(border);
    this.shadow.anchor.set(0,1);

    this.light = new Graphics()
      .beginFill(0xFFFFFFF)
      .drawCircle(radius, radius, radius)
      .endFill();

    this.light.blendMode = 20;
    this.light.mask = this.raycast;

    this.addChild(
      this.shadow,
      this.light
    );

    this.filters = [new filters.BlurFilter(4)];

    viewport.addChild(this);

    this.start();
  }

  // for testing
  _move_light_with_cursor() {
    viewport.on('mousemove', ({data}) => {
      this.light.x = data.global.x;
      this.light.y = data.global.y;
    });
  }

  get_intersection(segment, angle){
    // RAY in parametric: Point + Delta*T1
    const r_px = this.sprite.x;
    const r_py = this.sprite.y;
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

  convert_to_rays({
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

  set follow(value) {
    this._follow = value;
  }

  start() {
    const unique_points = this.segments.map(({a,b}) => (a,b));

    ticker.add(() => {
      this.raycast.clear();
      this.raycast.beginFill();

      const unique_angles = [];
      unique_points.forEach(unique_point => {
        const angle = Math.atan2(
          unique_point.y - this.sprite.y,
          unique_point.x - this.sprite.x
        );
        unique_point.angle = angle;
        unique_angles.push(angle-0.00001,angle-0.00001,angle+0.00001);
      });

      let intersects = [];
      unique_angles.forEach(angle => {
        let closest_intersect = null;
        this.segments.forEach(seg => {
          const intersect = this.get_intersection(seg, angle);
          if(!intersect) return;
          if(!closest_intersect || intersect.param < closest_intersect.param){
            closest_intersect = intersect;
          }
        });
        if(!closest_intersect) return;
        closest_intersect.angle = angle;
        intersects.push(closest_intersect);
      });

      intersects = intersects.sort((a,b) => a.angle - b.angle );
      this.raycast.moveTo(intersects[0].x,intersects[0].y);
      this.raycast.lineStyle();

      intersects.forEach(inter => this.raycast.lineTo(inter.x,inter.y));

      if(this._follow) {
        this.light.x = this.sprite.x - this.light.width/2;
        this.light.y = this.sprite.y - this.light.height/2;
      }
    });

    viewport.addChild(this.raycast);
  }
}

module.exports = {
  Raycast,
};


