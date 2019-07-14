const {stage} = require('./app');
stage.name    = 'world';
stage.updateLayersOrder = function () {
  stage.children.sort(function(a,b) {
    a.zIndex = a.zIndex || 0;
    b.zIndex = b.zIndex || 0;
    return b.zIndex - a.zIndex;
  });
};

stage.roundPixels = true;

module.exports = {
  world : stage,
};






