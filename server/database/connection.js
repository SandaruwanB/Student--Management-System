const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config({path: "../config.env"});
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, {
    useNewUrlParser : true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("mongodb Connected");
});