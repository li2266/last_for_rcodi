const DATASET_QUERY_FORMAT = "https://www.quandl.com/api/v3/datasets/ZILLOW/N9_MRP2B.json?api_key=EM7qUxypAcQPXdvPcsjq";
	
var map;

function getDataFromURL(DATASET_QUERY_FORMAT){
	var data = $.get(URL, function(){
		console.log(URL)
	})
		.done( function(){
			//Success
			//console.log(data);
			DATASETS_API_SERIES_ID[data.responseJSON.request.series_id].push(data.responseJSON.series[0].data);
		})
		.fail( function(error){
			console.error(error);
		})
}

function updateAllDatasets(){
	getDataFromURL(DATASET_QUERY_FORMAT);
}

function updateTable(){
	tableReference = $("#mainTableBody")[0];
	var newRow, co2Amount, state;

	for( var statesID of statesIDs){
		newRow = tableReference.insertRow(tableReference.rows.length);
		state = newRow.insertCell(0);
		co2Amount = newRow.insertCell(1);
		state.innerHTML = DATASET_QUERY_FORMAT[0]
		co2Amount.innerHTML = DATASET_QUERY_FORMAT[2][0][1];
	}
}


//---------------------------------  D3.JS  ---------------------------------------

function updateChart(){
	var svg = d3.select("svg");
		margin = {top: 20, right: 20, bottom: 30, left: 50},
		width = 1200 - margin.right - margin.left,
		height = 400 - margin.top - margin.bottom,
		g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	var parseTime = d3.timeParse("%Y");

	var x = d3.scaleTime()
		.rangeRound([0, width]);

	var y = d3.scaleLinear()
		.rangeRound([height, 0]);

	var line = d3.line()
		.x(function(data) { return x(data.date); })
		.y(function(data) { return y(data.close); })

	var data = DATASET_QUERY_FORMAT[2].map(function(data){
		return{
			date: parseTime(data[0]),
			close: data[1]
		};
	});

	x.domain(d3.extent(data, function(d) {return d.date; }));
	y.domain(d3.extent(data, function(d) {return d.close; }));

	g.append("g")
		.attr("transform", "translate(0," + height + ")")
		.call(d3.axisBottom(x));

	g.append("g")
		.call(d3.axisLeft(y))
		.append("text")
		.attr("fill", "#000")
		.attr("transform", "rotate(-90)")
		.attr("y", 6)
		.attr("dy" , "0.7em")
		.text("Texas CO2 Millions metric tons production")

	g.append("path")
		.datum(data)
		.attr("fill", "none")
		.attr("stroke", "steelblue")
		.attr("stroke-width", 1.5)
		.attr("d", line);


}


//------------------------------------------ Google Maps ---------------------------------------------

function onGoogleMapResponse(){
	map = new google.maps.Map(document.getElementById('googleMapContainer'), {
		zoom: 17,
          center: new google.maps.LatLng(40.7291,-73.9965),
          mapTypeId: 'terrain'
	});

	var country = "United States";
	var geocoder = new google.maps.Geocoder();
	geocoder.geocode( { 'address' : country}, function(results, status){
		if(status == google.maps.GeocoderStatus.OK){
			map.setCenter(results[0].geometry.location);
		};
	});
}

function drawAllCircles(){
	for (var i = 0; i < statesIDs.length; i++) {
		var circle = new google.maps.Circle({
			strokeColor: "#FF0000",
			strokeOpacity: 0.8,
			strokeWeight: 2,
			fillColor: "#FF0000",
			fillOpacity: 0.35,
			map: map,
			center: DATASETS_API_SERIES_ID[statesIDs[i]][1],
			radius: DATASETS_API_SERIES_ID[statesIDs[i]][2][0][1] * 1000
		})
	}
}

$(document).ready( function(){
	$("#getDataButton").on("click", updateAllDatasets);
	$("#updateTableButton").on("click", updateTable);
	$("#updateChartButton").on("click", updateChart);
	$("#drawCircles").on("click", drawAllCircles);
})