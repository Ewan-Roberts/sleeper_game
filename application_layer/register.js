'use strict';

class User {
  constructor(attribute) {
    this.user_name = attribute.user_name;
    this.password  = attribute.password;
  }
}

function handler(request, response) {
  const parsed_body = request.body;

  if(!parsed_body.password) {
    throw new Error('no password provided');
  }

  if(!parsed_body.user_name) {
    throw new Error('no username provided');
  }

  const user_details = new User(parsed_body);

  return user_details;
}

module.exports = {
  handler,
};
