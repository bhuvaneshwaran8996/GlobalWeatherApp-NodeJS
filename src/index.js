const express = require('express')
const  bodyParser = require('body-parser');

app.use((req,res,next)=>{

    res.send("side down")
})
const devicerouter = require("../routers/device")
const paymentrouter = require("../routers/payment")
const weatherrouter = require("../routers/weather")

const app = express()
// app.use((req,res,next)=>{

//     res.send("qasasa")
// });
// app.use(bodyParser.json())
app.use(bodyParser.json())
app.use(devicerouter)
app.use(weatherrouter)


 
const port = process.env.PORT || 10000



app.use((req,res,next)=>{

    console.log(req.path+" "+req.params);
    next()

})
app.listen(port,()=>{ 
    console.log(port+" port is running");
})

