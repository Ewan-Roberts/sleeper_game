const   dynamoose       = require('mongoose'),
        User            = require('../models/User')


// BUG why when i set this to post does it not allow me to delete it?
//need an email
module.exports = user_id => {

    return new Promise((resolve,reject)=>{

        User.find({'_id': { $in: user_id}}, (err, docs) =>{
            
            resolve(docs);
            
        });

    })

};








