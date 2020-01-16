const express = require('express')
const citydata = require('../api/getcities')
const dailyforcast = require('../api/getday')
const hourlyforcast = require("../api/gethourly")
const currentforcast = require("../api/getcurrent")

//cwdfdfvfvdvr
var bodyParser = require('body-parser')

const app = express()


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
 
const port = process.env.PORT || 5000

app.get('/api/getcities',(req,res)=>{

    const city = req.query.address;
    citydata.getcitynamefromcoor(city,(error,data)=>{
     if(data === undefined){
            res.status(404).send(error)
                }else{
            res.send(data)
        }
    });

})

app.post('/api/getday',(req,res)=>{

  
    console.log(req.body)
    const lat = req.body.lat;
    const lon = req.body.lon;
    var reg = new RegExp("^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}");
    // if(!reg.exec(lat) && !reg.exec(lon)){

    //     return res.status(404).send("coordinates are invalid")
    // }
    dailyforcast.getdayforcast(lat,lon,(error,data,sumary)=>{

    
        let payload = {
            sumary:sumary,
            data:data
        }
        res.send(JSON.stringify(payload))

    })

});
app.post('/api/gethourly',(req,res)=>{

    const lat = req.body.lat;
    const lon = req.body.lon;
    hourlyforcast.gethourforcast(lat,lon,(error,data,sum,icon)=>{


        const payload = {

            sumary:sum,
            icon:icon,
            data:data
        }
        res.status(200).send(JSON.stringify(payload))

    })

});
 
app.post('/api/getcurrent',(req,res)=>{
    const lat = req.body.lat;
    const lon = req.body.lon;
    const currentlyarray = new Array();
   



    dailyforcast.getdayforcast(lat,lon,(error,data,sum)=>{

     const   sunrisetime = data[0].sunriseTime;
     const   sunsettime = data[0].sunsetTime;
       const moonphase = data[0].moonphase;
        currentforcast.getcurrentforcast(lat,lon,(error,data1)=>{

             const currentdata= {

                current:data1,
                sunrisetime:data[0].sunriseTime,
                sunsettime:data[0].sunsetTime,
                moonphase: data[0].moonphase
                
                
             }
             return res.send(currentdata)

        })
        
        
    });
    

})
app.listen(port,()=>{
    console.log("Port 5000 is running");
})

