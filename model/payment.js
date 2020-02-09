const mongoose = require("mongoose");

const schema = new mongoose.Schema({


  
    Subscribed:{
        type:Boolean,
        default:false
        
    },
    donated:{

        type:String
    }






})
const Payment = new mongoose.model("Payment",schema);

module.exports = Payment;