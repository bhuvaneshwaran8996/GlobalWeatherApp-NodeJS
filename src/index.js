const express = require('express')
const  bodyParser = require('body-parser');


const devicerouter = require("../routers/device")
const paymentrouter = require("../routers/payment")
const weatherrouter = require("../routers/weather")

const app = express()
// app.use((req,res,next)=>{

//     res.send("qasasa")
// });
// app.use(bodyParser.json())
const port = process.env.PORT;
app.use(bodyParser.json())
app.use(devicerouter)
app.use(weatherrouter)
 

 




app.use((req,res,next)=>{

    console.log(req.path+" "+req.params);
    next()

})
app.listen(port,()=>{ 
    console.log(port+" port is running");
})

