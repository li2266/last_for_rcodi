
$("btn0").click(function(){
    $.ajax({ url:"https://www.ncdc.noaa.gov/cdo-web/api/v2/datasets", data:{}, headers:{ token:"uJyfzbXwRkdCwHtkROeIIpbrYVHnnPpA" }, success: function(result){
        $("#div1").html(result)
    }});
});



(function () { 
    
    document.getElementById("btn1").addEventListener("click", function () {
        alert("Try the Washington Square Park");
  
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
var zillowApiKey = 'put key here';
var climateUrl = 'https://www.ncdc.noaa.gov/cdo-web/api/v2/';
var zillowUrl = 'https://www.quandl.com/api/v3/datasets/ZILLOW/';
  
  
    });
})(); 