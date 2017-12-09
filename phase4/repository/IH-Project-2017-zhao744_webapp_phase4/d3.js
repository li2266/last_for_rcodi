

function getClimateData() {
    var myToken = "RzyOYHaNfSodkWMBLfICKqBDkAJZVnLM";
   $.ajax({
  accepts: {
    mycustomtype: 'GET',
       url : "https://www.ncdc.noaa.gov/cdo-web/api/v2/locations?locationid=ZIP:10003",
       headers : {'myToken': noaaApiKey},
       success : function(result) {
           var weatherData = result;
           console.log(weatherData.results);

           return weatherData.results;
       },
       error : function(result) {
           console.log("Could not access weather data.");
           console.log(result);
       }
     }});
 }
 
var body = d3.select("body");
var div = body.append("div");
index.html({
	"results": [
		{
			"id": "GSOY",
			"name": "Global Summary of the Year",
			"datacoverage": 1,
			"mindate": "1763-01-01",
			"maxdate": "2015-01-01"
		},
		...
	],
	"metadata": {
		"resultset": {
			"limit": 25,
			"count": 11,
			"offset": 1
		}
	}
});

 dataType: 'mycustomtype'
});
d3.select("body")
  .selectAll("div")
    .data(data)
  .enter().append("div")
    .style("width", function(d) { return d * 100 + "px"; })
    .text(function(d) { return weatherData.results; });

$("button").click(function(){
    $.ajax({url: "https://www.ncdc.noaa.gov/cdo-web/api/v2/locations?locationid=ZIP:10003", success: function(result){
        $("div").html(weatherData.results);
    }});
});



// climate data set in construction
// .ajax({ url:"https://www.ncdc.noaa.gov/cdo-web/api/v2/datasets", data:{}, headers:{ token:"RzyOYHaNfSodkWMBLfICKqBDkAJZVnLM"} })
$.ajax({
  accepts: {
    mycustomtype: 'application/x-some-custom-type'
  },
  //
  
 
  // Instructions for how to deserialize a `mycustomtype`
  converters: {
    'text mycustomtype': function(result) {
      // Do Stuff
      return newresult;
    }
  },
 
  // Expect a `mycustomtype` back from server
  dataType: 'mycustomtype'
});
d3.select(".chart")
  .selectAll("div")
    .data(data)
  .enter().append("div")
    .style("width", function(d) { return d * 10 + "px"; })
    .text(function(d) { return d; });
//


