/*const DATASET_QUERY_FORMAT = "https://www.quandl.com/data/";

var DATASETS_API_SERIES_ID = {
	"EMISS.CO2-TOTV-TT-TO-MD.A" : ["Maryland", {lat: 39.063946, lng: -76.802101}],
}	

var seriesIDs = Object.keys(DATASETS_API_SERIES_ID);

function getDataFromURL( url ){
	var data = $.get(url, () => {
		console.log(url)
	})
		.done(function () {
			console.log(data)
			DATASETS_API_SERIES_ID[data.responseJSON.request.series_id].push(data.responseJSON.series[0].data);
		})
		.fail(function (error) {
			//fail
			console.error(error);
		})
}

function updateAllDatasets(){
	for( var stateID of seriesIDs ){
		var url = DATASET_QUERY_FORMAT + stateID
		getDataFromURL(url)
	}

}

function updateTable(){
	tableReference = $("#mainTableBody")[0];
	var newRow, co2Amount, state;

	for( var statesID of seriesIDs){
		newRow = tableReference.insertRow(tableReference.rows.length);
		state = newRow.insertCell(0);
		co2Amount = newRow.insertCell(1);
		state.innerHTML = DATASETS_API_SERIES_ID[statesID][0]
		co2Amount.innerHTML = DATASETS_API_SERIES_ID[statesID][2][0][1];
	}
} 

$(document).ready(function() {
	$("#getData").on("click", updateAllDatasets)
	$("#updateTable").on("click", updateTable)

})*/

var map;

(function () {
    document.getElementById("updatePlaces").addEventListener("click", function () {
        alert("Hi! :)");
    });
})();

function onGoogleMapResponse() {
    
    var city = "New York";
    var university = "New York University";
    var setcity = {lat: 40.729100, lng: -73.996500};
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode( { 'address' : university } , function(results,status){
        if (status == google.maps.GeocoderStatus.OK){
            map.setCenter(results[0].geometry.location);
        };
    });
    
    map = new google.maps.Map(document.getElementById('googleMapContainer'), {
       zoom: 13
    });
    
    var marker = new google.maps.Marker({
        map: map,
        position: setcity
    });    
}