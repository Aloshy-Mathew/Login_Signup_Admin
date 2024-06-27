const { name } = require("ejs")
const userCollection = require("../model/userModel")

const Email = "admin123@gmail.com"
const Password = 123456

//to get into adminpage
const adminpage = async (req, res) => {
    try {
        if (req.session.admin) {

            res.redirect('/dashboard')
        } else {


            res.render("adminPage/adminlogin")


        }


    } catch (error) {
        console.log(error.message);
    }
}

const dashboasrdGetPage = async (req, res) => {

    try {
        if (req.session.admin) {

            if (req.session.search) {

                let userData = [];

                for (let i = 0; i < req.session.search.length; i++) {

                    const name = req.session.search[i].name;

                    const users = await userCollection.find({ name: { $regex: new RegExp(name, 'i') } }).exec()

                    userData = userData.concat(users);
                }

                console.log('userData: ', userData);

                req.session.search = null

                let newUser = req.session.save()

                res.render('adminPage/adminpannel', { userData })

            } else {

                const userData = await userCollection.find()


                res.render('adminPage/adminpannel', { userData })

            }
        } else {
            res.redirect('/adminlogin')
        }


    } catch (error) {
        console.log(error.message);
    }
}



//to login int adminpannel page
const adminCheck = async (req, res) => {

    try {
        console.log("enterig here");


        if (req.body.email == Email && req.body.password == Password) {

            req.session.admin = true

            res.redirect("/dashboard")
        }
        else {
            res.redirect("/adminlogin")
        }

    } catch (error) {
        console.log(error.message);
    }
}


//to Add newUSer into adminpannel
const addUserGet = async (req, res) => {
    try {
        console.log("Admin addinng user getting");
        const exsistingUser = await userCollection.findOne({ email: req.body.email })

        if (!exsistingUser) {
            const newUser = new userCollection({

                email: req.body.email,
                name: req.body.name,
                mobile: req.body.phone,
                password: req.body.password
            })

            await newUser.save()

            res.redirect("/dashboard")
        } else {

            res.redirect('/dashboard')
        }

    } catch (error) {
        console.log(error.message);
    }
}



// to logout from adminpannel page
const adminLogout = async (req, res) => {
    try {

        req.session.admin = false

        res.redirect('/adminlogin');


    } catch (error) {
        console.log(error.message);
    }
}

// redirect to edit page
const userEdit = async (req, res) => {
    try {
        console.log(req.query)
    } catch (error) {
        console.log(error.message);
    }
}

const editSubmit = async (req, res) => {
    try {
        const user = await userCollection.findOne({ _id: req.query.id })

        res.render('adminPage/adminUserEdit', { userData: user })



    } catch (error) {
        console.log(error.message);
    }
}
//update
const userupdateUser = async (req, res) => {
    console.log(req.params);
    const updateUser = await userCollection.updateOne({ _id: req.params.id }, {
        $set: {
            email: req.body.email,
            name: req.body.name,
            phone: req.body.phone,
        }

    })
    res.send({ success: true })
}
//search
const adminSearch = async (req, res) => {

    const name = req.body.search
    
    const searchedUsers = await userCollection.find({ name: { $regex: new RegExp(name, 'i') } });
    
    req.session.search = searchedUsers
 
    res.redirect("/dashboard")
}
//delete
const userDelete = async (req, res) => {
    try {
        const userId = req.query.id

        await userCollection.deleteOne({ _id: userId })

        res.send({ success: true })

    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    adminpage,
    adminCheck,
    adminLogout,
    addUserGet,
    dashboasrdGetPage,
    userupdateUser,
    userEdit,
    editSubmit,
    adminSearch,
    userDelete
}  