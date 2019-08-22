const { viewport } = require('./app');
viewport.name = 'world';

viewport.updateLayersOrder = function () {
  viewport.children.sort(function(a,b) {
    a.zIndex = a.zIndex || 0;
    b.zIndex = b.zIndex || 0;
    return b.zIndex - a.zIndex;
  });
};

module.exports = {
  world: viewport,
};
