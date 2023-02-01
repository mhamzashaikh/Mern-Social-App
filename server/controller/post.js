const Post = require("../models/Posts");

// Add Post
const addPost = async (req, res) => {
    const addPost = await new Post({
        userId: req.body.userId,
        userImage: req.body.userImage,
        fullName: req.body.fullname,
        postDescription: req.body.postDescription,
        postImage: req.body.postImage,
    })
    addPost.save((err, result) => {

        if (err) {
            console.log(err);
            res.status(402).send(err);
        }
        else {
            console.log(result);
            res.status(200).send(result);
        }
    })

};

// Get All Posts
const getAllPost = async (req, res) => {
    const findAllPosts = await Post.find().sort({ '_id': -1 });  // -1 for descending;
    res.json(findAllPosts);
};


// Get user post only for profile section -- get feed 
const getUserPost = async (req, res) => {
    const findUserPost = await Post.find({ userId: req.params.userid }).sort({ '_id': -1 });  // -1 for descending
    res.json(findUserPost);
};

// Add users who like the post
const addLikePost = async (req, res) => {
    const post = await Post.findOne({ _id: req.body.postId }) // find post 

    const userAlreadyLikedPost = post.likes.includes(req.body.userId);
    if (!userAlreadyLikedPost) {
        post.likes.push(req.body.userId);
        const likedPost = await post.save();
        res.json(likedPost);
    }
    else {
        console.log("You've already liked the post!")
        res.status(500).send("You've already liked the post!");
    }
};

// Remove that users who unlike the post
const addUnlikePost = (req, res) => {
    Post.findByIdAndUpdate(req.body.postId, {
        $pull: { likes: req.body.userId }
    }, {
        new: true
    }).exec((err, result) => {
        if (err) {
            return res.status(408).json({ error: err })
        } else {
            res.json(result)
        }
    })
};

// Likes count of the post
const getPostLikesCount = async (req, res) => {
    const post = await Post.findOne({ _id: req.params.postid });
    res.json({
        "postId": req.params.postid,
        "likes": post.likes.length,
    })
};

// Add Comments to the Post 
const addCommentPost = (req, res) => {
    const comment = {
        text: req.body.text,
        postedBy: req.body.postedBy
    }
    console.log("BODY: ", req.body)
    Post.findByIdAndUpdate(req.body.postId, {
        $push: { comments: comment }
    }, {
        new: true
    })
        .populate("comments.postedBy", "_id fullname")
        .exec((err, result) => {
            if (err) {
                return res.status(409).json({ error: err })
            } else {
                console.log(result)
                res.json(result)
            }
        })

};

// Getting comment details of the user who comment on specific post
const getUserDetailsWhoComments = async (req, res) => {
    const post = await Post.findOne({ _id: req.params.postid }).populate("comments.postedBy")
    res.json(post);
};

module.exports = { addPost, getAllPost, getUserPost, addLikePost, addUnlikePost, getPostLikesCount, addCommentPost, getUserDetailsWhoComments };

