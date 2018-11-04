const   dynamoose       = require('mongoose'),
        User            = require('../models/User')


// BUG why when i set this to post does it not allow me to delete it?
//need an email
module.exports = user_info => {

    const newUser = new User(user_info)

    newUser.save(err=>{

        if (err) throw err

    })

};








