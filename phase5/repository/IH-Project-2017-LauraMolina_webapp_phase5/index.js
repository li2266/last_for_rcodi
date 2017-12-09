var map;

// Google maps

function onGoogleMapResponse(){
	var university = {lat: 40.729055, lng: -73.996523};
	map =  new google.maps.Map(document.getElementById('googleMapDiv'), {
		zoom: 16,
		center: university
	});

	var marker = new google.maps.Marker({
          position: university,
          map: map
    });
	
}



//Show Fire Departments
var dataLine = [];
var info = [];
var xmlhttp = new XMLHttpRequest();
var url = "https://data.ny.gov/api/views/qfsu-zcpv/rows.json?accessType=DOWNLOAD";
xmlhttp.open("GET", url, true);
xmlhttp.send();


xmlhttp.onreadystatechange = function fire() {
	if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
	    var myArr = xmlhttp.responseText;
	    var text = myArr;
	    json = JSON.parse(text);
	    
	  
	    for (var i = 0; i<1773; i++) {    
	        dataLine.push(new google.maps.LatLng(json.data[i][19][1], json.data[i][19][2]));
	    }
	   
	    for(var i = 0; i < dataLine.length; i++){
	        var marker = new google.maps.Marker({
	            position: dataLine[i],
	            map: map
	        })    
	    } 
	}
}


$(document).ready( function(){
	$("#fire").on("click", fire);
})


      