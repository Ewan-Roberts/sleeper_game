const   dynamoose       = require('mongoose'),
        User            = require('../models/User.js')


// BUG why when i set this to post does it not allow me to delete it?
//need an email

module.exports.start = user_id => {

    console.log("meters_start called")
    User.findById(user_id, (err, foundUser) =>{
        
        if (err) throw err
        foundUser.meters.water -= 0.25;
        foundUser.meters.food -= 0.15;
        foundUser.meters.sleep -= 0.1;
    
        new User(foundUser).save((err, updatedUser)=> {
            if (err) throw err
            console.log(updatedUser)
        });
    
    });

};

module.exports.updateSleep = (user_id,to_add) => {

	let parsed_hour = parseInt(to_add)

	return new Promise((resolve,reject)=>{
    
	    console.log("update_sleep called")
	    User.findById(user_id, (err, foundUser) =>{
	        
	        if (err) throw err
	     
	        foundUser.meters.sleep = parseInt(foundUser.meters.sleep) + parsed_hour;
	    
	        new User(foundUser).save((err, updatedUser)=> {
	            if (err) throw err
	            resolve(updatedUser)
	        });
	    
	    });

	})

};

module.exports.updateFood = (user_id,amount) => {

	return new Promise((resolve,reject)=>{
    
	    console.log("update_food called")
	    User.findById(user_id, (err, foundUser) =>{
	        
	        if (err) throw err
	     
	        foundUser.meters.food = foundUser.meters.food + amount;
	    
	        new User(foundUser).save((err, updatedUser)=> {
	            if (err) throw err
	            resolve(updatedUser)
	        });
	    
	    });

	})

};

module.exports.updateWater = (user_id,amount) => {

	return new Promise((resolve,reject)=>{
    
	    console.log("update_water called")
	    User.findById(user_id, (err, foundUser) =>{
	        
	        if (err) throw err
	     
	        foundUser.meters.water = foundUser.meters.water + amount;
	    
	        new User(foundUser).save((err, updatedUser)=> {
	            if (err) throw err
	            resolve(updatedUser)
	        });
	    
	    });

	})

};

module.exports.updateHealth = (user_id,amount) => {

	return new Promise((resolve,reject)=>{
    
	    console.log("update_health called")
	    User.findById(user_id, (err, foundUser) =>{
	        
	        if (err) throw err
	     
	        foundUser.meters.health = foundUser.meters.health + amount;
	    
	        new User(foundUser).save((err, updatedUser)=> {
	            if (err) throw err
	            resolve(updatedUser)
	        });
	    
	    });

	})

};

module.exports.updateHeat = (user_id,amount) => {

	return new Promise((resolve,reject)=>{
    
	    console.log("update_heat called")
	    User.findById(user_id, (err, foundUser) =>{
	        
	        if (err) throw err
	     
	        foundUser.meters.heat = foundUser.meters.heat + amount;
	    
	        new User(foundUser).save((err, updatedUser)=> {
	            if (err) throw err
	            resolve(updatedUser)
	        });
	    
	    });

	})

};

module.exports.updateWeight = (user_id,amount) => {

	return new Promise((resolve,reject)=>{
    
	    console.log("update_weight called")
	    User.findById(user_id, (err, foundUser) =>{
	        
	        if (err) throw err
	     
	        foundUser.meters.weight = foundUser.meters.weight + amount;
	    
	        new User(foundUser).save((err, updatedUser)=> {
	            if (err) throw err
	            resolve(updatedUser)
	        });
	    
	    });

	})

};

module.exports.updateDesease = (user_id,amount) => {

	return new Promise((resolve,reject)=>{
    
	    console.log("update_desease called")
	    User.findById(user_id, (err, foundUser) =>{
	        
	        if (err) throw err
	     
	        foundUser.meters.desease = ""
	    
	        new User(foundUser).save((err, updatedUser)=> {
	            if (err) throw err
	            resolve(updatedUser)
	        });
	    
	    });

	})

};





