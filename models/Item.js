const mongoose = require('mongoose');


const ItemSchema = new mongoose.Schema({ 
    
    item_id: {
        type:       Number,
        required:   true
    },
    img: {
        type:       String,
        required:   true
    },
    name: {
        type:       String,
        required:   true
    },
    rarity: {
        type:       String,
        required:   true
    },
    drop_rate: {
        type:       Number,
        required:   true
    },
    materials: {
        type:       Array,
    },
    mod: {
        type:       Boolean
    }

},
{
    saveUnknown:            true,
    timestamps: {
        createdAt:          'creation_date',
        updatedAt:          'last_update_date'
    }
});


module.exports = mongoose.model("Item", ItemSchema)
