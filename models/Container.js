const mongoose = require('mongoose');


const ContainerSchema = new mongoose.Schema({ 
    
    chest_id: {
        type:       Number,
        required:   true
    },
    name: {
        type:       String,
        required:   true
    },
    location: {
        x:          String,
        y:          String
    },
    contents:{
        type:       Array,
        required:   true
    }
});


module.exports = mongoose.model("Container", ContainerSchema)
