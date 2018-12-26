const dynamoose = require('dynamoose');


const Weapon = new dynamoose.Schema({ 
    
    id: {
        type:               String,
        hashKey:            true,
        required:           true,
        trim:               true
    },
    name: {
        type:               String,
        required:           true,
        trim:               true
    },
    thing: {
        type:               String,
        required:           true,
        trim:               true
    }
},
{
    timestamps: {
        createdAt:          'creation_date',
        updatedAt:          'last_update_date'
    },
    expires: {
        ttl:                7*24*60*60, // 1 week in seconds
        attribute:          'ttl' // ttl will be used as the attribute name
    }

});


module.exports = dynamoose.model("thing", Weapon)
