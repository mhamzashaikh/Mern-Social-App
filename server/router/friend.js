const express = require("express");
const app = express();
const friend = require("../controller/friend");


// Send Friend Request
app.post('/', friend.addFriendRequest);

// get friend request
app.get('/:receiverid', friend.getFriendRequest);

// accept friend request 
app.put('/', friend.acceptFriendRequest);

// remove/dismiss friend request
app.delete('/dismiss', friend.deleteFriendRequest);

//unfriend user 
app.delete('/unfriend', friend.deleteUnfriendUser);


module.exports = app;
