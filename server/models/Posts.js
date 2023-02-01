const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({

    userId: {
        type: String,
        required: true

    },
    userImage: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    postDescription: String,
    postImage: String,
    likes: {
        type: Array,
        default: [],
    },
    comments: [{
        text: String,
        postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "users" }
    }
    ]

},
    { timestamps: true }
);

const Post = mongoose.model("posts", PostSchema);
module.exports = Post;
