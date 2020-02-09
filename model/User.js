const mongoose = require("mongoose");


const User = mongoose.model('Mobile',{

    AndroidId:{
        type:String
    },
    Subscription:{
        type:String
    },
    PaymentDonate:{
        type:String
    },
    PushToken:{
        type:String
    },
    Permitted:{
        type:Boolean
    },
    Lat:{
        type:String
    },
    Lon:{
        type:String
    }



});

module.exports = User;