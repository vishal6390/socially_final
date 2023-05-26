const router = require("express").Router();
const User = require('../models/User')

const nodemailer = require('nodemailer')

const sendVerifyMail = async (name, email, user_id) => {
    try {

        let EMAIL = process.env.EMAIL
        let PASSWORD = process.env.PASSWORD

        let config = {
            service : 'gmail',
            auth : {
                user: EMAIL,
                pass: PASSWORD
            }
        }

        let transporter = nodemailer.createTransport(config);

        let message = {
            from : EMAIL,
            to : email,
            subject: "For Verification Mail",
            html: '<p>Hi '+name+' , Please click here to <a href="http://localhost:9002/api/verifyMail?id='+user_id+'"> Verify </a> your mail.</p>'
        }
        transporter.sendMail(message)
    } catch (err) {
        console.log(err)
    }
}

router.post("/", async (req, res) => {

    const {username, email, password, age, dob, profilePic} = req.body

    User.findOne({email: email}, (err, user) => {
        if(user){
            res.send({message: "User Already Registered goto login page"})
        }else{
            const user = new User({
                username,
                email,
                password,
                age,
                dateOfBirth: dob,
                profilePic
            })
        
            const saveUser = async() => {
                const userData = await user.save()
                sendVerifyMail(username, email, userData._id)
            }
            res.send({message: "success"})
            saveUser()

        }
    })
})

module.exports = router