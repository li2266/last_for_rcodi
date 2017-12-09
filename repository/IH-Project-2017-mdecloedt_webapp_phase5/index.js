
$("btn0").click(function(){
    $.ajax({ url:"https://www.ncdc.noaa.gov/cdo-web/api/v2/datasets", data:{}, headers:{ token:"uJyfzbXwRkdCwHtkROeIIpbrYVHnnPpA" }, success: function(result){
        $("#div1").html(result)
    }});
});



(function () { 
    
    document.getElementById("btn1").addEventListener("click", function () {
        alert("Try the Washington Square Park or Central Park");
  
    });
})(); 
 
 
 (function () { 
    
    document.getElementById("btn2").addEventListener("click", function () {
        alert("Try the AMC Kips Bay 15");
  
    });
})(); 
   
   
   (function () { 
    
    document.getElementById("btn3").addEventListener("click", function () {
        alert("Try the Whitney Museum of American Art");
  
  
var climateApiKey = 'put key here';
//var zillowApiKey = 'put key here';
var climateUrl = 'https://www.ncdc.noaa.gov/cdo-web/api/v2/';
//var zillowUrl = 'https://www.quandl.com/api/v3/datasets/ZILLOW/';



function getWeather(city, callback) {
  var url = 'http://api.openweathermap.org/data/2.5/weather?q=New+York,US&appid=51a4693d2600750a5644ac53c9e265df&units=imperial';
  $.ajax({
    dataType: "jsonp",
    url: url,
    jsonCallback: 'jsonp',
    data: { q: city },
    cache: false,
    success: function (data) {
        data.city = city;
        callback(data);
    }
  });
}  
  
    });
})(); 