const router = require("express").Router();
const Post = require('../models/Post')
const User = require('../models/User')

router.post("/", async (req, res) => {

    const user = await User.findOne({_id: req.body.id})
    const myPostsArray = await Post.find({userId:req.body.id})

    const myP = myPostsArray.sort((a, b) => {
        const dateA = new Date(a.current_time);
        const dateB = new Date(b.current_time);
        return dateB - dateA;
    });

    let allPosts = []

    for(var i=0;i<user.friends.length;i++){
        const friendId = user.friends[i]
        const OneFriendPostArray = await Post.find({userId: friendId})
        allPosts = [...allPosts, ...OneFriendPostArray]
    }
    const allP = allPosts.sort((a, b) => {
        const dateA = new Date(a.current_time);
        const dateB = new Date(b.current_time);
        return dateB - dateA;
    });
    // for(let i=0;i<allP.length;i++) {
    //     console.log(allP[i].current_time)
    // }
    res.send({message: "request users fetched success", postsArray: allP, myPostsArray: myP})

})

module.exports = router