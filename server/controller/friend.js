const Friends = require("../models/Friends");
const Register = require("../models/Register");



// Send Friend Request
const addFriendRequest = async (req, res) => {
    let friendsRequestValidate = {
        senderUserId: req.body.senderId,
        recipientUserId: req.body.recipientId,
    }

    // validate request one user can't send more one than request to same user.
    let validateFriendRequest = await Friends.find(friendsRequestValidate)
    if (validateFriendRequest.length > 0) {
        console.log("You cannot sent more request to same user")
        return res.status(408).json({ error: "you can't sent more request to same user" })
        // -------------------------------------------
    }
    else {

        let friendsRequestDetails = {
            status: 0,
            senderUserId: req.body.senderId,
            recipientUserId: req.body.recipientId,
        }

        let FriendsAdd = new Friends(friendsRequestDetails)
        let myfriendID = await FriendsAdd.save();
        res.json(myfriendID);
    }
};

// get friend request
const getFriendRequest = async (req, res) => {
    Friends.find({ recipientUserId: req.params.receiverid, status: 0 })
        .populate("senderUserId")
        .exec((err, result) => {
            if (err) {
                return res.status(409).json({ error: err })
            } else {
                console.log(result)
                res.json(result)
            }
        })
};

// accept friend request 
const acceptFriendRequest = (req, res) => {
    Friends.findByIdAndUpdate(req.body.requestId, {
        status: 1
    }, {
        new: true
    })
        .exec((err, result) => {
            if (err) {
                return res.status(409).json({ error: err })
            } else {

                console.log(result)
                updateFriendList(result.senderUserId, result.recipientUserId);
                // res.json(result)
            }
        })

    const updateFriendList = (senderID, recipientID) => {
        // Pushing Friend ID into Recipient Friends Array
        Register.findByIdAndUpdate(senderID, {
            $push: { friends: { friendID: req.body.requestId } }
        }, {
            new: true
        })

            .exec((err, result) => {
                if (err) {
                    return res.status(409).json({ error: err })
                } else {
                    console.log(result)
                    // res.json(result)
                }
            })

        // Pushing Friend ID into Recipient Friends Array
        Register.findByIdAndUpdate(recipientID, {
            $push: { friends: { friendID: req.body.requestId } }
        }, {
            new: true
        })

            .exec((err, result) => {
                if (err) {
                    return res.status(409).json({ error: err })
                } else {
                    console.log(result)
                    res.json(result)
                }
            })
    }
};

// remove/dismiss friend request
const deleteFriendRequest = (req, res) => {
    Friends.findByIdAndRemove(req.body.requestId)
        .exec((err, result) => {
            if (err) {
                return res.status(409).json({ error: err })
            } else {
                console.log(result)
                res.json(result)
            }
        })
};

//unfriend user 
const deleteUnfriendUser = async (req, res) => {
    const friend = await Friends.findOne({
        $or: [
            { senderUserId: req.body.currentuid, recipientUserId: req.body.recipientuid, status: 1 },
            { recipientUserId: req.body.currentuid, senderUserId: req.body.recipientuid, status: 1 },
        ]
    })

    Register.updateMany({
        $or: [
            { _id: req.body.currentuid },
            { _id: req.body.recipientuid }
        ]
    }, {
        $pull: { friends: { friendID: friend } }
    })
        .exec((err, result) => {
            if (err) {
                return res.status(409).json({ error: err })
            } else {
                console.log(result)
            }
        })

    Friends.findByIdAndDelete(friend)
        .exec((err, result) => {
            if (err) {
                return res.status(409).json({ error: err })
            } else {
                console.log(result)
                return res.json(result)
            }
        })

};


module.exports = { addFriendRequest, getFriendRequest, acceptFriendRequest, deleteFriendRequest, deleteUnfriendUser };