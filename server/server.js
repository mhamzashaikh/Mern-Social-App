const express = require("express");
const { main } = require("./models/index");
const usersRoute = require("./router/users");
const postRoute = require("./router/post");
const friendRoute = require("./router/friend");
const cors = require('cors')
const app = express();
main();

const port = 5000;


app.use(express.json());
app.use(cors());

app.use("/api/users", usersRoute);
app.use("/api/post", postRoute);
app.use("/api/friend", friendRoute);




// ------------- Signin -------------- 
let userAuthCheck;
app.post("/api/login", async (req, res) => {
    console.log(req.body)
    // res.send("hi");
    try {
        const user = await Register.findOne({
            email: req.body.email,
            password: req.body.password
        })
        console.log("USER: ", user);
        if (user) {
            res.send(user);
            userAuthCheck = user;

        } else {
            res.status(401).send("Invalid Credentials");
            userAuthCheck = null;

        }
    }
    catch (error) {
        console.log(error);
        res.send(error);
    }
});


// Getting User Details of login user 
app.get("/api/login", (req, res) => {

    res.send(userAuthCheck);

});
// ------------------------------------


// ----------- Signup ------------------
app.post("/api/register", (req, res) => {
    console.log(req.body);

    let registerUser = new Register({
        fullname: req.body.fullname,
        email: req.body.email,
        password: req.body.password,
        countrycode: req.body.countrycode,
        phoneno: req.body.phoneno,
        imageUrl: req.body.imageUrl,
    })

    registerUser.save((err, result) => {

        if (err) {
            res.status(402).send(err);


        }
        else {
            res.status(200).send(result);
        }
    })
});

// ----------------------------


app.listen(port, () => {
    console.log("Server is live");
});


