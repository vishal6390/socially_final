const router = require("express").Router();
const Post = require('../models/Post')

router.post("/", (req, res) => {
    const {id, caption, postPic, profilePic, username, current_time, newsLink} = req.body

    // console.log(req.body)

    // const current_time = Datae.now()
    const post = new Post({
        userId: id,
        profilePic: profilePic,
        caption: caption,
        postPic: postPic,
        username: username,
        current_time,
        newsLink
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