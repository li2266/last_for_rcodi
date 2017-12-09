function myMap() {
var mapProp= {
    center:new google.maps.LatLng(40.7290549,-73.9965233),
    zoom:16,
};
var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
}


function getdataAirq(){
    var url = "https://data.cityofnewyork.us/api/views/c3uy-2p5r/rows.json?accessType=DOWNLOAD"
    var data = $.get(url, () => {
		console.log( url );
	})
	.done(function () {
		console.log(data);
	})
	.fail(function (error) {
		//fail
		console.error(error);
	})
}

function getdataWeather(){
    var url = "http://api.openweathermap.org/data/2.5/weather?q=newyork&appid=9830879c002bb5e78eebb68edc11b148";
    var data = $.get(url, () => {
        console.log(url);
    })
    
    .done(function () {
		console.log(data);
	})
	.fail(function (error) {
		//fail
		console.error(error);
	})
        
}

$(document).ready(function() {
	$("#testairq").on("click", getdataAirq);
	$("#testweather").on("click", getdataWeather);
})