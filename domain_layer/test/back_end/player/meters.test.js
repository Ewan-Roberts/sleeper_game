'use strict';

const { expect } = require('chai');
const { get_player_vitals_by_id }
  = require('/Users/ewan/Dropbox/game/sleeper_browserfy/domain_layer/player/meters');

const { create_user }
  = require('/Users/ewan/Dropbox/game/sleeper_browserfy/domain_layer/register/index');

const uuid = require('uuid/v4');

const valid_schema = {
  user_name: 'Taka',
  id: uuid(),
  password: 'cool',
  vitals: {
    health: 100,
    hunger: 100,
  },
  location: {
    x: 0,
    y: 0,
  },
};

describe('/domain_layer/player/vitals', function() {
  let test_player;

  before(async function() {
    test_player = await create_user(valid_schema);
  });

  context('get_player_status(...)', function() {

    it('Provides player vitals', async function() {
      const found_player = await get_player_vitals_by_id(test_player);

      expect(found_player[0].vitals).to.deep.equal({
        health: 100,
        hunger: 100,
      });
    });

  });

  context('update_player_status(...)', function() {});

  context('kill_player(...)', function() {});

  context('revive_player(...)', function() {});

  context('revive_player(...)', function() {});
});
