const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const loginRoute =  require("./routes/Login")
const registerRoute =  require("./routes/Register")
const getUserRoute =  require("./routes/GetUser")
const addInfoRoute = require("./routes/AddInfo")
const getFilteredDataRoute = require("./routes/GetFilteredData")
const connectUpdateRoute = require("./routes/ConnectUpdate")
const getRequestUserRoute = require("./routes/GetRequestUser")
const friendArrayUpdateRouteC = require('./routes/FriendArrayUpdateC')
const friendArrayUpdateRouteR = require('./routes/FriendArrayUpdateR')
const getFriendsRoute = require('./routes/GetFriends')
const createPostRoute = require('./routes/CreatePost')
const getAllPostsRoute = require('./routes/GetAllPosts')
const updateLikeRoute = require('./routes/UpdateLike')
const saveChatMessageRoute = require('./routes/SaveChatMessage')
const getAllChatsRoute = require('./routes/GetAllChats')
const deletePost = require('./routes/DeletePost')
const verifyMail = require('./routes/VerifyMail')

const app = express()
const cors = require('cors');

app.use(express.json())
app.use(express.urlencoded())
app.use(cors())
dotenv.config()

const PORT =  9002

app.listen(PORT, () => {
    console.log("Backend running")
})

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB...'))
.catch((err) => console.error("Coudn't connect MongoDB....", err));

app.use("/api/login", loginRoute)
app.use("/api/register", registerRoute)
app.use("/api/user", getUserRoute)
app.use("/api/addInfo", addInfoRoute)
app.use("/api/getFilteredData", getFilteredDataRoute)
app.use("/api/connectUpdate", connectUpdateRoute)
app.use('/api/getRequestUser', getRequestUserRoute)
app.use('/api/getFriends', getFriendsRoute)
app.use('/api/friendArrayUpdate/currentUserUpdate', friendArrayUpdateRouteC)
app.use('/api/friendArrayUpdate/requestUserUpdate', friendArrayUpdateRouteR)
app.use('/api/createPost', createPostRoute)
app.use('/api/getAllPosts', getAllPostsRoute)
app.use('/api/updateLike', updateLikeRoute)
app.use('/api/saveChatMessage', saveChatMessageRoute)
app.use('/api/getAllChats', getAllChatsRoute)
app.use('/api/deletePost', deletePost)
app.use('/api/verifyMail', verifyMail)

