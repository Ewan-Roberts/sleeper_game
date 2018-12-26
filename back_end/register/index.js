'use strict';

const User = require('../../database/models/User');

async function create_user(user_info) {
  if(!user_info) throw new Error('nothing provided');

  const new_user = new User(user_info);

  const user = await new_user.save();

  return user;
}

async function get_user_by_id(user_id) {
  const result = await User.find({ id: user_id });

  return result;
}

module.exports = {
  create_user,
  get_user_by_id,
};
