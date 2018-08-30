
const 	Container 	= require('../models/Container'),
		Item 	  	= require('../models/Item'),
		getItems 	= require('./getItems')


module.exports = data => {

    // console.log("setUser called")
    // console.log(data)
    return new Promise((resolve,reject)=>{

	    Container.findOne({"chest_id": data.chest_id}, (err, chest) =>{
	    	if (err) reject(err)

	     	if(chest === null){
	     		console.log("see me?")
	     		getItems(data.contents).then(res=>{
	     			
	     			data.contents = res
	     			console.log(data)
	     			console.log("chest")

		     		new Container(data).save(err=>{

		    		    if (err) reject(err)

		     			resolve(chest)

		    		}) 

	     		})

	     	} else {

	     		reject("Container already exists")

	     	} 

	    })

    })

};







