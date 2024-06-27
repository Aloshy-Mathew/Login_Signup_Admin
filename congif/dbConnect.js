const mongoose = require('mongoose')

module.exports = mongoose.connect('mongodb://localhost:27017/UMS')
.then(()=>{

     console.log("Database connected");
})
.catch(()=>{
      console.log("Database not connected");
})