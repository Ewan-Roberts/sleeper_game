



module.exports.renderText = (point, text) => {

  const renderText = new PIXI.Text(text);
  renderText.x = point.x;
  renderText.y = point.y-100;

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

