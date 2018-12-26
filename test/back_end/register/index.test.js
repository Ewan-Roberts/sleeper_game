'use strict';

const { expect } = require('chai');
const uuid = require('uuid/v4');

const {
  create_user,
  get_user_by_id,
} = require('/Users/ewan/Dropbox/game/sleeper_browserfy/back_end/register/index');

const valid_schema = {
  user_name: 'taka',
  id: uuid(),
};


describe('back_end/register/index', function() {

  context('create_user(...)', function() {

    xit('should fail if nothing provided', async function() {
      await expect(create_user()).to.throw;
    });

    it('should return valid user if provided valid inputs', async function() {
      const created_user = await create_user(valid_schema);

      expect(created_user).to.not.throw;
    });

  });

  context('get_user_by_id(...)', function() {

    it('should fail if nothing provided', async function() {
      const created_user = await get_user_by_id();

      expect(created_user).to.throw;
    });

    it('should return valid user if provided valid inputs', async function() {

      const created_user = await get_user_by_id('7f7d7124-d822-4550-a1bb-d2f2ac8e9bb6');
      console.log(created_user);
      expect(created_user).to.not.throw;
    });

  });

  context('get_user_by_id(...)', function() {});

  context('delete_user_by_id(...)', function() {});

  context('get_account_detials(...)', function() {});


});



