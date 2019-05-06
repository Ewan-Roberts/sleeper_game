'use strict';
const event = require('events');

const damage_events = new event();
damage_events.on('error', err => new Error(err));

module.exports = {
  damage_events,
};
