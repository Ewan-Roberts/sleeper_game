const Item = require('../models/Item'),
        fs = require('fs')

module.exports = item_data => {
    return new Promise((resolve,reject)=>{

        Item.findOne({"item_id": item_data.item_id})
        .then(item=>{

            if(item === null){

                fs.readFile('./server_images/'+item_data.file_name, function(err, img){
                    item_data.img = "data:image/png;base64,"+ img.toString("base64")
                    new Item(item_data).save(err=>{
                        resolve(item_data)

                    }) 

                })


            } else {
                reject("item exists")
            }

        })

    })

};







