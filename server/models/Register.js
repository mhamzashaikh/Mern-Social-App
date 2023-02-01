const mongoose = require("mongoose");

const RegisterSchema = new mongoose.Schema({
    fullname: String,
    email: String,
    password: String,
    countrycode: Number,
    phoneno: Number,
    imageUrl: String,
    friends: [{
      friendID: {type: mongoose.Schema.Types.ObjectId,ref: 'friends'}
    }]

    // friends:{
    //     type: Array,
    //     default:[]
    //   }
    // friend: [
    //     {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: 'friends'
    //     }
    // ]
})

const Register = mongoose.model("users", RegisterSchema);
module.exports = Register;