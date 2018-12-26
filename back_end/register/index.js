'use strict';

const User = require('../../database/models/User');

async function create_user(user_info) {
  const new_user = new User(user_info);

  new_user.save().then(user => {
    return user;
  });

}

module.exports = {
  create_user,
};
