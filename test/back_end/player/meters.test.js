'use strict';

const { expect } = require('chai');
const { get_player_vitals } = require('/Users/ewan/Dropbox/game/sleeper_browserfy/back_end/player/meters');

xdescribe('/back_end/player/meters', function() {

  context('get_player_status(...)', function() {
    it('provids player vitals', function() {
      const player_vitals = get_player_vitals('7f7d7124-d822-4550-a1bb-d2f2ac8e9bb6');

      console.log(player_vitals);
      expect(player_vitals).to.be.ok;
    });

  });

  context('update_player_status(...)', function() {});

  context('kill_player(...)', function() {});

  context('revive_player(...)', function() {});

  context('revive_player(...)', function() {});
});
