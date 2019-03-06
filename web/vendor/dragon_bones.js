'use strict';
const PIXI = require('pixi.js');

class Application {
  constructor() {

    const app = new PIXI.Application({
      width          : global.window.innerWidth,
      height         : global.window.innerHeight,
      antialias      : false,
      autoResize     : true,
      backgroundColor: 0x000000,
    });

    global.document.body.appendChild(app.view);
    this._stage = app.stage;
    console.log(this);
    this._renderer = new PIXI.autoDetectRenderer(800, 600);

    this._skeleton = undefined;

    document.body.appendChild(this._renderer.view);

    this._time = 0;
    this._onTick = this._onTick.bind(this);

    this._addGraphics();
    this._addDragonbones();
    this._addText();

    window.requestAnimationFrame( this._onTick );
    console.log('hi');


  }
}
console.log(PIXI)
Application.prototype._addDragonbones = function () {

    console.log(PIXI._);
  const loader = new PIXI.loaders.Loader();

  loader.use(PIXI.dragonbones.loaders.skeletonParser())
    .add([
      {name: 'warrior', url: './dragon_atlas_skeleton.json'},
    ])
    .load((function (loader, res) {
      const skeleton = PIXI.dragonbones.display.Skeleton.makeArmature('warrior_Anims', 'warrior');
      skeleton.armature.animation.gotoAndPlay('wrong_0', 0.2);

      skeleton.display.x = 360;
      skeleton.display.y = 450;

      this._stage.addChild(skeleton.display);

      this._skeleton = skeleton;
    }).bind(this));
};

Application.prototype._addText = function () {
  this._label = new PIXI.Text('DragonBones3 in Pixey!', {
    fill: '#FF0000',
    stroke: '#0000FF',
    strokeThickness: 5,
    dropShadow: true,
    dropShadowColor: '#FFFFFF',
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 5,
  });

  this._label.x = 300;
  this._label.y = 30;

  this._stage.addChild(this._label);
};

Application.prototype._addGraphics = function () {
  this._graphic1 = new PIXI.Graphics();

  this._graphic1.beginFill(0xFF0000, 1.0);
  this._graphic1.drawRect(-25, -25, 50, 50);
  this._graphic1.endFill();

  this._stage.addChild(this._graphic1);
  this._graphic1.position.x = 50;
  this._graphic1.position.y = 50;
};

Application.prototype._onTick = function (e) {
  window.requestAnimationFrame( this._onTick );

  PIXI.dragonbones.runtime.animation.WorldClock.clock.advanceTime(0.02);

  this._renderer.render(this._stage);
};
new Application();
