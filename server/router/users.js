const express = require("express");
const app = express();
const user = require("../controller/users");

// PROFILE : Search User [ Partial Search ]
app.get("/profile/:username", user.getProfileUserDetails); 

// SHOW THAT USERS ONLY WHO ARE NOT FRIENDS OR IN FRIEND REQUEST LIST. 
app.get("/allusers/:currentuid", user.getUserFriendList);

// Search User [ Partial Search ]
app.get("/search/:key", user.getSearchUserDetail );

module.exports = app ;