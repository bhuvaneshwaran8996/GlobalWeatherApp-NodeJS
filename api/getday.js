const request = require("request")
const dalilyarray = new Array();


const getdayforcast = (lat,lon,callback)=>{
    console.log(lat+","+lon)
    const url = "https://api.darksky.net/forecast/36841f8c8551ca523f6875f49adc7ea5/"+lat+","+lon;
 
    request({url:url,json:true}, function (error, response, body) {
     
   const  sum = body.daily.summary;
        if(error){

        callback(response.statusCode+" "+response.statusMessage,undefined,undefined)
        }else if(body.currently.length === 0){
            callback("api data empty",undefined,undefined)

        }else{
            
          

            for(let i = 0 ; i < body.daily.data.length ;i++){

               
                const dailydata = {
                    
                    time:body.daily.data[i].time,
                    summary:body.daily.data[i].summary,
                    icon:body.daily.data[i].icon,
                    sunriseTime:body.daily.data[i].sunriseTime,
                    sunsetTime:body.daily.data[i].sunsetTime,
                    moonphase:body.daily.data[i].moonPhase,
                    humidity:body.daily.data[i].humidity,
                    pressure:body.daily.data[i].pressure,
                    uvindex:body.daily.data[i].uvIndex,
                    ozone:body.daily.data[i].ozone,
                    windspeed:body.daily.data[i].windSpeed,
                    dewpoint:body.daily.data[i].dewPoint,
                    precipitation:body.daily.data[i].precipitation
            
   }
   dalilyarray.push(dailydata)
               
            }
            callback(undefined,dalilyarray,sum)
        }
    });
}


module.exports.getdayforcast = getdayforcast;