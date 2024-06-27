const mongoose = require('mongoose')




const userSchema = mongoose.Schema({

      email:{
         type:String,
         required:true
      },
      name:{
         type:String,
         required:true
      },
      mobile:{
        type:Number,
        required:true
      },
      password:{
         type:String,
         required:true
      }
},
) 


const Collection = new mongoose.model('user',userSchema)

module.exports = Collection 