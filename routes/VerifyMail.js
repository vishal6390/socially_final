const router = require("express").Router();
const User = require('../models/User')

router.get("/", async (req, res) => {

    try {
        await User.updateOne({_id: req.query.id}, {$set: {isVerified: true}})
        res.send("Email Verified successfully")
    } catch(err) {
        console.log(err)
    }
    
})

module.exports = router