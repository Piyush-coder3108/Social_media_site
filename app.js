const express= require('express');
const expressLayouts= require('express-ejs-layouts');
const cookieParser= require('cookie-parser');
const db=require('./config/mongoose');
const session= require('express-session');
const passport = require('passport');
const flash=require('connect-flash');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore=require('connect-mongo');
const customware=require('./config/middleware')

const app=express();


const PORT= process.env.PORT || 5100;


app.use(express.urlencoded({extended: true}));
app.use(cookieParser());




//Serve Static files
app.use(express.static('./public'));

app.use(expressLayouts);

// Extraxt css and script files 
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


//Setting view engine
app.set('view engine','ejs');
app.set('views','./views');

// Mongo store used to store cookie
app.use(session({
    name: 'social_dev',
    secret: 'secret',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://piyush:piyush@userdetail.lpxe0.mongodb.net/social_media_site?retryWrites=true&w=majority',
        autoRemove: 'disabled'
    },(err)=>{ console.log(err || 'connect-mongo db ok')})
    
  }));
  

// Passport 
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customware.setFlash);
//express Router

app.use('/',require('./routes/index'));







app.listen(PORT,(err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log(`Server running at PORT ${PORT}`);
    }
})