const router = require("express").Router();
const User = require('../models/User')

router.post("/", (req, res) => {
    // res.send("My Api login")

    const {email, password} = req.body
    User.findOne({email: email}, (err, user) => {
        if(user){
            if(password === user.password){
                res.send({message: "Login Successfully", user: user})
                // console.log("login Success")
            }else{
                res.send({message: "Password not matched", email: ""})
                // console.log("Password not matched")
            }
        }else{
            res.send({message: "User not found", email: ""})
            // console.log("User not found")
        }
    })

})

module.exports = router