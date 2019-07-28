const { backgrounds  } = require('../engine/pixi_containers');
const { Text, DEG_TO_RAD } = require('pixi.js');
const { tweenManager } = require('pixi.js');

class FloorWord extends Text {
  constructor(data) {
    super(data);

    const degrees = data.rotation * DEG_TO_RAD;
    this.style.fontSize   = data.font_size || 20;
    this.style.fill       = data.fill      || 'black';
    this.style.fontWeight = data.weight    || 'bolder';
    this.style.align      = data.align     || 'center';

    this.text     = data.text  || 'Invalid Text';
    this.alpha    = data.alpha || 1;
    this.rotation = degrees    || 0;
    this.tint     = data.tint  || 0xA9A9A9;
    this.anchor.set(0.5);

    this.tween       = tweenManager.createTween(this);
    this.tween.delay = data.delay || 0;
    this.position.copy(data);
  }

  fade_in_wait_out(in_time = 1000, wait_time = 1000, out_time = 1000) {
    this.fade_in(in_time);
    this.tween.on('end', () => {
      this.tween.reset();
      this.delay = wait_time;

      this.fade_out(out_time);
    });
  }

  fade_in(time = 1000) {
    this.tween.reset();
    this.tween.time = time;
    this.alpha = 0;
    this.tween.to({alpha: 1});
    this.tween.start();
  }

  fade_out(time = 1000) {
    this.tween.reset();
    this.tween.time = time;
    this.tween.from({
      alpha: 1,
    }).to({
      alpha: 0,
    });

    this.tween.on('end', () => {
      this.tween.remove();
      this.destroy();
    });
    this.tween.start();
  }
}


//const word_poo = ['KILL','DIE','RUN!!','hahahHa','<script>','DIE',')(1ll','dIE','GO'];
const default_words = ['Math.random()','<h2>','</html>','function() { 4>>','if(true){...','RUN','hahahHa','</head>','<script>','<div>','i++','DIE'];

const bounds = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const random_text = (array) => array[Math.floor(Math.random()*array.length)];

function random_word({
  point,
  size        = 80,
  closeness   = 100,
  fade_lower  = 500,
  fade_higher = 2000,
  text = default_words,
}) {
  const random_word_from_array = random_text(text);
  const word = new FloorWord({
    font_size: bounds(10, size),
    rotation:  bounds(-30, 30),
    text :     random_word_from_array,
    fill:      Math.random() >= 0.5?'white':'black',
    delay:     bounds(500, 2000),
  });
  word.position.copy(point);
  word.x += bounds(-closeness, closeness);
  word.y += bounds(-closeness, closeness);
  const fade_in   = bounds(fade_lower, fade_higher);
  const fade_wait = bounds(fade_lower, fade_higher);
  const fade_out  = bounds(fade_lower, fade_higher);
  backgrounds.addChild(word);
  word.fade_in_wait_out(fade_in, fade_wait, fade_out);
}

const pulse_words = array => {
  let delay = 800;
  array.forEach(unit => {
    const word = new FloorWord({
      ...unit,
      text: unit.text.text,
      delay,
      fill: 'white',
    });
    delay += 60;
    backgrounds.addChild(word);
    word.fade_in_wait_out(delay);
  });
};

module.exports = {
  FloorWord,
  random_word,
  pulse_words,
};
