const Register = require("../models/Register");
const Friends = require("../models/Friends");



// PROFILE : Search User [ Partial Search ]
const getProfileUserDetails =  async (req, res) => {
    try {
        const reg = new RegExp("\\b(" + req.params.username + ")\\b", "gi");
        const searchUser = await Register.find({
            email: { $regex: reg },
        });
        res.json(searchUser);
    } catch (error) {
        res.json({ message: error });
    }
};



// SHOW THAT USERS ONLY WHO ARE NOT FRIENDS OR IN FRIEND REQUEST LIST. 
const getUserFriendList = async (req, res) => {
    const friendList = [req.params.currentuid];

    // Check who is friends or pending friend of current user
    let myFriend = await Friends.find({ $or: [{ senderUserID: req.params.currentuid }, { recipientUserId: req.params.currentuid }] });
    myFriend.map((currentVal, index) => {
        console.log("FIndinf:: ", currentVal.senderUserId)
        if (currentVal.senderUserId == req.params.currentuid) {
            friendList.push(currentVal.recipientUserId)

        }
        else {
            friendList.push(currentVal.senderUserId)
        }

    })
    console.log("OUTSIDE: ", friendList)

    // ------------------------------

    Register.find({
        _id: {
            $nin: friendList
        }
    })
        .exec((err, result) => {
            if (err) {
                return res.status(409).json({ error: err })
            } else {
                console.log(result)
                res.json(result)
            }
        })
};

// Search User [ Partial Search ]
const getSearchUserDetail =  async (req, res) => {
    try {
        const reg = new RegExp("\\b(" + req.params.key + ")\\b", "gi");
        const searchUser = await Register.find({
            $or: [
                { fullname: { $regex: reg } },
                { email: { $regex: reg } },
            ],
        });
        res.json(searchUser);
    } catch (error) {
        res.json({ message: error });
    }
};


module.exports = { getProfileUserDetails, getUserFriendList, getSearchUserDetail }

