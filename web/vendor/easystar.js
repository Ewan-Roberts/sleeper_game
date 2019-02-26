'use strict';

const easystarjs = require('easystarjs');
const easystar = new easystarjs.js();

easystar.setIterationsPerCalculation(1000);
easystar.setAcceptableTiles([0]);
easystar.enableDiagonals();
easystar.enableCornerCutting();

module.exports = {
  easystar,
};

