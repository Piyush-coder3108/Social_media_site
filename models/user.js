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
    },
    Bio: {
        type: String,
        default: "Not Available"
    },
    Work: {
        type: String,
        default: "Not Available"
    },
    Studies: {
        type: String,
        default: "Not Available"
    },
    Lives: {
        type: String,
        default: "Not Available"
    },
    Status: {
        type: String,
        enum: ['Single','Married','Searching','Dating'],
        default: 'Single'
    },

    Friends: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
     ],

     Pending_request: [
         {
             type: mongoose.Schema.Types.ObjectId,
             ref: 'User'
         }
     ]
    

},{
    timestamps: true
});

const User= mongoose.model('User',userSchema);
module.exports= User;