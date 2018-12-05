'use strict';

const PIXI = require('pixi.js');
const viewport = require('../engine/viewport');

//const enemyDialogOptions = [
// 'Oh shit, there he is',
// 'Who the fuck are you',
// 'Dont fucking move',
// 'Stop stop stop',
// 'No more, not again',
// 'Karl? That you?',
// 'Are you real?',
// 'Ill help you die',
// 'Give me that now',
// 'Isabella? Is that you?',
//};

class Dialog {
  constructor() {
    this.container = new PIXI.Container();
    this.container.zIndex = -20;
    viewport.addChild(this.container);
  }

  create_background() {
    this.background = new PIXI.Sprite.fromFrame('black_dot');

    this.background.zIndex = -10;
    this.background.alpha = 0.5;
    this.background.name = 'dialog_background';
    this.background.width = viewport.width;
    this.background.height = viewport.height;
    this.background.position.set(0,0);

    this.container.addChild(this.background);
  }

  add_script(script) {
    this.script = script;
  }

  add_portrait(point, image_name) {
    this.portrait = new PIXI.Sprite.fromFrame(image_name);

    this.portrait.zIndex = -11;
    this.portrait.position.set(point.x - 800, point.y);

    this.container.addChild(this.portrait);
  }

  clear_slide_text() {

    this.container.getChildByName('actor_text').text = '';
    this.container.getChildByName('render_text').text = '';
    this.container.getChildByName('button_text').text = '';
    this.container.getChildByName('choice_one').text = '';
    this.container.getChildByName('choice_two').text = '';

  }

  create_text_timeout(text_array) {
    let i = 0;
    let current_text = '';

    if(this.timeout) {
      this.container.getChildByName('render_text').text = '';
      clearInterval(this.timeout);
    } else {
      this.timeout = setInterval(()=> {
        if(i === text_array.length){
          clearInterval(this.timeout);
          return;
        }
        current_text += text_array[i] + ' ';
        this.container.getChildByName('render_text').text = current_text;
        i++;
      }, 150);
    }
  }

  refresh_text_slide(step) {
    this.clear_slide_text();
    const text_array = this.script[step].name.split(' ');
    this.create_text_timeout(text_array);

    this.container.getChildByName('actor_text').text = this.script[step].actor;
    this.container.getChildByName('button_text').text = 'next';
    this.container.getChildByName('button_text').click = () => {

      for(let i = 0; i < this.script.length; i++) {
        if(this.script[i].id === this.script[step].id){
          this.refresh_branch_slide(i);
        }
      }
    };
  }

  refresh_branch_slide() {
    this.clear_slide_text();
    this.container.getChildByName('choice_one').text = 'yes';
    this.container.getChildByName('choice_two').text = 'no' ;
  }

  enter_dialog_slide(point) {
    this.create_slide_format(point);

    if(this.script[0].type === 'Text'){
      this.refresh_text_slide(0);
    }
  }

  create_slide_format(point) {
    this.render_actor(point.x - 720, point.y -80, '');
    this.render_text(point.x - 400, point.y - 200, '');
    this.render_choice_one(point.x + 100, point.y + 100, '');
    this.render_choice_two(point.x + 200, point.y + 100, '');
    this.render_action(point.x + 200, point.y + 200);
  }

  render_choice_two(x, y, text) {
    const choice_text = new PIXI.Text(text, {
      fontFamily : 'Arial',
      fontSize: 30,
      fill : 0xC0C0C0,
    });
    choice_text.name = 'choice_two';
    choice_text.position.set(x,y);

    this.container.addChild(choice_text);
  }

  render_choice_one(x, y, text) {
    const choice_text = new PIXI.Text(text, {
      fontFamily : 'Arial',
      fontSize: 30,
      fill : 0xC0C0C0,
    });
    choice_text.name = 'choice_one';
    choice_text.position.set(x,y);

    this.container.addChild(choice_text);
  }

  render_actor(x, y, text) {
    const actor_text = new PIXI.Text(text, {
      fontFamily : 'Arial',
      fontSize: 30,
      fill : 0xC0C0C0,
    });
    actor_text.name = 'actor_text';

    actor_text.position.set(x,y);

    this.container.addChild(actor_text);
  }

  render_action(x, y, text) {
    const button_text = new PIXI.Text(text, {
      fontFamily : 'Arial',
      fontSize: 30,
      fill : 0x0000ff,
    });

    button_text.name = 'button_text';
    button_text.position.set(x,y);
    button_text.interactive = true;
    button_text.buttonMode = true;

    this.container.addChild(button_text);
  }

  render_text(x, y, text) {
    const render_text = new PIXI.Text(text, {
      fontFamily : 'Arial',
      fontSize: 35,
      fill : 0xffffff,
    });
    render_text.name = 'render_text';
    render_text.position.set(x,y);

    this.container.addChild(render_text);
  }

}

module.exports = {
  Dialog,
};
