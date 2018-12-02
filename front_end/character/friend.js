const PIXI = require('pixi.js');
const viewport = require('../engine/viewport');
const ticker = require('../engine/ticker');
const { Dialog } = require('../dialog/dialog_util');

class Friend {
  constructor() {
    this.container = new PIXI.Container();
    this.container.name = 'friend_container';

    const idle_frames = this.create_idle_frames();
    this.sprite = new PIXI.extras.AnimatedSprite(idle_frames);
    this.sprite.anchor.set(0.5);
    this.sprite.animationSpeed = 0.4;
    this.sprite.play();
    this.sprite.name = 'friendly';
    this.sprite.interactive = true;
    this.sprite.buttonMode = true;

    this.container.addChild(this.sprite);
    viewport.addChild(this.container);
  }

  add_script(script) {
    this.sprite.dialog = {
      script: script,
      current_step: 0,
    }
  }

  speak(text) {
    const render_text = new PIXI.Text(text);
    render_text.x = this.sprite.x - 100;
    render_text.y = this.sprite.y - 80;
    render_text.alpha = 1;
    this.container.addChild(render_text);
  }

  add_dialog_handling() {
    this.dialog = new Dialog();
    this.dialog_open = false;
  }
  
  add_state_handling() {
    this.sprite.click = () => {
      //if(this.dialog_open) {
      //  return;
      //}
      const player = viewport.getChildByName('player');
      this.dialog.create_background();
      this.dialog.add_script(this.sprite.dialog.script);
      this.dialog.add_portrait(player, 'merc_portrait');
      this.dialog.enter_dialog_slide(player);
    }
  }

  create_idle_frames() {
    const idle_frames = [];
    for (let i = 0; i <= 21; i += 1) {
      let name = `survivor-idle_0${i}`;
      
      if (i >= 10) {
        name = `survivor-idle_${i}`;
      }
      idle_frames.push(PIXI.Texture.fromFrame(name));
    }
    const reversed = idle_frames.reverse();
    return idle_frames.concat(reversed);
  }

  set_position(x, y) {
    this.sprite.position.set(x, y);
  }
}

module.exports = {
  Friend,
}


