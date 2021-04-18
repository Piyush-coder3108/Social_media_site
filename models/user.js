const mongoose= require('mongoose');

const userSchema= new mongoose.Schema({
  
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },
    Birthday: {
        type: String,
        required: true
    },

    Gender: {
        type: String,
        enum: ['Male','Female','Other'],
        required: true
    }

},{
    timestamp: true
});

const User= mongoose.model('User',userSchema);
module.exports= User;