'use strict';

const User = require('../../database/models/User');

async function create_user(user_info) {
  if(!user_info) throw new Error('nothing provided');

  const searched_user = await User.find({ user_name : user_info.user_name });

  if(searched_user) {
    return ({ error: 'user_name already exists'});
  }

  const user = await new User(user_info).save();
  return user;
}

async function get_user_by_id(user_id) {
  const result = await User.find({ id: user_id });

  return result;
}

async function delete_user_by_id(user_id) {
  const result = await User.deleteOne({ id: user_id });

  return result;
}

module.exports = {
  create_user,
  get_user_by_id,
  delete_user_by_id,
};
