const router = require("express").Router();
const Post = require('../models/Post')

router.post("/", async (req, res) => {
    // res.send("My Api login")

    const {postId, userId} = req.body
    console.log(postId, userId)

    try {
        const post = await Post.findOne({_id: postId})

        if(post.likes.length > 0 && post.likes.includes(userId) === true){
            await post.updateOne({$pull:{likes:userId}})
            .then(i => {
                let length = post.likes.length
                res.send({length: length-1})
            })
        }else{
            await post.updateOne({$push:{likes:userId}})
            .then(i => {
                console.log("hi")
                let length = post.likes.length
                res.send({length: length+1})
            })
        }
    } catch (error) {
        console.log(error)
    }
})

module.exports = router