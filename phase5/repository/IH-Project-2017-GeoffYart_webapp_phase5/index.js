// URLs
var url_climate = 'https://api.weather.gov/points/40.7291,-73.9965/forecast';
var url_prices = 'https://www.quandl.com/data/ZILLOW-Zillow-Real-Estate-Research?keyword=ny';
var url_neighborhoods = 'https://data.cityofnewyork.us/api/geospatial/cpf4-rkhq?method=export&format=GeoJSON';
var url_museums = 'https://data.cityofnewyork.us/resource/fn6f-htvy.json';
var url_farmersMarkets = 'https://data.cityofnewyork.us/api/views/j8gx-kc43/rows.json?accessType=DOWNLOAD';
var url_careerCenters = 'https://data.ny.gov/api/views/g8h7-98zz/rows.json?accessType=DOWNLOAD';
var url_fireStations = 'https://data.ny.gov/resource/yvdw-83ff.geojson';
var url_schoolSafety = 'https://data.cityofnewyork.us/api/views/qybk-bjjc/rows.json?accessType=DOWNLOAD';
var url_airQuality = 'https://data.cityofnewyork.us/api/views/c3uy-2p5r/rows.json?accessType=DOWNLOAD';
// JSONs
var json_climate;
var json_prices;
var json_neighborhoods;
var json_museums;
var json_farmersMarkets;
var json_careerCenters;
var json_fireStations;
var json_schoolSafety;
var json_airQuality;

// All the API Requests (generated with Python)
$.ajax({
	type: "GET",
	url: url_climate,
	success: function (result) {
		json_climate = result;
	},
	error: function (result) {
		// lol same
	}
});

$.ajax({
	type: "GET",
	url: url_prices,
	success: function (result) {
		json_prices = result;
	},
	error: function (result) {
		// lol same
	}
});

$.ajax({
	type: "GET",
	url: url_neighborhoods,
	success: function (result) {
		json_neighborhoods = result;
	},
	error: function (result) {
		// lol same
	}
});

$.ajax({
	type: "GET",
	url: url_museums,
	success: function (result) {
		json_museums = result;
	},
	error: function (result) {
		// lol same
	}
});

$.ajax({
	type: "GET",
	url: url_farmersMarkets,
	success: function (result) {
		json_farmersMarkets = result;
	},
	error: function (result) {
		// lol same
	}
});

$.ajax({
	type: "GET",
	url: url_careerCenters,
	success: function (result) {
		json_careerCenters = result;
	},
	error: function (result) {
		// lol same
	}
});

$.ajax({
	type: "GET",
	url: url_fireStations,
	success: function (result) {
		json_fireStations = result;
	},
	error: function (result) {
		// lol same
	}
});

$.ajax({
	type: "GET",
	url: url_schoolSafety,
	success: function (result) {
		json_schoolSafety = result;
	},
	error: function (result) {
		// lol same
	}
});

$.ajax({
	type: "GET",
	url: url_airQuality,
	success: function (result) {
		json_airQuality = result;
	},
	error: function (result) {
		// lol same
	}
});

// Generates score for every location
function scoreAll() {
	/*
	create array of locations with scores for various attributes:
	
	arr_crit_score;
	
	var residence = {
		position = location of residence
		priceScore = negative z-score of cost of rent
		locationScore = inverse square of distance to school
		safetyScore = sum of reciporacals of distances to fire stations plus
			school safety level plus air quality
		transportationScore = length of bikepath within 1 mi radius plus
			number of bus stops within .5 mi radius
		cultureScore = sum of inverse squares of distances to museums, farmers
			markets, and career centers
	}
	*/
	
	/*
	calculate the best 5 for the user by generating user scores:
	
	arr_tot_score;
	arr_user_score;
	
	for (int i = 1; i <= 5; i++) {
		arr_user_score.append(parseFloat(document.getElementById("crit" + i + "Value").slice(0,-3)));
	}
	
	for (int i = 0; i < arr_crit_score.length; i++) {
		arr_tot_score[i] = arr_crit_score.priceScore * arr_user_score[0];
		arr_tot_score[i] += arr_crit_score.locationScore * arr_user_score[1];
		arr_tot_score[i] += arr_crit_score.safetyScore * arr_user_score[2];
		arr_tot_score[i] += arr_crit_score.transportationScore * arr_user_score[3];
		arr_tot_score[i] += arr_crit_score.cultureScore * arr_user_score[4];
	}
	*/
	
	/*
	sort(arr_tot_score);
	
	for (int i = 0; i < 5; i++) {
		var marker = new google.maps.Marker({
			position: arr_tot_score[i].position,
			map: map
		});
	}
	*/
}