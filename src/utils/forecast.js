const request = require('request');

const forecast =(lat,long,callback) => {
    const url = 'https://api.weatherbit.io/v2.0/current?lat='+lat+'&lon='+long+'&key=274cc2fc5fbf4c45ba36e5a5ff9b1a3d&include=currently';

    request({url:url, json:true},(error,response) =>{

        if(error){
            callback('Unable to connect to location service', undefined);
        }else if(response.body.error){
    
            callback('Unable to find Location , Give a proper location', undefined);
        }else{
            
            const dORn= function (dn)  {
                
                if(dn ==='d'){
                    return 'Day';}
                else{
                    return 'Night';}
            }

            callback(undefined, 'The relative humidity is '+response.body.data[0].rh+' % , Temperature is '+response.body.data[0].temp+' in Celcius , This is '+ dORn(response.body.data[0].pod) +' outside.');
        }
    })
    

}

module.exports = forecast;