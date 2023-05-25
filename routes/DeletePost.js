const router = require("express").Router();
const Post = require('../models/Post')

router.post("/", async (req, res) => {

    const {postId} = req.body
    try{
        await Post.remove({_id: postId})
        res.send({message: "Post deleted successfully"})
    } catch (err) {
        res.send({message: "Error Occurred"})
    }
    
})

module.exports = router