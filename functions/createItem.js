const Item = require('../models/Item'),
        fs = require('fs')

module.exports = item_data => {
    console.log(item_data)
    return new Promise((resolve,reject)=>{

        Item.findOne({"item_id": item_data.item_id})
        .then(item=>{

            if(item === null){

                console.log("hi")
                console.log(item_data.file_name)
                fs.readFile('./server_images/'+item_data.file_name, function(err, img){
                    console.log(err)
                    console.log(img)

                    item_data.img = "data:image/png;base64,"+ img.toString("base64")

                    console.log(item_data.img)
                    new Item(item_data).save(err=>{
                        console.log(err)
                        console.log("err3")
                        resolve(item_data)

                    }) 

                })


            } else {
                console.log("ITEM EXISTS ALREADY")
                reject("item exists")
            }

        })

    })

};







