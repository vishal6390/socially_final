const router = require("express").Router();
const Comment = require('../models/Comment')

router.post("/", async (req, res) => {
    // console.log(req.body)

    const {commentId} = req.body

    try {
        const allComments = await Comment.findOne({_id: commentId})
        const sortedAllComments = allComments.commentArray.sort((a, b) => {
            const dateA = new Date(a.time);
            const dateB = new Date(b.time);
            return dateB - dateA;
        });
        res.send({allComments: sortedAllComments})

    } catch(err) {
        console.log(err)
    }
})

module.exports = router