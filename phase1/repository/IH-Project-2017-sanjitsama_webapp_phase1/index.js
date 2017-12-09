
var xmlhttp = new XMLHttpRequest();
// var url ="https://data.cityofnewyork.us/resource/q3m4-ttp3.json";
var url= "http://api.openweathermap.org/data/2.5/weather?q=chicago&appid=6aa0bdb1f586c5630d60b6237dfce45c";

xmlhttp.open("GET", url, true);
xmlhttp.send();

xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var myArr = xmlhttp.responseText;
        var text = myArr;
        var json = JSON.parse(text);
        document.getElementById("weather").innerHTML = "Today the weather is <em><b>" + json.weather[0].main + "</b></em>";
        
            // for(var i =0; i < 44; i++) {
            //     var dataLine = [];
                
            //     data.push(json.data[i][1]);
            // }
  
            
            		//variables for creating colour squares
		var colorscale = d3.scale.category10();

		//titles
		var titleOptions = ['Final Scores'];
		var text = svg.append("text")
			.attr("class", "title")
			.attr('transform', 'translate(90,0)') 
			.attr("x", cfg.w-70)
			.attr("y", 10)
			.attr("font-size", "12px")
			.attr("fill", "#404040")
			.text("Find your best place to get food!");
				
		//Initiate title	
		var title = svg.append("g")
			.attr("class", "title")
			.attr("height", 100)
			.attr("width", 200)
			.attr('transform', 'translate(90,20)') 
			;
			//Create colour squares
			title.selectAll('rect')
			  .data(titleOptions)
			  .enter()
			  .append("rect")
			  .attr("x", cfg.w - 65)
			  .attr("y", function(d, i){ return i * 20;})
			  .attr("width", 10)
			  .attr("height", 10)
			  .style("fill", function(d, i){ return colorscale(i);})
			  ;
			//Create text next to squares
			title.selectAll('text')
			  .data(titleOptions)
			  .enter()
			  .append("text")
			  .attr("x", cfg.w - 52)
			  .attr("y", function(d, i){ return i * 20 + 9;})
			  .attr("font-size", "13px")
			  .attr("fill", "#737373")
			  .text(function(d) { return d; })
			  ;	
            
        }
};

(function () {
    document.getElementById("btn").addEventListener("click", function () {
        alert("Hi! :)");
    });
})();