const Container = require('../models/Container')

module.exports = id => {
    console.log(id)
    return new Promise((resolve,reject)=>{

        Container.findOne({'chest_id': id}, (err, docs) =>{
            resolve(docs);
        });

    })

};






