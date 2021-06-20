const mongoose= require('mongoose');

mongoose.connect(process.env.MONGO_URI,{ useNewUrlParser: true,useUnifiedTopology: true,useFindAndModify: false });

const db=mongoose.connection;

db.on('error',console.error.bind(console,"Error in connection Mongodb"));

db.once('open',()=>{
    console.log("Mongodb conencted");
});

module.exports=db;

