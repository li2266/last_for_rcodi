
// Google Map variables
var map
var nyuLocation = {lat: 40.7291, lng: -73.9965};
var opacityChange = 0;
var mapVisible = true;
var tableVisible = false;
var selectedMarker = 0;


// Google map functions
function initMap(){


	  map = new google.maps.Map(document.getElementById('googleMapContainer'),
		{
				center: nyuLocation,
				zoom: 15
		});

		var nyuMarker = new google.maps.Marker({
		          position: nyuLocation,
		          map: map,
							icon: 'http://library.nyu.edu/assets/images/favicon.png',
							animation: google.maps.Animation.DROP,
		          title: 'NYU Stern School of Business'
		});

}

function mapOpacity(){
	   opacity = document.getElementById("googleMapContainer").style.opacity;
		 $('#googleMapContainer').animate(
			 {opacity: opacityChange},'slow');
			 opacityChange = opacityChange * -1 + 1;

		 if (mapVisible){
			 document.getElementById("hideButton").value="Show Map";
			 mapVisible = false;
		 }
		 else {
			 document.getElementById("hideButton").value="Hide Map";
 			 mapVisible = true;
		 }
}

function center(){
	 map.panTo(nyuLocation);
	 map.setZoom(15);
}

function hideMarkers() {

	if (tableVisible) $("#table").slideUp(500);
	for (var i = 0; i < markers.length; i++) {
					markers[i].setMap(null);
					circles[i].setMap(null);
	}
	markers = [];
	circles = [];
	zestimates = [];
	infoUrls = [];
}

function hide(){
	hideMarkers();

  $("#table").slideUp(500);

	setTimeout(function() {
		 document.getElementById("tableBody").innerHTML = "";
	 }, 500);

	document.getElementById("showButton").value="Show Places";
  document.getElementById("paragraph").innerHTML="First, let's see some houses/apartments you could rent near the university...";

	tableVisible = false;
	$("#information").hide();
}


function show(){

	tableReference = $("#tableBody")[0];
	var newRow;
	var number, address, zestimate;

  if (tableVisible){

		setTimeout(function() {
			for (var i = 0; i < markers.length; i++) {
				tableReference.rows[i].cells[0].innerText = markers[i].label;
				tableReference.rows[i].cells[1].innerText = markers[i].title;
				tableReference.rows[i].cells[2].innerText = zestimates[i] + ' /month';
			}
		 }, 500);
	}

	else {
		for (var i = 0; i < markers.length; i++) {
		newRow = tableReference.insertRow(tableReference.rows.length);
		number = newRow.insertCell(0);
		address = newRow.insertCell(1);
		zestimate = newRow.insertCell(2);
		number.innerHTML = markers[i].label;
		address.innerHTML = markers[i].title;
		zestimate.innerHTML = zestimates[i] + ' /month';

		newRow.addEventListener("click", findRow, false);
	  }
  }

  $("#table").slideDown(800);
	document.getElementById("showButton").value="Reload Places";
	document.getElementById("paragraph").innerHTML="Click on a row to see the place and get more information";

	tableVisible = true;
  }

	function findRow(){
		var element;
    var index;
		for (var i = 0; i < markers.length; i++) {
				if (this.cells[0].innerText == markers[i].label){
						element = markers[i];
						index = i;
					  break;
				}
		}
		map.setZoom(17);
		map.panTo(element.getPosition());
		document.getElementById("information").innerHTML="¡ Click here for more information !";
		document.getElementById("information").href=infoUrls[index];

		$("#information").show();
	}
