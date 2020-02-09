const express = require("express")
require("../db/mongoose")
const Device = require("../model/device")
const router = new express.Router();


router.post('/savedevice',async(req,res)=>{

    console.log(req.body)
    const device = new Device({
        ...req.body
    })
    try{
        await device.save();
    }catch(e){

        res.status().send(e);

    }
})
module.exports = router;