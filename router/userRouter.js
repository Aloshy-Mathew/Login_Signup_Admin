const express = require('express')

const router = express.Router()
const userController = require('../controller/userController.js')

router.get('/',userController.getLogin)

router.get('/signupget',userController.getsignup)

router.post('/signup',userController.userSave)

router.get('/getHome',userController.homeFrond)

router.post('/loginVerify',userController.getHome)

router.get('/logout',userController.logoutPage)


module.exports = router
 
