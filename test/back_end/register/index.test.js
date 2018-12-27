'use strict';

const { expect } = require('chai');
const uuid = require('uuid/v4');

const {
  create_user,
  get_user_by_id,
  delete_user_by_id,
} = require('/Users/ewan/Dropbox/game/sleeper_browserfy/back_end/register/index');

const valid_schema = {
  user_name: 'taka',
  id: uuid(),
};


describe('back_end/register/index', function() {
  let test_user;

  before(async function() {

    test_user = await create_user(valid_schema);

  });

  context('create_user(...)', function() {
    let created_user;

    after(async function() {
      await delete_user_by_id(created_user.id);
    });

    xit('should fail if nothing provided', async function() {
      await expect(create_user()).to.throw;
    });

    it('should return valid user if provided valid inputs', async function() {
      created_user = await create_user(valid_schema);

      expect(created_user).to.not.throw;
    });

  });

  context('get_user_by_id(...)', function() {

    it('should fail if nothing provided', async function() {
      const created_user = await get_user_by_id();

      expect(created_user).to.throw;
    });

    it('should return valid user if provided valid inputs', async function() {

      const created_user = await get_user_by_id(test_user.id);

      expect(created_user).to.not.throw;
    });

  });

  context('delete_user_by_id(...)', function() {

    const user_to_delete_data = {
      user_name: 'i should not exist',
      id: uuid(),
    };

    let user_to_delete;

    before(async function() {
      user_to_delete = create_user(user_to_delete_data);

    });

    it('should delete a user on id', async function() {
      await delete_user_by_id(user_to_delete.id);

      const not_found_user = await get_user_by_id(user_to_delete.id);

      expect(not_found_user).to.deep.equal([]);
    });

  });

});
























