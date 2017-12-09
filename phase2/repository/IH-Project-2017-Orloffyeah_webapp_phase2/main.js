const ZILLOW_DATA = "https://www.quandl.com/api/v3/datasets/ZILLOW/N9_TURNAH.json?api_key=JVy_pYi3kZ_XgnasNvHF";
const NY_COMPLAINT_DATA = "https://data.cityofnewyork.us/resource/qgea-i56i.json"

var data;
var map;

var complaints = [];
var infoShow;

var larcenyCheck,
	robberyCheck, 
	forgeryCheck;

//--------------------------------- Complaint ----------------------------------------
function loadComplaint(){
	$.getJSON(NY_COMPLAINT_DATA, function(data, tStatus){
		$.each(data, function(i, result){
			var marker = new google.maps.Marker({
				position: new google.maps.LatLng(parseFloat(result.latitude),
												 parseFloat(result.longitude)),
				map: null,
				title: result.ofns_desc,
			});
			// Add Google Marker to an array, in order to access it later
			complaints.push(marker);
			
			
			// Show information stored in infoShow when clicking a marker
			marker.addListener('click', function() {
				if(infoShow){
					infoShow.close();
				}
				infoShow = new google.maps.InfoWindow({
					content: result.ofns_desc + 
					'<br/> Borough: ' + result.boro_nm
				});
				infoShow.open(map, marker);
			});
		});
	});
};

function setComplaint(type, crime){
	for (var i = 0; i < complaints.length; i++){
		switch(crime){
			case "LARCENY":
				if(complaints[i].getTitle() == "PETIT LARCENY" || complaints[i].getTitle() == "GRAND LARCENY"){
					complaints[i].setMap(type);
				}
				break;
			case "ROBBERY":
				if(complaints[i].getTitle() == "ROBBERY"){
					complaints[i].setMap(type);
				}
				break;
			case "FORGERY":
				if(complaints[i].getTitle() == "FORGERY"){
					complaints[i].setMap(type);
				}
				break;
		}
	}
}

$(document).ready(function() {
	$("#getDataButton1").on('click', function(){
		
		larcenyCheck = document.getElementById("crime_larceny_checkbox").checked;
		robberyCheck = document.getElementById("crime_robbery_checkbox").checked;
		forgeryCheck = document.getElementById("crime_forgery_checkbox").checked;
		
		if (larcenyCheck){
			setComplaint(map, "LARCENY")
		}
		else if(!larcenyCheck){
			setComplaint(null, "LARCENY")	
		}
		
		if (robberyCheck){
			setComplaint(map, "ROBBERY")
		}
		else if(!robberyCheck){
			setComplaint(null, "ROBBERY")	
		}
		
		if (forgeryCheck){
			setComplaint(map, "FORGERY")
		}
		else if(!forgeryCheck){
			setComplaint(null, "FORGERY")	
		}
	});
});


function initMap() {
	map = new google.maps.Map(document.getElementById('googleMapContainer'), {
		center: {lat: 40.7291, lng: -73.9965},
		zoom: 16
	});
}

loadComplaint();