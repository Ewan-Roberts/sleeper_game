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

}

module.exports = {
  Dialog_Script,
  Dialog,
  SpeechText,
};
