function getDataWeather(){
	var URLWeather = "https://www.ncdc.noaa.gov/cdo-web/api/v2/locations";
	var dataWeather = "FIPS:061&limit=10&offset=12000&sortfield=name";
	var tokenWeather = "VxJvyeGkrrpbwvtFRIqCxVHxfEvqUkcb";
	getDataFromURL(URLWeather, dataWeather, tokenWeather, "json");
}

function getDataZillow(){
	var URLZillow = "http://www.zillow.com/webservice/GetSearchResults.htm?zws-id=X1-ZWz18wmjk4ti4r_728x4"; //?zws-id=X1-ZWz18wmjk4ti4r_728x4&address=NewYork&citystatezip=NY/NYC/10003";
	var dataZillow = "&address=NewYork&citystatezip=NY/NYC/100";
	getDataFromURL(URLZillow, dataZillow, "", "xml");
}

function getDataMuseum(){
	var URLLibrary = "https://data.cityofnewyork.us/api/views/fn6f-htvy/rows.json?accessType=DOWNLOAD";
	getDataFromURL(URLLibrary);
	
}

function getDataFromURL(URL, dataU, tokenU, typeU){
	var data = $.ajax({
			type:"GET",
			url: URL,
			data: dataU,
			headers: {token: tokenU},
			dataType: typeU
		})

	.done(function(){
		if (typeU === "xml") {
			data = xmlToJson($.parseXML(data.responseText));
		}
		console.log(data);
	})

	.fail(function(error){
		console.log(error);
	})
}

$(document).ready( function(){
	$("#getDataButtonWeather").on("click", getDataWeather);
	$("#getDataButtonZillow").on("click", getDataZillow);
	$("#getDataButtonMuseum").on("click", getDataMuseum);
});
var map;

function initMap() {
	var central = new google.maps.LatLng( 40.7291, -73.9965);
        map = new google.maps.Map(document.getElementById('map'), {
        	zoom: 15,
        	center: {lat: 40.7291, lng: -73.9965},
        }); 
		var marker = new google.maps.Marker({
			position: central,
			map: map
			 });
}
