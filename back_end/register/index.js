'use strict';

const User = require('../../data_base/models/User');

async function create_user(user_info) {
  const new_user = new User(user_info);

  new_user.save().then(user => {
    console.log('aaaaaaaaaaaaaaaaaaaaaaa')
    return user;
  });

}

module.exports = {
  create_user,
};
