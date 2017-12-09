var mydata = null;

$(document).ready(function callback(){
    $("#btn").click( function () {
        alert("Retrieving Data");
        $.ajax({
            url: "https://api.weather.gov/points/40.7291,-73.9965/forecast",
            
            data:{}, 
            
          
            success:function(data){
               console.log(data.properties.periods); //put a number in brackets after results to get a specific data part//
              // result= $(data.properties.periods).find("#temperature");
               mydata = data; //mydata is variable// 
               //validateResult(mydata);
              
                  
                
               return mydata;  
                
                
               
           // var obj = JSON.parse(mydata);
            //for (var i = 0; i<44; i++) {
              //  var dataLine= [];
                //dataLine.push(json.data[i][0]);
             
          
            }});
        });

    });
    


$('#btn').click(function() {
  $('#weather').toggle('slow', function() {
    // Animation complete.
  });
});
    




//"https://api.weather.gov/points/"+"40.4247,-86.911"+"/forcast",
//different endpoints you can put on instead of "/forcast"

//<img src="url for icon"
//would have to change value of element of image

//old url "https://www.ncdc.noaa.gov/cdo-web/api/v2/locations",

//headers:{ 
               // token:"nZyWesNgmnHkQYKQsvkCArBxFODJktsv" 
               
               
               
               
var price = null;
         $.ajax({
            url: "https://catalog.data.gov/harvest/object/1829af4a-6836-4309-a685-a41e8bfb9a6a",
            data:{}, 
            
            success:function(data){
               console.log(data); //put a number in brackets after results to get a specific data part//
              // result= $(data.properties.periods).find("#temperature");
               price = data;  
               //validateResult(mydata);
                
               return price;  
               
            }
         });
         
         
var safety = null;
         $.ajax({
            url: "https://catalog.data.gov/harvest/object/c921adf3-4262-4f08-a7c4-cbf198c9d4d4",
            data:{}, 
            
            success:function(data){
               console.log(data); //put a number in brackets after results to get a specific data part//
              // result= $(data.properties.periods).find("#temperature");
               safety = data;  
               //validateResult(mydata);
                
               return safety;  
               
            }
         });
