const PIXI = require('pixi.js');
const sprite_helper = require('../utils/sprite_helper.js');
const bow_helper = require('../weapons/bow/bow_helper.js');
const document_helper = require('../utils/document_helper.js');
const ticker = require('../engine/ticker');
const viewport = require('../engine/viewport.js');


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

class Player {
  constructor() {
    const idle_frames = this.create_idle_frames()
    const walking_frames = this.create_walk_frames()
    //pull back
    const ready_frames = this.create_ready_frames()

    this.sprite = new PIXI.extras.AnimatedSprite(idle_frames);
    
    console.log(this.sprite);

    this.sprite.anchor.set(0.5);
    this.sprite.width /= 2;
    this.sprite.height /= 2;
    this.sprite.animationSpeed = 0.4;
    this.sprite.play();
    this.sprite.zIndex = -1;
    this.sprite.tag = 'player';
    this.sprite.name = 'player';
    this.texture_holder = {}

    this.weapon = 'bow';
    this.ammo = 4;
    this.power = 1000;
    this.allow_shoot = true;
    this.movement_speed = 15;

    viewport.addChild(this.sprite);
  }

  follow_player() {
    viewport.follow(this.sprite);
  }

  get_position() {
    return this.sprite.getGlobalPosition()
  }

  switch_walk_bow_frames() {
    // case for switching between frames
  }

  create_idle_frames() {
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

  create_ready_frames() {
    const ready_frames = [];
  
    for (let i = 0; i <= 38; i += 1) {
      let name = `survivor-bow-pull-0${i}`;
  
      if (i >= 10) name = `survivor-bow-pull-${i}`;
  
      ready_frames.push(PIXI.Texture.fromFrame(name));
    }

    return ready_frames;
  }

  create_walk_frames() {
    const walk_frames = [];

    for (let i = 0; i <= 20; i += 1) {
      let name = `survivor-walk_bow_0${i}`;
  
      if (i >= 10) name = `survivor-walk_bow_${i}`;
      
      walk_frames.push(PIXI.Texture.fromFrame(name));
    }

    return walk_frames;
  }

  set_position(x,y) {
    this.sprite.position.set(x, y);
  }

  mouse_move() {
    const aimingLine = new PIXI.Graphics();

    viewport.on('mousemove', (event) => {
      if (this.weapon === 'bow' && this.ammo > 0) {

        const mouse_position = get_mouse_position(event,viewport)

        const mouse_position_player = get_mouse_position_from_player(event, this.sprite, viewport)

        aimingLine.clear();
        aimingLine.position.set(this.sprite.position.x, this.sprite.position.y);
        aimingLine.lineStyle(3, 0xffffff, 1).moveTo(0, 0).lineTo(mouse_position.x, mouse_position.y);
        viewport.addChild(aimingLine);
        this.sprite.rotation = sprite_helper.get_angle_from_point_to_point(this.sprite, mouse_position_player);
      }
    }); 
  }

  count_down() {

    // this.sprite._textures = this.sprite.ready._textures;

    if (this.power > 750) {
      this.allow_shoot = false;
    }
    
    else {
      this.allow_shoot = true;
    }
  
    if (this.power > 400) {
      this.power -= 10;
    }
  
    if (this.power < 410) {
      this.sprite.gotoAndStop(34);
    }

  }

  mouse_down() {
    viewport.on('mousedown', (event) => {
      this.power = 900;
      this.moveable = false;
      
      ticker.add(this.count_down);
  
      if (this.weapon === 'bow' && this.ammo > 0) {

        const mouse_position_player = get_mouse_position_from_player(event, this.sprite, viewport)
  
        // global.Player.sprite._textures = global.Player.sprite.ready._textures;
        this.sprite.rotation = sprite_helper.get_angle_from_point_to_point(this.sprite, mouse_position_player);
        this.sprite.gotoAndPlay(0);
      }
    });
  }

  mouse_up() {
    viewport.on('mouseup', (event) => {
      // global.Player.sprite._textures = global.Player.sprite.idle._textures;
      this.moveable = true;
      this.sprite.play();
  
      ticker.remove(this.count_down);
  
      if (this.weapon === 'bow' && this.ammo > 0 && this.allow_shoot) {
        const mouse_position_player = get_mouse_position_from_player(event, this.sprite, viewport)
  
        bow_helper.arrow_management(this.power, this.sprite, mouse_position_player);
      }
    });
  }
  
  add_controls() {
    global.document.addEventListener('keydown', (e) => {
      const key = document_helper.getDirection(e.key);
  
      if (!this.moveable) return;
  
      if (key === 'up') {
        this.sprite.y -= this.movement_speed;
        this.sprite.rotation = -2;
        // this.sprite._textures = this.sprite.walk._textures;
      }
  
      if (key === 'down') {
        this.sprite.y += this.movement_speed;
        this.sprite.rotation = 2;
        // this.sprite._textures = global.Player.sprite.walk._textures;
      }
  
      if (key === 'left') {
        this.sprite.x -= this.movement_speed;
        this.sprite.rotation = -3;
        // this.sprite._textures = global.Player.sprite.walk._textures;
      }
  
      if (key === 'right') {
        this.sprite.x += this.movement_speed;
        this.sprite.rotation = 0;
        // this.sprite._textures = global.Player.sprite.walk._textures;
      }
    })
  }

}

module.exports = {
  Player,
}
