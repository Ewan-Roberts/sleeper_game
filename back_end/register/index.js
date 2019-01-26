'use strict';

const User              = require('../../database/models/User');
const uuid              = require('uuid/v4');
const generate_password = require('password-generator');

async function create_user(user_info) {
  if(!user_info) throw new Error('no user information provided');

  const searched_user = await User.find({ user_name : user_info.user_name });

  if(searched_user.length > 0) {
    return ({ error: 'user_name already exists'});
  }

  user_info.id       = uuid();
  user_info.password = generate_password();

  const user = await new User(user_info).save();

  return {
    password  : user.password,
    inventory : user.inventory,
    user_name : user.user_name,
  };
}

async function get_user_by_password(password) {
  console.log(password)
  const result = await User.find({ password });

  return result[0];
}

async function delete_user_by_id(user_id) {
  const result = await User.deleteOne({ id: user_id });

  return result;
}

module.exports = {
  create_user,
  get_user_by_password,
  delete_user_by_id,
};
