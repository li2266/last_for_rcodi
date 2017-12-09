var minPrice = 0;
var maxPrice = 0;
var sec = 0;
var mapadeNY;

const DATASET_QUERY_FORMAT = "http://www.quandl.com/api/v3/datasets/ZILLOW/Z";

var DATASETS_API_SERIES_ID = {
	"10012" : ["Maryland"],
	"10003" : ["Alabama"],
	"10014" : ["Alaska"],
	"10011" : ["Arizona"],
	"10002" : ["Arkansas"],
	"10013" : ["California"],
	"10009" : ["Colorado"]
}	

var statesIDs = Object.keys(DATASETS_API_SERIES_ID);

function initMap(){
  var latLong = {lat: 40.7291, lng: -73.9965}
  mapadeNY =  new google.maps.Map(document.getElementById('mapita'), {
    zoom: 17,
    center: latLong
  })
  var newYorkerPotition = new google.maps.Marker({
    position: latLong,
    map: mapadeNY
  })
}

function updateRequirements(){
    var minPrice = document.getElementById("minPrice").value;
    var maxPrice = document.getElementById("maxPrice").value;
    var sec = document.getElementById("sec").value;
    
    console.log(minPrice)
    console.log(maxPrice);
    console.log(sec);
}

function getDataFromURL(URL){
	var data = $.get(URL, function(){
		console.log(URL)
	})
		.done( function(){
			//Success
			console.log(data);
		    //DATASETS_API_SERIES_ID[data.responseJSON.request.series_id].push(data.responseJSON.series[0].data);
		})
		.fail( function(error){
			console.error(error);
		})
}

function updateAllPrices(){
	for (var statesID of statesIDs){
		var URL = DATASET_QUERY_FORMAT + statesID;
		getDataFromURL(URL);
	}
}

function updateInfo(){
    var URL = "https://data.cityofnewyork.us/resource/5ud2-iqje.json";
    var URL2 = "https://www.quandl.com/api/v3/datasets/ZILLOW/N15925_ZHVIBT.json?api_key=yzNwzWhK2pxEvZSGRkUH";
	getDataFromURL(URL);
	getDataFromURL(URL2);
}

function updateAll(){
    updateRequirements();
    updateAllDataSets();
    
}

$(document).ready(function(){
	$("#updateRequirements").on("click", updateRequirements)
	$("#askData").on("click", updateInfo)
});