const mongoose = require("mongoose");

const userDetailSchema = new mongoose.Schema(
    {
        uname:String,
        email:String,
        password:String,
    },
    {
        collection:"USerInfo",
    });

    mongoose.model("UserInfo", userDetailSchema);