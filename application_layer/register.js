'use strict';

class Register {
  constructor(attribute) {
    this.user_name = attribute.user_name;
    this.password  = attribute.password;
  }
}


function handler(event, res) {
  // console.log(event);
  console.log(res);
  const user_details = new Register(event);

  return user_details;
}

module.exports = {
  handler,
};
