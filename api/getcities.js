const fetchUrl = require("fetch").fetchUrl;
const request = require("request");

const cities = new Array();

const getcitynamefromcoor = (name, callback) => {
  if (!name) {
    console.log("data are empty");
    callback("empty", undefined);
    return;
  }

  request(
    {
      url:
        "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
        name +
        ".json?access_token=pk.eyJ1IjoiYmh1dmFuZXNod2FyYW4iLCJhIjoiY2sycnUxeWRqMHI4eDNobDRpbXRiYTJvMiJ9.RV0FvJ3IO2Y-Plu4JpTE_Q",
      json: true
    },
    function(error, response, body) {
      if (error) {
        callback(error, undefined);
      } else if (!body.features || body.features.length === 0) {
        callback("coordinates not found", undefined);
      } else {
        if (cities.length > 0) {
          for (var i = cities.length; i > 0; i--) {
            cities.pop();
          }
        }

        for (let pos = 0; pos < body.features.length; pos++) {
          const city = {
            name: body.features[pos].text,
            place: body.features[pos].place_name,
            lat: body.features[pos].center[1],
            lon: body.features[pos].center[0]
          };

          cities.push(city);
        }

        callback(undefined, cities);
      }
    }
  );
};

module.exports.getcitynamefromcoor = getcitynamefromcoor;
