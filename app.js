const express = require('express')
require('./congif/dbConnect')
const app = express()
const userRouter = require('./router/userRouter')
const adminRouter = require('./router/adminRouter')
const path = require('path')
const session = require("express-session")
require('dotenv')


//convert data in json format
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine','ejs')


app.use((req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
});
   const sessionSecret = process.env.SESSION_SECRET
   console.log(sessionSecret)
   //session setting
   app.use(
     session({
       secret: 'keyboard cat',
       resave: true,
       saveUninitialized: true,
     })
   );


app.use(userRouter)
app.use(adminRouter)


app.listen(7000,()=>{

     console.log("The server start");
})
