/*
 //MUSEUMS
$.ajax({
    url: "https://data.cityofnewyork.us/api/views/fn6f-htvy/rows.json?accessType=DOWNLOAD",
    type: "GET"
}).done(function(data) {
    // alert("Retrieved " + data.length + " records from the dataset!");
    // console.log(data.dataset.data);
    console.log(data.data[0][8], data.data[0][9], data.data[0][10]);
});
*/
var museum = [];
var museum2 = [];
function getDataFromURL(URL){
	var data = $.get(URL, function(){
		console.log(URL)
	})
		.done( function(){
			//Success
            museum = data.responseJSON.data;
			setValues(museum);
			alert("Retrieved records from the dataset! Now update the map.");

		})
		.fail( function(error){
			console.error(error);
		})
}

function setValues(data) {
    for (i=0; i<data.length; i++)
    {
        museum2[i] = museum[i][9];
    }
    console.log(museum2[8])
}

function updateAllDatasets(){
	var URL = "https://data.cityofnewyork.us/api/views/fn6f-htvy/rows.json?accessType=DOWNLOAD"
	getDataFromURL(URL);
}


// --------GOOGLE MAPS

var map;
function onGoogleMapResponse () {
 
    map = new google.maps.Map(document.getElementById('googleMapContainer'), {
        center: ({lat: 40.7291, lng: -73.9965}),
        zoom: 12
    });
}

function getAdresses (){
    for (var j=0; j<museum.length; j++){
        
        var place = museum2[j];
	    var geocoder = new google.maps.Geocoder();
	    geocoder.geocode( { 'address' : place}, function(results, status){
	        if(status == google.maps.GeocoderStatus.OK){
		         setMarkers(results[0].geometry.location, place);
	        };
		});
        
    }
}

function setMarkers(myLocation, name){
    var marker = new google.maps.Marker({ //Line 1
		position: myLocation, //Line2: Location to be highlighted
		map: map,//Line 3: Reference to map object
		title: name //Line 4: Title to be given
	})
}

/*
var marker = new google.maps.Marker({ //Line 1
			position: {lat: 40.7291, lng: -73.9965}, //Line2: Location to be highlighted
			map: map,//Line 3: Reference to map object
			title: 'NYU' //Line 4: Title to be given
		})
}
*/
// ----------Buttons

$(document).ready(function(){
    $("#getDataButton").on("click", updateAllDatasets);
    $("#updateMap").on("click", getAdresses);
})
