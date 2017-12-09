// climate data set in construction
.ajax({ url:"https://www.ncdc.noaa.gov/cdo-web/api/v2/datasets", data:{}, headers:{ token:"RzyOYHaNfSodkWMBLfICKqBDkAJZVnLM"} })


var body = d3.select("body");
var div = body.append("div");
div.html({
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

$("button").click(function(){
    $.ajax({url: "demo_test.txt", success: function(result){
        $("#div1").html(result);
    }});
});

$.ajax({
  accepts: {
    mycustomtype: 'application/x-some-custom-type'
  },
 
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
