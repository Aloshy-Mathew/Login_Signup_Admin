const userCollection = require('../model/userModel');

//to get into loginpage

const getLogin = async(req,res)=>{
      
    try {

      if( req.session.log){

        res.redirect('/getHome')
      }else{
        res.render('userPage/login')
      }

     } catch (error) {
        console.log(error.message);
    }
}



//to get into siguppage
const getsignup = async(req,res)=>{
    try {

        res.render('userPage/signup')

    } catch (error) {
        console.log(error.message);
    }
}



const homeFrond = async(req,res)=>{

      try {
        if(req.session.log){
            res.render('userPage/home')
        }else{
          res.redirect('/');
        }
      } catch (error) {
          console.log(error.message);
      }
}


const getHome = async(req,res)=>{

     try {

        console.log("Checking user");

        console.log(req.body.email);

        const exsistingUser = await userCollection.findOne({email:req.body.email})


          console.log("user exsisitng user",exsistingUser);

          if(!exsistingUser){
            return res.send('Not An Existing User');
          }

          req.session.log=true

          res.render('userPage/home');
        
     } catch (error) {
        console.log(error.message);
     }
}




//user to a create signup
const userSave = async(req,res)=>{
    try {

        const exsistingUser = await userCollection.findOne({email:req.body.email})
        


        if(!exsistingUser){

            const  newUser = new userCollection ({
         
                email:req.body.email,
                name:req.body.name,
                mobile:req.body.mobile, 
                password:req.body.password
            })
        
            await newUser.save()

            req.session.user = newUser

            res.redirect('/')

        }  else{

                res.redirect("/signupget")

                }

        
    } catch (error) {
        console.log(error.message);
    }

}



const logoutPage = async (req, res) => {
    try {
      console.log('coming to logout')
      req.session.destroy((err) => {
        if (err) {
          console.log(err.message);
        }
        console.log('coming to login')
        res.redirect('/');
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).send('An error occurred.');
    }
  };
  

module.exports={
     getLogin,
     getsignup,
     userSave,
     logoutPage,
     getHome,
     homeFrond
}