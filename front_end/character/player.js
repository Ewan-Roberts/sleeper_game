const PIXI              = require('pixi.js');
const sprite_helper     = require('../utils/sprite_helper.js');
const bow_helper        = require('../weapons/bow.js');
const document_helper   = require('../utils/mouse.js');
const ticker            = require('../engine/ticker');
const viewport          = require('../engine/viewport.js');

const get_mouse_position = (event, viewport) => ({
  x: event.data.global.x - viewport.screenWidth / 2,
  y: event.data.global.y - viewport.screenHeight / 2,
})

const get_mouse_position_from_player = (event, sprite, viewport) => {
  const mouse_position = get_mouse_position(event, viewport);

  mouse_position.x += sprite.x
  mouse_position.y += sprite.y;

  return mouse_position;
}

function get_intersection(ray, segment){
  // RAY in parametric: Point + Delta*T1
  const r_px = ray.a.x;
  const r_py = ray.a.y;
  const r_dx = ray.b.x-ray.a.x;
  const r_dy = ray.b.y-ray.a.y;

  // SEGMENT in parametric: Point + Delta*T2
  const s_px = segment.a.x;
  const s_py = segment.a.y;
  const s_dx = segment.b.x-segment.a.x;
  const s_dy = segment.b.y-segment.a.y;

  // Are they parallel? If so, no intersect
  const r_mag = Math.sqrt(r_dx*r_dx+r_dy*r_dy);
  const s_mag = Math.sqrt(s_dx*s_dx+s_dy*s_dy);
  if(r_dx/r_mag==s_dx/s_mag && r_dy/r_mag==s_dy/s_mag){
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
    param: T1
  };
}

class Player {
  constructor() {
    this.animations = {
      bow: {
        idle:   this.create_bow_idle_frames(),
        walk:   this.create_bow_walk_frames(),
        ready:  this.create_bow_ready_frames(),
      },
    };

    this.sprite = new PIXI.extras.AnimatedSprite(this.animations.bow.idle);
    this.sprite.anchor.set(0.5);
    this.sprite.width /= 2;
    this.sprite.height /= 2;
    this.sprite.animationSpeed = 0.4;
    this.sprite.play();
    this.sprite.zIndex = -1;
    this.sprite.name = 'player';
    
    this.weapon = 'bow';
    this.power = 1000;
    this.allow_shoot = true;
    this.movement_speed = 15;

    viewport.addChild(this.sprite);
  }

  follow_player() {
    viewport.follow(this.sprite);
  }

  create_light() {
    const light = PIXI.Sprite.fromFrame('light_gradient');
    
    light.name  = 'light';
    light.anchor.set(0.5);
    light.width   = 2000;
    light.height  = 2000;
    light.alpha   = 0.1;

    this.sprite.addChild(light);
  }

  add_raycasting(level_segments) {
    const raycast = new PIXI.Graphics();
    const points = [];
    level_segments.forEach(seg => points.push(seg.a,seg.b));

    if(!global.is_development) {
      const light = this.sprite.getChildByName('light');
      light.mask = raycast
    }
    
    ticker.add(() => {
      const unique_angles = [];
      let intersects = [];
      
      raycast.clear()
      raycast.beginFill(0xfffffff, 0.05);
  
      points.forEach(elem => {
        const angle = Math.atan2(elem.y - this.sprite.y, elem.x - this.sprite.x);
        elem.angle = angle;
        unique_angles.push(angle - 0.00001, angle + 0.00001);
      })
  
      for(let k=0; k < unique_angles.length; k++){
        const angle = unique_angles[k];
        const dx = Math.cos(angle);
        const dy = Math.sin(angle);
        const ray = {
          a: {x: this.sprite.x,       y: this.sprite.y},
          b: {x: this.sprite.x + dx,  y: this.sprite.y + dy}
        };
  
        let closest_intersect = null;
        for(let i=0; i < level_segments.length; i++){
          const intersect = get_intersection(ray, level_segments[i]);
          if(!intersect) continue;
          if(!closest_intersect || intersect.param<closest_intersect.param){
            closest_intersect = intersect;
          }
        }
        if(!closest_intersect) continue;
  
        closest_intersect.angle = angle;
        intersects.push(closest_intersect);
      }

      intersects = intersects.sort((a,b) => a.angle - b.angle);
      raycast.moveTo(intersects[0].x, intersects[0].y).lineStyle(0.5, 0xffd900, 5);

      for (let i = 0; i < intersects.length; i++) {
        raycast.lineTo(intersects[i].x, intersects[i].y); 
      }
    });

    viewport.addChild(raycast)
  }

  create_bow_idle_frames() {
    const bow_frames = [];
    for (let i = 0; i <= 21; i += 1) {
      let name = `survivor-bow-idle-0${i}`;

      if (i >= 10) {
        name = `survivor-bow-idle-${i}`;
      }
      bow_frames.push(PIXI.Texture.fromFrame(name));
    }
    return bow_frames;
  }

  create_bow_ready_frames() {
    const ready_frames = [];
    for (let i = 0; i <= 38; i += 1) {
      let name = `survivor-bow-pull-0${i}`;
  
      if (i >= 10) {
        name = `survivor-bow-pull-${i}`;
      }
  
      ready_frames.push(PIXI.Texture.fromFrame(name));
    }
    return ready_frames;
  }

  create_bow_walk_frames() {
    const walk_frames = [];
    for (let i = 0; i <= 20; i += 1) {
      let name = `survivor-walk_bow_0${i}`;
  
      if (i >= 10) {
        name = `survivor-walk_bow_${i}`;
      }
      walk_frames.push(PIXI.Texture.fromFrame(name));
    }
    return walk_frames;
  }

  set_position(x,y) {
    this.sprite.position.set(x, y);
  }

  add_aiming_line() {
    this.aiming_line = new PIXI.Graphics();
    this.aiming_line.name = 'aiming_line';
    
    viewport.addChild(this.aiming_line)
  }

  add_aiming_cone() {
    this.aiming_cone = PIXI.Sprite.fromFrame('yellow_triangle');
    
    this.aiming_cone.height = 800;
    this.aiming_cone.width = 400;
    this.aiming_cone.anchor.x = 0.5;
    this.aiming_cone.alpha = 0;
    //this.aiming_cone.filters = [new PIXI.filters.BlurFilter()];
    this.aiming_cone.name = 'aiming_cone';
    
    viewport.addChild(this.aiming_cone);
  }

  mouse_move() {
    viewport.on('mousemove', (event) => {
      const mouse_position = get_mouse_position(event,viewport)
      const mouse_position_player = get_mouse_position_from_player(event, this.sprite, viewport)

      this.aiming_cone.position.set(this.sprite.position.x, this.sprite.position.y);
      this.aiming_cone.rotation = sprite_helper.get_angle_from_point_to_point(this.sprite, mouse_position_player) - 1.575
      
      //this.aiming_line.clear();  
      //this.aiming_line.position.set(this.sprite.position.x, this.sprite.position.y);
      //this.aiming_line.lineStyle(3, 0xffffff, 1).moveTo(0, 0).lineTo(mouse_position.x, mouse_position.y);
      
      this.sprite.rotation = sprite_helper.get_angle_from_point_to_point(this.sprite, mouse_position_player);
      
      viewport.addChild(this.aiming_cone, this.aiming_line);
    }); 
  }

  mouse_down() {
    viewport.on('mousedown', (event) => {
      this.aiming_cone.alpha = 0;
      this.aiming_cone.count = 10;
      this.aiming_cone.width = 500;
      this.aiming_cone.height = 300;
      this.power = 900;

      this.sprite.textures = this.animations.bow.ready;
      this.sprite.loop = false;
      /* perfomance!!!
      this.count_down = () => {
         if(this.power < 300) {
          ticker.remove(this)
          return
        }
        if (this.power > 750) {
          this.allow_shoot = false;
        } else {
          this.allow_shoot = true;
        }
        console.log(this.power)
        
        this.aiming_cone.width -= 1.5;
        this.aiming_cone.height += 3;
        this.aiming_cone.alpha += 0.002
        this.aiming_cone.count -= 0.04;
        //this.aiming_cone.filters[0].blur = this.aiming_cone.count;

        if (this.power > 400) {
          this.power -= 10;
        }
      }
      ticker.add(this.count_down);
      */
      if (this.weapon === 'bow') {
        const mouse_position_player = get_mouse_position_from_player(event, this.sprite, viewport)
  
        this.sprite.rotation = sprite_helper.get_angle_from_point_to_point(this.sprite, mouse_position_player);
        this.sprite.gotoAndPlay(0);
      }
    });
  }

  mouse_up() {
    viewport.on('mouseup', (event) => {
      this.moveable = true;
      this.sprite.play();
      this.sprite.textures = this.animations.bow.idle;
      
      ticker.remove(this.count_down);
      this.aiming_cone.alpha = 0;

      if (this.weapon === 'bow' && this.allow_shoot) {
        const mouse_position_player = get_mouse_position_from_player(event, this.sprite, viewport)
  
        bow_helper.arrow_management(this.power, this.sprite, mouse_position_player);
      }
    });
  }

  add_controls() {
    global.document.addEventListener('keydown', (e) => {
      const key = document_helper.getDirection(e.key);
      const collision_objects = viewport.getChildByName('collision_items');
      this.sprite.loop = true;

      if (!this.moveable) return;

      if (key === 'up') {
        for(let i = 0; i < collision_objects.children.length; i++){
          const player_position = this.sprite.getGlobalPosition()

          player_position.y -= this.movement_speed*3;
          if(collision_objects.children[i].containsPoint(player_position)){
            this.sprite.gotoAndStop(1);
            return;
          }      
        }

        this.sprite.y -= this.movement_speed;
        this.sprite.rotation = -2;
      };

      if (key === 'down') {
        for(let i = 0; i < collision_objects.children.length; i++){

          const player_position = this.sprite.getGlobalPosition()
          player_position.y += this.movement_speed*3;
          if(collision_objects.children[i].containsPoint(player_position)){
            this.sprite.gotoAndStop(1)
            return;
          }      
        }

        this.sprite.y += this.movement_speed;
        this.sprite.rotation = 2;
      };

      if (key === 'left') {
        for(let i = 0; i < collision_objects.children.length; i++){

          const player_position = this.sprite.getGlobalPosition()
          player_position.x -= this.movement_speed*3;
          if(collision_objects.children[i].containsPoint(player_position)){
            this.sprite.gotoAndStop(1)
            return;
          }      
        }

        this.sprite.x -= this.movement_speed;
        this.sprite.rotation = -3;
      };

      if (key === 'right') {
        for(let i = 0; i < collision_objects.children.length; i++){

          const player_position = this.sprite.getGlobalPosition()
          player_position.x += this.movement_speed*3;
          if(collision_objects.children[i].containsPoint(player_position)){
            this.sprite.gotoAndStop(1)
            return;
          }      
        }

        this.sprite.x += this.movement_speed;
        this.sprite.rotation = 0;
      };

      if(key === 'right' || key === 'up' || key === 'down' || key === 'left'){
        if(this.sprite.textures !== this.animations.bow.walk) {
          this.sprite.textures = this.animations.bow.walk;
          this.sprite.play();
        };
      }
    });

    global.document.addEventListener('keyup', () => {
      this.sprite.textures = this.animations.bow.idle;

      this.sprite.play();
    });
  };
}

module.exports = {
  Player,
}