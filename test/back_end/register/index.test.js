'use strict';

const { expect } = require('chai');
const uuid = require('uuid/v4');

const {
  create_user,
} = require('/Users/ewan/Dropbox/game/sleeper_browserfy/back_end/register/index');

const valid_schema = {
  user_name: 'taka',
  id: uuid(),
};


describe('back_end/register/index', function() {

  context('create_user(...)', function() {

    it('should fail if nothing provided', async function() {
      const created_user = await create_user();

      expect(created_user).to.throw;
    });

    it('should return valid user if provided valid inputs', async function() {
      const created_user = await create_user(valid_schema);

      expect(created_user).to.not.throw;
    });

  });

});
