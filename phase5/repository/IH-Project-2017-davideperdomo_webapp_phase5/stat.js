var yearAvg = []

/* Climate data base
--------------------------------------------------------------------------------
*/

function getYearAvg(){
	var station= "&stationid=GHCND:USW00014734"
	var data = $.ajax({
    	url: 'https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=GHCND&datatypeid=tavg&units=metric&startdate=2016-01-01&enddate=2016-12-30&locationid=CITY:US360019&stationid=GHCND:USW00014734&limit=365',
    	headers:{'token':'eYjeNHMGBxpRMYhExpkXBivkbGiIDvFc'}})    
    .done(function(){
    	console.log(data.responseJSON.results);
    	var resp = data.responseJSON.results;

    	for(i=0;i<resp.length;i++){
    		yearAvg.push([resp[i].value,resp[i].date.split('T')]);
    	}
    	//console.log("yearAvg",yearAvg);
    })
    .fail(function(error){
        console.error(error);
    });
}

/* D3 Graph, based in the Hacker 9 code
-------------------------------------------------------------------------------
*/
function graphYearAvg(){
    var svg = d3.select("svg");
		margin = {top: 10,right: $(window).width()*0.05, bottom: 10, left: $(window).width()*0.05},
		width = $(window).width() - margin.right - margin.left,
		height = 500 - margin.top - margin.bottom,
		g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
    var parseTime = d3.timeParse("%Y-%m-%d");

    var area = d3.area()
        .x(function(data) { return x(data.date); })
        .y0(height*0.669)
        .y1(function(data) { return y(data.close); });

	var x = d3.scaleTime()
		.rangeRound([0, width]);

	var y = d3.scaleLinear()
		.rangeRound([height, 0]);
    
    var data = yearAvg.map(function(data){
		return{
			date: parseTime(data[1][0]),
			close: data[0]
		};            
	});
    
    
	x.domain(d3.extent(data, function(d) {return d.date; }));
	y.domain([-20,40]);
    		
			
	g.append("path")
        .datum(data)
        .attr("fill", "#00FF80")
		.attr("stroke", "#00FFFF")
		.attr("stroke-width", 1.5)
        .attr("d", area);
		
    g.append("g")
		.call(d3.axisLeft(y))
		.append("text")
		.attr("fill", "#000")
		.attr("transform", "rotate(-90)")
		.attr("y", 6)
		.attr("dy" , "0.7em")
		.text("Temperature ");

	g.append("g")
		.call(d3.axisBottom(x))
		.attr("transform", "translate(0," + height*0.669 + ")");

}

function getChart(){
    d3.select("svg").text("")
	graphYearAvg();
}

window.onload= function(){
	getYearAvg();
}
$(document).ready(function() {
	//getMaxTemp();
	getChart();
})