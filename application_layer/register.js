'use strict';

class Register_User {
  constructor(attribute) {
    this.user_name = attribute.user_name;
    this.password  = attribute.password;
  }
}

function register_handler(request, response) {
  const parsed_body = request.body;

  if(!parsed_body.email) {
    throw new Error('no email provided');
  }

  if(!parsed_body.user_name) {
    throw new Error('no username provided');
  }

  const user_details = new Register_User(parsed_body);

  return user_details;
}

module.exports = {
  register_handler,
};
