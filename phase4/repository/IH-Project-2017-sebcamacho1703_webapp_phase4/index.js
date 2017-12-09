function getDataWeather() {
	var URLWeather = "https://www.ncdc.noaa.gov/cdo-web/api/v2/locations";
	var dataWeather = "FIPS:061&limit=10&offset=12000&sortfield=name";
	var tokenWeather = "VxJvyeGkrrpbwvtFRIqCxVHxfEvqUkcb";
	getDataFromURL(URLWeather, dataWeather, tokenWeather, "json");
}

function getDataZillow() {
	var URLZillow = "http://www.zillow.com/webservice/GetSearchResults.htm?zws-id=X1-ZWz18wmjk4ti4r_728x4"; //?zws-id=X1-ZWz18wmjk4ti4r_728x4&address=NewYork&citystatezip=NY/NYC/10003";
	var dataZillow = "&address=NewYork&citystatezip=NY/NYC/100";
	getDataFromURL(URLZillow, dataZillow, "", "xml");
}

function getDataMuseum() {
	var URLLibrary = "https://data.cityofnewyork.us/api/views/fn6f-htvy/rows.json?accessType=DOWNLOAD";
	getDataFromURL(URLLibrary);
	
}

var ArrayMuseums = [];

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
        ArrayMuseums.push(data.responseJSON.data[0][8].split(" "));
        console.log(ArrayMuseums);
		// si sale bien
	})

	.fail(function(error){
		console.log(error);
		// si sale mal
	})
}

$(document).ready( function(){
	$("#getDataButtonWeather").on("click", getDataWeather);
	$("#getDataButtonZillow").on("click", getDataZillow);
	$("#getDataButtonMuseum").on("click", getDataMuseum);
});

        var controlUI = document.createElement('div');
        controlUI.style.backgroundColor = '#fff';
        controlUI.style.border = '2px solid #fff';
        controlUI.style.borderRadius = '3px';
        controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
        controlUI.style.cursor = 'pointer';
        controlUI.style.marginBottom = '22px';
        controlUI.style.textAlign = 'center';
        controlUI.title = 'Click to recenter the map';
        controlDiv.appendChild(controlUI);

        var controlText = document.createElement('div');
        controlText.style.color = 'rgb(25,25,25)';
        controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
        controlText.style.fontSize = '16px';
        controlText.style.lineHeight = '38px';
        controlText.style.paddingLeft = '5px';
        controlText.style.paddingRight = '5px';
        controlText.innerHTML = 'Center Map';
        controlUI.appendChild(controlText);

        controlUI.addEventListener('click', function() {
          map.setCenter(central);
        });

      }
function Museum(controlDiv, map) {

        var controlUI = document.createElement('div');
        controlUI.style.backgroundColor = '#fff';
        controlUI.style.border = '2px solid #fff';
        controlUI.style.borderRadius = '3px';
        controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
        controlUI.style.cursor = 'pointer';
        controlUI.style.marginBottom = '22px';
        controlUI.style.textAlign = 'center';
        controlUI.title = 'Click to go to  museum';
        controlDiv.appendChild(controlUI);

        var controlText = document.createElement('div');
        controlText.style.color = 'rgb(25,25,25)';
        controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
        controlText.style.fontSize = '16px';
        controlText.style.lineHeight = '38px';
        controlText.style.paddingLeft = '5px';
        controlText.style.paddingRight = '5px';
        controlText.innerHTML = 'Museum';
        controlUI.appendChild(controlText);

        controlUI.addEventListener('click', function() {
            var mus = getDataMuseum;
          map.setCenter(new google.maps.LatLng(ArrayMuseums[1].substr(0), ArrayMuseums[2].substr(0,this.length - 1)));
        });

      }

var map;

function initMap() {
	central = new google.maps.LatLng( 40.7291, -73.9965);
        map = new google.maps.Map(document.getElementById('map'), {
        	zoom: 15,
        	center: central,
			mapTypeControl: true
        }); ada dada*/
		var marker = new google.maps.Marker({
			position: central,
			map: map,
			 });
    
    
        var centerControlDiv = document.createElement('div');
        var centerControl = new CenterControl(centerControlDiv, map);
        centerControlDiv.index = 1;
        var museum = new Museum(centerControlDiv, map);
        centerControlDiv.index = 2;
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);


