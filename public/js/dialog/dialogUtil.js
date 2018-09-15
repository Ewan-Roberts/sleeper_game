
const enemyDialogOptions = [
  'Oh shit, there he is',
  'Who the fuck are you',
  'Dont fucking move',
  'Stop stop stop',
  'No more, not again',
  'Jimmy? That you?',
  'Are you real?',
  'Ill help you die',
  'Give me that now'
]

module.exports.renderText = (point, text) => {

  const renderText = new PIXI.Text(text);
  renderText.x = point.x-100;
  renderText.y = point.y-80;

  global.viewport.addChild(renderText)

  function fadeOut() {

    if(renderText.alpha > 0) {
      renderText.alpha -= 0.01;
    } else {
      global.app.ticker.remove(fadeOut)
    };
    
  }

  global.app.ticker.add(fadeOut);

}

module.exports.enemySurprised = () => {

  return enemyDialogOptions[Math.floor(Math.random()*enemyDialogOptions.length)];

}

