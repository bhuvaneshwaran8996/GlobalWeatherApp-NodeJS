const request = require("request")
const hourlyarray = new Array();


const gethourforcast = (lat,lon,callback)=>{
    console.log(lat+","+lon)
    const url = "https://api.darksky.net/forecast/36841f8c8551ca523f6875f49adc7ea5/"+lat+","+lon;
 
    request({url:url,json:true}, function (error, response, body) {
     
     

        if(error){

        callback(response.statusCode+" "+response.statusMessage,undefined,undefined)
        }else if(body.currently.length === 0){
            callback("api data empty",undefined,undefined)

        }else{
            
          

            for(let i = 0 ; i < body.hourly.data.length ;i++){

               
                const hourdata = {
                    
                    time:body.hourly.data[i].time,
                    summary:body.hourly.data[i].summary,
                    icon:body.hourly.data[i].icon,
                    temperature:body.hourly.data[i].temperature,
                    humidity:body.hourly.data[i].humidity,
                    pressure:body.hourly.data[i].pressure,
                    ozone:body.hourly.data[i].ozone,
                    windspeed:body.hourly.data[i].windSpeed,
                    visibility:body.hourly.data[i].visibility,
                    cloudcover:body.hourly.data[i].cloudCover

   }
   hourlyarray.push(hourdata)
               
            }
            callback(undefined,hourlyarray,body.hourly.summary,body.hourly.icon)
        }
    });
}



module.exports.gethourforcast = gethourforcast;