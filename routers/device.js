const express = require("express");
require("../db/mongoose");
const bcrytp = require("bcryptjs");
const auth = require("../middleware/auth");
const Device = require("../model/device");
const router = new express.Router();

router.get("/getAllDevices", auth, async (req, res) => {
  try {
    const alldevices = await Device.find({});
    res.status(200).send(alldevices);
  } catch (e) {
    return res.send("error occured");
  }
});

router.get("/logout", auth, async (req, res) => {
  req.device.Tokens = req.device.Tokens.filter(token => {
    return req.token != token.token;
  });
  try {
    await req.device.save();
    res.status(200).send(req.device);
  } catch (e) {
    res.status(201).send("error logegd out");
  }
});
router.post("/checkdevice", async (req, res) => {
  console.log(req.body.DeviceId);
  try {
    const device = await Device.isDeviceAlreadyRegistered(req.body.DeviceId);

    if (device == 1) {
      res.status(200).send(String(1));
    } else {
      res.status(200).send(String(0));
    }
  } catch (e) {
    res.status(201).send(e);
  }
});

router.post("/login", async (req, res) => {
  const DeviceId = req.body.DeviceId;
  console.log(DeviceId);
  try {
    const logindevice = await Device.findOne({ DeviceId });
    const token = await logindevice.getAuthToken();

    // const responselogin = {
    //     DeviceName:logindevice.DeviceName,
    //     DeviceLat:logindevice.DeviceLat,
    //     DeviceLon:logindevice.DeviceLon,
    //     GPSPermitted:logindevice.GPSPermitted,
    //     _id:logindevice._id,
    //     DeviceId:logindevice.DeviceId,
    //     token

    // }
    res.status(200).send({
      DeviceName: logindevice.DeviceName,
      DeviceLat: logindevice.DeviceLat,
      DeviceLon: logindevice.DeviceLon,
      GPSPermitted: logindevice.GPSPermitted,
      _id: logindevice._id,
      DeviceId: logindevice.DeviceId,
      token
    });

    //
  } catch (e) {
    res.status(201).send("not logged in");
  }
});
router.get("/me", auth, async (req, res) => {
  res.status(200).send(req.device);
});

router.patch("/changeme", auth, async (req, res) => {
  const obj = Object.keys(req.body);
  const allowed = ["DeviceName", "DeviceId", "DeviceLat", "DeviceLon"];

  const isvalidoperation = obj.every(key => allowed.includes(key));

  if (!isvalidoperation) {
    return res.status(401).send();
  }

  try {
    allowed.forEach(each => {
      req.device[each] = req.body[each];
    });
    const devicepatched = await req.device.save();
    res.status(200).send(devicepatched);
  } catch (e) {
    res.status(201).send("error patch");
  }
});
router.post("/savedevice", async (req, res) => {
  console.log(req.body);
  try {
    const device = new Device(req.body);
    const token = await device.getAuthToken();

    await device.save();
    res.status(200).send({
      DeviceName: device.DeviceName,
      DeviceLat: device.DeviceLat,
      DeviceLon: device.DeviceLon,
      Premium: device.Premium,
      _id: device._id,
      DeviceId: device.DeviceId,
      token
    });
  } catch (e) {
    res.status(201).send("Device not saved");
  }
  //     try{
  //     const hashedpassword = await bcrytp.hash(req.body.DeviceId,10);
  //     await Device.findOne({DeviceId:hashedpassword},function(error,device){

  //         if(error){
  //             res.send("Device already registered")
  //             return;
  //         }
  //   } );
  //     }catch(e){
  //         res.send(e)
  //     }
  //     console.log(req.body)
  //     const device = new Device({
  //         ...req.body
  //     })
  //     try{
  //         await device.save();
  //         res.status(200).send(device)
  //     }catch(e){

  //         res.status().send(e);

  //     }
});
router.delete("/device/:id", auth, async (req, res) => {
  try {
    await Device.findByIdAndDelete({ _id: req.params.id });
    res.status(200).send("deleted ");
  } catch (e) {
    res.status(201).send("delete not performed");
  }
});
module.exports = router;
