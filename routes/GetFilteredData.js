const router = require("express").Router();
const User = require('../models/User')

router.post("/", (req, res) => {
    // res.send("My Api login")

    const {searchQuery} = req.body
    User.find({username : {$regex : new RegExp('^' + searchQuery, 'i')}}, (err, user_array) => {
        res.send({message: "get user filtered data Successfully", res_user: user_array})
    })


})

module.exports = router