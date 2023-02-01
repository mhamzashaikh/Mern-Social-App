const express = require("express");
const app = express();
const post = require("../controller/post");


// Add Post
app.post('/add', post.addPost);

// Get All Posts
app.get('/get/all', post.getAllPost );

// Get user post only for profile section -- get feed 
app.get('/getposts/:userid', post.getUserPost);

// Add users who like the post
app.put('/like', post.addLikePost );

// Remove that users who unlike the post
app.put('/unlike', post.addUnlikePost);

// Likes count of the post
app.get('/likecount/:postid', post.getPostLikesCount);

// Add Comments to the Post 
app.put('/addcomment', post.addCommentPost);

// Getting comment details of the user who comment on specific post
app.get('/comment/:postid', post.getUserDetailsWhoComments)


module.exports = app ;
