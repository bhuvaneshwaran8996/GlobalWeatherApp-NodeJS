const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')
const schema = new mongoose.Schema({
    DeviceName: {
     type: String,
        trim: true

    },
    DeviceId: {
        type: String,
        required:true
    },
     DeviceLat: {
        type: String
    },
    DeviceLon: {
        type: String
    },
    Tokens: [{
        token: {
            type:String,
            required:true
        },

    }],
    GPSPermitted: {
        type: Boolean
    },
})


// schema.pre("save", async function (next) {

//     const device = this;
//     if (!device.isModified()) {

//         next();
//     }
//     try {
//   const hashedLat = await bcrypt.hash(device.DeviceLat, 10);
//   const hashedLon = await bcrypt.hash(device.DeviceLon,10);
//         this.DeviceId = hashedpassword;

//         next()
//     } catch (e) {
//         return next(e)
//     }
// })

schema.methods.getAuthToken = async function(){
    const device = this;


    const _id = device._id.toString();
    const token = jwt.sign({id:_id},"thevudiya",{expiresIn:"1 week"})
    device.Tokens.push({
       token
    })
    
    await device.save();
    
    return token;
}
schema.statics.isDeviceAlreadyRegistered = async(DeviceId)=>{

   
    try{

    const device = await Device.findOne({DeviceId})

    if(!device){
        return 0
    }else{
        return 1
    }
    }catch(e){

        return e
    }


}
const Device = mongoose.model('Device', schema);

module.exports = Device;