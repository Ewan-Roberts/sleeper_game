const { visuals } = require('../engine/pixi_containers');
const { Caption } = require('../view/caption');
const { Text    } = require('pixi.js');
const { sound   } = require('pixi.js');


class SpeechText extends Text {
  constructor(text, point) {
    super(text, {
      fill:   'white',
      weight: 'bolder',
    });
    this.anchor.set(0.5);
    this.alpha = 0.5;
    this.position.copy(point);
    this.y -= 50;

    visuals.addChild(this);
  }
}

// insert any nymber of scripts and have then scale
class Dialog {
  constructor(entity, script_array) {
    this.name     = 'dialog';
    this.script   = script_array;
    this.iterator = this.generator();
    this.entity   = entity;
  }

  * generator() {
    while(this.script.length > 0) {
      const sentence = this.script.splice(0, 1);
      const current_text = new SpeechText(sentence, this.entity);

      yield;
      current_text.destroy();
    }
  }

  next() {
    this.iterator.next();
  }
}

class Dialog_Script {
  constructor(point) {
    this.point  = point;
    this.happy_iterator = this.happy();
    this.angry_iterator = this.angry();
    this.help_iterator = this.help();
    this.speech_iterator = this.speech();
    this.current_text = undefined;

    this._set_sound();
  }

  _set_sound() {
    this.wood_thump_effect = sound.find('wood_thump');
    this.wood_thump_effect.volume = 0.5;
    this.revolver_cock_effect = sound.find('revolver_cock');
    this.ranbir_rant_normal = sound.find('ranbir_rant_normal');
    this.eerie_song = sound.find('eerie_ambient');
    this.whisper_effect = sound.find('whisper_effect');
    this.click_effect = sound.find('click');
    this.woman_weeping = sound.find('woman_weeping');
    this.woman_weeping.volume = 0;
    this.crazy_woman_repent = sound.find('crazy_woman_repent');
    this.crazy_woman_repent.volume = 0;
  }

  entered_room() {
    this.current_text.destroy();
    this.current_text = new SpeechText('You fucking idiot not in there!',this.point);
    this.attack();
  }

  attack() {
    this.point.logic_start();
    this.woman_weeping.stop();
    this.crazy_woman_repent.play();
    this.eerie_song.play();
  }

  * help() {
    this.current_text = new SpeechText('help me...',this.point);
    this.woman_weeping.play();
    yield;
    this.current_text.destroy();

    this.current_text = new SpeechText('thank god you are here... help me',this.point);
    yield;
    this.current_text.destroy();

    this.current_text = new SpeechText('I ask for mercy...',this.point);
    yield;
    this.current_text.destroy();

    this.attack();
  }

  * speech() {
    console.log('speech');
    if(this.current_text) this.current_text.destroy();
    this.ranbir_rant_normal.play();
    this.ranbir_rant_normal.volume = 0.2;
    yield;

    this.ranbir_rant_normal.volume += 0.2;
    yield;
    this.ranbir_rant_normal.volume += 0.2;
    yield;
    this.ranbir_rant_normal.volume += 0.2;
    yield;
    this.ranbir_rant_normal.volume += 0.2;
    yield;
    this.ranbir_rant_normal.volume += 0.2;
    yield;

    Caption.render('Carefull, lets go slow');

    this.current_text = new SpeechText('',this.point);
    yield;
    this.current_text.destroy();

    Caption.render('We\'re really going to grease the shaft of this prick?');
    this.current_text = new SpeechText('is a place where we never go hungry',this.point);
    yield;
    this.current_text.destroy();

    this.current_text = new SpeechText('now usually you would be part of that...',this.point);
    Caption.render('what?');
    yield;
    this.current_text.destroy();

    this.current_text = new SpeechText('but my team is a little low...',this.point);
    Caption.render('Good');
    yield;
    this.current_text.destroy();

    this.current_text = new SpeechText('SHUT UP!!! THIS ONE IS NOT FOOD!',this.point);
    this.wood_thump_effect.play();
    yield;

    this.current_text = new SpeechText('FINE THEN!',this.point);
    this.current_text.destroy();
  }

  * happy() {
    console.log('happy');
    if(this.current_text) this.current_text.destroy();
    this.current_text = new SpeechText('ignore that woman, come on in here, you are safe',this.point);
    Caption.render('We are not safe');
    yield;
    this.current_text.destroy();

    this.current_text = new SpeechText('COME IN, but not too close OK',this.point);
    yield;
    this.current_text.destroy();

    this.current_text = new SpeechText('Its Madness out there',this.point);
    yield;
    this.current_text.destroy();

    this.current_text = new SpeechText('you are safe here',this.point);
    Caption.render('We are not safe here');
    yield;
    this.current_text.destroy();

    this.current_text = new SpeechText('now sit and let me tell you what you can be part of',this.point);
    Caption.render('We dont need to be part of anything');
    yield;
    this.current_text.destroy();
  }

  * angry() {
    console.log('angry');
    this.current_text = new SpeechText('Oh hello there',this.point);

    this.eerie_song.play();
    this.whisper_effect.play();
    this.eerie_song.volume = 0.3;
    this.whisper_effect.volume = 0.01;

    if(this.current_text) this.current_text.destroy();
    this.current_text = new SpeechText('Stay back friend, I have a gun',this.point);
    Caption.render('lets fucking kill him');
    yield;
    this.revolver_cock_effect.play();
    this.eerie_song.volume = 0.5;
    this.whisper_effect.volume = 0.05;
    Caption.render('He wont have bullets');

    this.current_text.destroy();

    this.current_text = new SpeechText('ITS LOADED! STEP BACK!',this.point);

    yield;
    this.click_effect.volume = 100;
    this.click_effect.play();
    this.current_text.destroy();
  }
}

module.exports = {
  Dialog_Script,
  Dialog,
  SpeechText,
};
