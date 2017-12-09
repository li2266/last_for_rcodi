var map;
      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 40.7291, lng: -73.9965},
          zoom: 14
        });
      }
      
      
// adapting previous example code
      
const DATASET_QUERY_FORMAT = "https://www.quandl.com/api/v3/datasets/ZILLOW/N9_MRP2B.json?api_key=dgrrRXwnDqdCJumx2oUK";

var DATASETS_API_SERIES_ID = {
    
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

})