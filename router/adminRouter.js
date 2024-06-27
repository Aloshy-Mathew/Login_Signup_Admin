const express = require('express')

const adminRouter = express.Router()

const admincontroller = require('../controller/adminController')



adminRouter.get('/adminlogin',admincontroller.adminpage)
adminRouter.get('/dashboard',admincontroller.dashboasrdGetPage)
adminRouter.post('/adminLoginSave',admincontroller.adminCheck)
adminRouter.post('/adduser',admincontroller.addUserGet)
adminRouter.get('/userEdit1',admincontroller.userEdit)
adminRouter.get('/userEdit2',admincontroller.editSubmit)
adminRouter.put("/updateUser/:id",admincontroller.userupdateUser)


adminRouter.delete('/userDelete',admincontroller.userDelete)


adminRouter.post('/adminSearch',admincontroller.adminSearch)
adminRouter.get('/adminLogout',admincontroller.adminLogout) 

module.exports = adminRouter 