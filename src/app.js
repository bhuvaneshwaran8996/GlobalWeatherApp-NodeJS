const express = require('express')
const app = express()
 
const Port = process.env.PORT || 3000
app.get('/otha', function (req, res) {
  res.send('Hello World')
})
 
app.listen(Port,()=>{
    console.log("Port 3000 is running");
})