
const request = require("request");

const geocode = (address,callback) => {

    const geocodeUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiYXBpd2VhdGhlciIsImEiOiJja2s5ZDZpY3owd24xMndwODd5dXdqaDR6In0.jPTsX3pdULBYUfL-SdPcSw&limit=1";
    // encodeURIComponent makes special characters in address to a valid URL component format
    
    request({url:geocodeUrl, json:true}, (error,response) => {

        if(error){
            callback('Unable to connect to location service', undefined);//only fire callback function by sending only error message as astring
        }else if(response.body.features.length === 0){
            callback('Unable to find Location , Give a proper location', undefined);
        }else{
            callback(undefined, {

                longitude: response.body.features[0].center[0],
                lattitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode