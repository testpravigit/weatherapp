
var weatherInfoObj ={};


window.addEventListener('load',()=>{
    var lat,long;
    var country,locationKey,timeZone,locationName;
    navigator.geolocation.getCurrentPosition((position)=>{
    lat=position['coords']['latitude'];
    long=position['coords']['longitude']
    console.log(lat+" "+long);
    


    var apikey='OMC4hksusmvuiyJzYGivQqqGzhHup4b7';
    var geopositionurl=`http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${apikey}&q=${lat},${long}`;
    
     axios.get(geopositionurl).then((response)=>{
        geopositionurl.header('Access-Control-Allow-Origin','http://127.0.0.1:5500')


        console.log(response);

       

        weatherInfoObj['country']=response.data.Country.EnglishName;
        weatherInfoObj['locationKey']=response.data.Key;
        weatherInfoObj['timeZone']=response.data.TimeZone;
        weatherInfoObj['locationName']=response.data.EnglishName;

        getWeatherData(apikey,weatherInfoObj.locationKey)
        console.log(weatherInfoObj)
      

     })
   })
})

function getWeatherData(apikey,LocationKey){
   
    var weatherUrl=`http://dataservice.accuweather.com/forecasts/v1/daily/1day/${LocationKey}?apikey=${apikey}`
    axios.get(weatherUrl).then((response)=>{
        console.log(response)
         weatherInfoObj['today']=response.data.DailyForecasts[0].Date;
         weatherInfoObj['day']=response.data.DailyForecasts[0].Day;
         weatherInfoObj['night']=response.data.DailyForecasts[0].Night;
         weatherInfoObj['temperature']=response.data.DailyForecasts[0].Temperature;
         console.log('weatherInfoObj',weatherInfoObj)
         var today=new Date( weatherInfoObj['today']);

         returnId('country').textContent = 'country :'+weatherInfoObj['country'];
         returnId('location').textContent = 'location :'+weatherInfoObj['locationName'];
         returnId('date').textContent = 'date :'+today.getDate()+"-"+today.getMonth()+"-"+today.getFullYear();
         
        if(weatherInfoObj.day.Icon<10){
            returnId('morning').setAttribute('src',`https://developer.accuweather.com/sites/default/files/0${weatherInfoObj.day.Icon}-s.png`)
        }
        else{
            returnId('morning').setAttribute('src',`https://developer.accuweather.com/sites/default/files/${weatherInfoObj.day.Icon}-s.png`)

        }
        if(weatherInfoObj.night.Icon<10){
            returnId('night').setAttribute('src',`https://developer.accuweather.com/sites/default/files/0${weatherInfoObj.night.Icon}-s.png`)
        }
        else{
            returnId('night').setAttribute('src',`https://developer.accuweather.com/sites/default/files/${weatherInfoObj.night.Icon}-s.png`)

        }
        returnId('mrn-des').textContent ='[day]-'+ weatherInfoObj.day.IconPhrase;
        returnId('nig-des').textContent = '[night]-'+weatherInfoObj.night.IconPhrase;
        

    })
    
   
}
function returnId(id){
    return document.getElementById(id);
}
 