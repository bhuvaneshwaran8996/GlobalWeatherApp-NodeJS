const request = require("request")
const dayforcast = require("./getday")
const currentarray = new Array();


const getcurrentforcast = (lat,lon,callback)=>{
    console.log(lat+","+lon)
    const url = "https://api.darksky.net/forecast/36841f8c8551ca523f6875f49adc7ea5/"+lat+","+lon;
 
    request({url:url,json:true}, function (error, response, body) {
     
  
        if(error){

      return  callback(response.statusCode+" "+response.statusMessage,undefined)
        }else if(body.currently.length === 0 || !body.currently){
           return callback("api data empty",undefined)

        }else{

          
           return callback(undefined,body.currently)
            //    if(body.currently.length > 0){
            //        console.log(body.currently.length)
            //     for(let i = 0 ; i < body.currently.length ;i++){
                    
                    
            //         const currentdata = {
            //             time:body.currently.time,
            //           summary:body.currently.summary,
            //           icon:body.currently.icon,
            //           nearestStromdistance:body.currently.nearestStromDistance,
            //           nearestStormBearing:body.currently.nearestStormBearing,
            //           precipIntensity:body.currently.precipIntensity,
            //           precipProbability:body.currently.precipProbability,
            //           temperture:body.currently.temperture,
            //           pressure:body.currently.pressure,
            //           humidity:body.currently.humidity,
            //           uvindex:body.currently.uvIndex,
            //           ozone:body.currently.ozone,
            //           windspeed:body.currently.windSpeed,
            //           dewpoint:body.currently.dewPoint,
            //           precipitation:body.currently.precipitation,  
            //       }
            //              currentarray.push(currentdata)
                 
            //   }
            //   return callback(undefined,currentarray)

            //    }else{
            //    return    callback("currently items not found "+body.currently.length,undefined)
            //    }

                
          
        }
        // callback(undefined,currentarray)
    });
    
}


module.exports.getcurrentforcast = getcurrentforcast;