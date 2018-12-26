'use strict';

const User = require('../../data_base/models/User');

console.log(User);
console.log('Uservvvvvvvvvvvvvvvvvvvvvvvvvv');


async function create_user(user_info) {
  const new_user = new User(user_info);
  console.log('rrrrrrrrrrrrrrrrrrrrrr');
  console.log(new_user);
  new_user.save().then(user => {
    console.log('aaaaaaaaaaaaaaaaaaaaaaa')
    console.log(user)
    return user;
  });

}

module.exports = {
  create_user,
};
