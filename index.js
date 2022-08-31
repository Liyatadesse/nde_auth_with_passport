const express= require("express");
const app= express();
const PORT= process.env.PORT ||8001
const mongoose=require("mongoose");
const dotenv = require('dotenv'); 
const flash= require('connect-flash')
const session=require('express-session')
dotenv.config()
const expressLayouts= require("express-ejs-layouts")
const passport= require('passport');
require('./config/passport')(passport); 



mongoose.connect(process.env.MONGO_URL).then(()=>console.log("connected to db")).catch(err=>(console.log(err)));
app.use(expressLayouts);
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
   
  }))
  app.use(passport.initialize());
  app.use(passport.session());
app.use(flash());
//global vars
app.use((req,res,next)=>{
    res.locals.success_msg= req.flash('success_msg')
    res.locals.error_msg= req.flash('error_msg');
    res.locals.error=req.flash('error');
    next();
})
app.set("view engine","ejs")
app.use("/",require("./routes/app"))
app.use("/users",require("./routes/users"))
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})