const mongoose = require("mongoose");
const uri = "ADD your Connection Link here";

function main() {
    // try { 
    //     mongoose.set("strictQuery", false);

    //     const x = mongoose.connect(uri);
    //     console.log("Connected", x);
    // }
    // catch (error) {
    //     console.log("ERROR: ", error);
    // }
    mongoose.connect(uri).then(() => {
        console.log("Succesfull")
    
    }).catch((err) => {
        console.log("Error: ", err)
    })
}

module.exports = { main };