const router = require("express").Router();
const Comment = require('../models/Comment')

router.post("/", (req, res) => {
    const {commentId, comment, time, senderUsername, senderImage} = req.body

    Comment.findOne({_id: commentId}, async (err, result) => {
        if(result){
            await result.updateOne({$push:{commentArray:{comment, time, senderUsername, senderImage}}})
            res.send({message: "Commented successfully"})
        }else{
            // console.log("Error Occured")
            res.send({message: "Error Occured"})
        }
    })
})

module.exports = router