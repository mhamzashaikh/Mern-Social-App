const mongoose = require('mongoose');

const FriendSchema = new mongoose.Schema({
    status: Number,  // 0 for friend request sent, 1 for friends 
    senderUserId:  {type: mongoose.Schema.Types.ObjectId, ref:"users", required: true },
    recipientUserId: {type: mongoose.Schema.Types.ObjectId, ref:"users", required: true}
})

const Friends = mongoose.model("friends", FriendSchema);
module.exports = Friends;