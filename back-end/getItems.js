const Item = require('../models/Item')

module.exports = items => {
    
    return new Promise((resolve,reject)=>{

        Item.find({'item_id': { $in: items}}, (err, docs) =>{
            resolve(docs);
            
        });

    })

};







