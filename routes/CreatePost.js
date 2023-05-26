const router = require("express").Router();
const Post = require('../models/Post')
const Comment = require('../models/Comment')

router.post("/", async (req, res) => {
    const {id, caption, postPic, profilePic, username, current_time, newsLink} = req.body

    const comment = new Comment({commentArray: []})
    const savedComment = await comment.save()

    

    const post = new Post({
        userId: id,
        profilePic: profilePic,
        caption: caption,
        postPic: postPic,
        username: username,
        current_time,
        newsLink,
        commentId: savedComment._id
    })

    try {
        post.save(err => {
            if(err){
                res.send(err)
            }else{
                res.send({message: "Successfully Posted"})
            }
        })
    } catch (err) {
        // console.log(err)
    }
})

module.exports = router