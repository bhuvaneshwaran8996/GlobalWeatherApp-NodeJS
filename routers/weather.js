const express = require("express");
const citydata = require("../api/getcities");
const dailyforcast = require("../api/getday");
const hourlyforcast = require("../api/gethourly");
const currentforcast = require("../api/getcurrent");
const auth = require("../middleware/auth");
const router = new express.Router();

router.get("/api/getcities", auth, (req, res) => {
  const city = req.query.address;
  console.log(city);
  citydata.getcitynamefromcoor(city, (error, data) => {
    if (data === undefined) {
      res.status(404).send(error);
    } else {
      res.send(data);
    }
  });
});

router.post("/db/signup", (req, res) => {
  console.log(req.body);

  //    signup.signupuser(req.body,(error,response)=>{

  //     if(error){
  //         return res.send(error)
  //     }

  //     return res.send(response)
  //    })
});

router.post("/api/getday", auth, (req, res) => {
  console.log(req.body);

  if (req.body == undefined) {
    res.send("undefined");
  }
  const lat = req.body.lat;
  const lon = req.body.lon;
  const lang = req.body.lang;

  //    var reg = new RegExp("^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}");
  //     if(!reg.exec(lat) && !reg.exec(lon)){

  //         return res.status(404).send("coordinates are invalid")
  //     }
  dailyforcast.getdayforcast(lat, lon, lang, (error, data, sumary) => {
    let payload = {
      sumary: sumary,
      data: data
    };
    res.send(JSON.stringify(payload));
  });
});
router.post("/api/gethourly", auth, (req, res) => {
  const lat = req.body.lat;
  const lon = req.body.lon;
  const lang = req.body.lang;
  hourlyforcast.gethourforcast(lat, lon, lang, (error, data, sum, icon) => {
    const payload = {
      sumary: sum,
      icon: icon,
      data: data
    };
    res.status(200).send(JSON.stringify(payload));
  });
});

router.post("/api/getcurrent", auth, (req, res) => {
  const lat = req.body.lat;
  const lon = req.body.lon;
  const lang = req.body.lang;
  console.log(req.body);
  const currentlyarray = new Array();

  dailyforcast.getdayforcast(lat, lon, lang, (error, data, sum) => {
    //  const   sunrisetime = data[0].sunriseTime;
    //  const   sunsettime = data[0].sunsetTime;
    //    const moonphase = data[0].moonphase;
    currentforcast.getcurrentforcast(lat, lon, lang, (error, data1) => {
      if (error) {
        return res.status(201).send(error);
      }
      const currentdata = {
        current: data1,
        sunrisetime: data[0].sunriseTime,
        sunsettime: data[0].sunsetTime,
        moonphase: data[0].moonphase
      };
      return res.send(currentdata);
    });
  });
});

module.exports = router;
