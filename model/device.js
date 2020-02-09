const mongoose = require("mongoose");




const schema = new mongoose.Schema({


    DeviceName:{

        
        type:String,
        trim:true
        
    },
    DeviceId:{
        type:String,
       
    },


    DeviceLat:{
        type:String
    },

    DeviceLon:{
        type:String
    },
    
 
    Tokens:[{
        token:String,
        
    }],

    GPSPermitted:{
        type:Boolean
    },


})


const Device = mongoose.model('Device',schema);

module.exports = Device;