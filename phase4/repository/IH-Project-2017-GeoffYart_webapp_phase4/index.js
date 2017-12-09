var url_climate = 'https://api.weather.gov/points/40.7291,-73.9965/forecast';
var url_prices = 'https://www.quandl.com/data/ZILLOW-Zillow-Real-Estate-Research?keyword=ny';
var url_neighborhoods = 'https://data.cityofnewyork.us/api/geospatial/cpf4-rkhq?method=export&format=GeoJSON';
var url_museums = 'https://data.cityofnewyork.us/resource/fn6f-htvy.json';
var url_farmersMarkets = 'https://data.cityofnewyork.us/api/views/j8gx-kc43/rows.json?accessType=DOWNLOAD';
var url_careerCenters = 'https://data.ny.gov/api/views/g8h7-98zz/rows.json?accessType=DOWNLOAD';
var url_fireStations = 'https://data.ny.gov/resource/yvdw-83ff.geojson';
var url_schoolSafety = 'https://data.cityofnewyork.us/api/views/qybk-bjjc/rows.json?accessType=DOWNLOAD';
var url_airQuality = 'https://data.cityofnewyork.us/api/views/c3uy-2p5r/rows.json?accessType=DOWNLOAD';

$(document).ready(function() {
	alert(getData(url_airQuality));
});

$.ajax({ 
	type: "GET",
	url: url_prices,
	success: function (result) {
		return result
	},
	error: function (result) {
		console.log(error, "failed to load")
	}
});