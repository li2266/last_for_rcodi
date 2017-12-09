//Safety Data (crime)//    
var crime = null;
         $.ajax({
            url: "https://data.cityofnewyork.us/api/views/3h6b-pt5u/rows.json?accessType=DOWNLOAD",
            //"https://catalog.data.gov/harvest/object/1829af4a-6836-4309-a685-a41e8bfb9a6a",
            data:{}, 
            
            success:function(data){
               console.log(data); //put a number in brackets after results to get a specific data part//
              // result= $(data.properties.periods).find("#temperature");
               crime = data;  
               //validateResult(mydata);
                
               return crime;  
               
            }
         }); 
         
    

//var mydata = null;

//$(document).ready(function callback(){
   // $("#btn").click( function () {
      //  alert("Retrieving Data");
        //$.ajax({
          //  url: "https://api.weather.gov/points/40.7291,-73.9965/forecast",
            
            //data:{}, 
            
          
            //success:function(data){
              // console.log(data.properties.periods); //put a number in brackets after results to get a specific data part//
              // result= $(data.properties.periods).find("#temperature");
             //  mydata = data; //mydata is variable// 
               //validateResult(mydata);
              
                  
                
       //        return mydata;  
            
                
               
           // var obj = JSON.parse(mydata);
            //for (var i = 0; i<44; i++) {
              //  var dataLine= [];
                //dataLine.push(json.data[i][0]);
             
          
  //          }});
    //    });

//    });

//Required Climate Data//
function weather(){
    var weatherURL = 'https://api.weather.gov/points/40.7291,-73.9965/forecast';
$.ajax({
    type: 'GET',
    url: weatherURL,
    responseType: 'json',
    
 success: function(weather) {
     console.log(JSON.stringify(weather, null, 4));
    // result = $(weather.properties.periods);
     //weatherdata = result;
     var panel = document.querySelector(".panel-body");
     var myp = document.createElement('p');
     var weatherdatastats = weather.properties.periods[0].detailedForecast;
     //var weatherimg = weather.properties.periods[0].icon;// work on later if time
     console.log(JSON.stringify(weather.properties.periods[0]));
     console.log(JSON.stringify(weatherdatastats));
     myp.textContent =  weatherdatastats;
     panel.appendChild(myp);

 }
    });
       
}
//console.log(weather);
//weatherdata=result;

//Safety Data (crime)//
function safety(){
    var safetyURL = 'https://data.ny.gov/api/views/4kp7-7jt3/rows.json?accessType=DOWNLOAD';
$.ajax({
    type: 'GET',
    url: safetyURL,
    responseType: 'json',
    
 success: function(safety) {
     console.log(JSON.stringify(safety, null, 4));
    // result = $(weather.properties.periods);
     //weatherdata = result;

 }
    });
    
}


/*var svgContainer = d3.select("body").append("svg")
                                     .attr("width", 200)
                                     .attr("height", 200);
 
 //Draw the Circle
 var circle = svgContainer.append("circle")
                          .attr("cx", 30)
                          .attr("cy", 30)
                          .attr("r", 20);   


*/
         

//"https://api.weather.gov/points/"+"40.4247,-86.911"+"/forcast",
//different endpoints you can put on instead of "/forcast"

//<img src="url for icon"
//would have to change value of element of image

//old url "https://www.ncdc.noaa.gov/cdo-web/api/v2/locations",

//headers:{ 
               // token:"nZyWesNgmnHkQYKQsvkCArBxFODJktsv" 
               
               
               
//Housing Affordability Data//               
var price = null;
         $.ajax({
            url: "https://catalog.data.gov/harvest/object/1829af4a-6836-4309-a685-a41e8bfb9a6a",
            //"https://catalog.data.gov/harvest/object/1829af4a-6836-4309-a685-a41e8bfb9a6a",
            data:{}, 
            
            success:function(data){
               console.log(data); //put a number in brackets after results to get a specific data part//
              // result= $(data.properties.periods).find("#temperature");
               price = data;  
               //validateResult(mydata);
                
               return price;  
               
            }
         }); 


//Pie Chart//         
//margin and radius
var margin = {top:20, right:20, bottom:20, left:20},
    width = 500 - margin.right - margin.left,
    height = 500 - margin.top - margin.bottom,
    radius = width/2;
    
var color = d3.scaleOrdinal()
    .range(["#FF5733", "#33DBFF", "#DAF7A6", "#FFC300", "#C70039", "#8CA5AF"]);
    
//arc generator
var arc = d3.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);
    
var labelArc = d3.arc()
    .outerRadius(radius - 50)
    .innerRadius(radius - 50);

//pie generator    
var pie = d3.pie()
    .sort(null)
    .value(function(d) {return d.percent; });
    
//define svg
var svg = d3.select("body").append("svg")
    .attr("width",width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width/2 + "," + height/2 + ")");
    
//import data
d3.csv("data.csv", function(error, data) {
    if (error) throw error;
    
    //parse the data
    data.forEach(function(d) {
        d.percent = +d.percent;
        d.neighborhood = d.neighborhood;
    });
   
   //apend g elements (arc) 
    var g = svg.selectAll(".arc")
        .data(pie(data))
        .enter().append("g")
        .attr("class", "arc");
        
    //apend path of the arc
    g.append("path")
        .attr("d", arc)
        .style("fill", function(d) {return color(d.data.percent); });
        
    //apend the text (labels)
    g.append("text")
        .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + 
        ")"; })
        .attr("dy", ".33em")
        .text(function(d) {return d.data.neighborhood; });
        
        
        
});


    

