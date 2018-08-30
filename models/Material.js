const dynamoose = require('dynamoose');


const Weapon = new dynamoose.Schema({ 
    
    id: {
        type:               String,
        hashKey:            true,
        required:           true,
        trim:               true,
        validate:           /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    },
    name: {
        type:               String,
        required:           true,
        trim:               true
    },
    brand: {
        type:               String,
        required:           true,
        trim:               true,
        validate:           v=> undefined === v || ~['Brand1', 'Brand2'].indexOf(v)
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


module.exports = dynamoose.model("BrandVoucher", Weapon)
