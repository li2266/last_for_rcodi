var map;
var market0;
var artmarket=[];
var musmarket=[];
var schmarket=[];
var firmarket=[];


//----------------------------------------------------------------------------------------------------------
//Map Functions
function initMap(){
	var NYUSSB={lat: 40.7291, lng: -73.9965};
	var mapDiv = document.getElementById('map');
	map = new google.maps.Map(mapDiv, {
		center: NYUSSB,
		zoom: 16});
        
	var marker0 = new google.maps.Marker({
		position: NYUSSB,
		map:map,
		title: 'NYU Stern School of Business'
	})
}

function removeMarket(market) {
    for(i=0; i<market.length; i++){
        market[i].setMap(null);
    }
}
//--------------------------------------------------------------------------------------------------------------


//----------------------------------------------------------------------------------------------------------
document.getElementById("sendData").addEventListener("click", function(){
	removeMarket(artmarket);
	removeMarket(musmarket);
	removeMarket(schmarket);
	removeMarket(firmarket);
	if(document.forms["form1"]["ArtGalleries"].checked){
		artGalerias();}
	if (document.forms["form1"]["Museums"].checked) {
		museumsL();}
	if (document.forms["form1"]["Schools"].checked) {
		schoolL();}
	if (document.forms["form1"]["FireMans"].checked) {
		fireMans();}
});
//-----------------------------------------------------------------------------------------------------


//----------------------------------------------------------------------------------------------------
//Add museum location markets fron json data to map
function museumsL(){
	var requestURL = 'https://data.cityofnewyork.us/api/views/fn6f-htvy/rows.json';
	var request = new XMLHttpRequest();
	request.open('GET', requestURL);
	request.responseType = 'json';
	request.send();
	request.onload = function() {
  		var museum = request.response;
  		addMuseumMap(museum);
	}
}

function addMuseumMap(museumjson){
	var musdata=museumjson.data;
	for (var i = 0; i < musdata.length ; i++) {
		var musname = musdata[i][9];
		var muslocation=musdata[i][8];
		muslocation=muslocation.replace( 'POINT (','');
		muslocation=muslocation.replace( ')','');
		muslocation=muslocation.split(' ');
		muslocation=[parseFloat(muslocation[1]),parseFloat(muslocation[0])];
			
		var marker = new google.maps.Marker({
			position: {lat: muslocation[0], lng: muslocation[1]},
			map:map,
			title: musname
		})
			
		musmarket.push(marker);
	}
}
//--------------------------------------------------------------------------------------------------------


//------------------------------------------------------------------------------------------------------
//Add School location markets fron json data to map
function schoolL(){
	var requestURL = 'https://data.cityofnewyork.us/api/views/qybk-bjjc/rows.json';
	var request = new XMLHttpRequest();
	request.open('GET', requestURL);
	request.responseType = 'json';
	request.send();
	request.onload = function() {
  		var school_safety = request.response;
  		addSchoolMap(school_safety);
	}
}

function addSchoolMap(schjson){
	var schdata=schjson.data;
  	for (var i = 0; i < schdata.length; i++) {
  		var schname = schdata[i][11];
		shclocation=[parseFloat(schdata[i][34]),parseFloat(schdata[i][35])];

		var marker = new google.maps.Marker({
			position: {lat: shclocation[0], lng: shclocation[1]},
			map:map,
			title: schname
		})

		schmarket.push(marker);
	}
}
//--------------------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------------------
//Add Art Gallery location markets fron json data to map
function artGalerias(){
	var requestURL = 'https://data.cityofnewyork.us/api/views/43hw-uvdj/rows.json';
	var request = new XMLHttpRequest();
	request.open('GET', requestURL);
	request.responseType = 'json';
	request.send();
	request.onload = function() {
  		var galart = request.response;
  		addGalartMap(galart);
	}
}

function addGalartMap(artjson){					console.log(55555);
	var artdata=artjson.data;

	for (var i = 0; i < artdata.length ; i++) {
		var artname = artdata[i][8];

		var artlocation=artdata[i][9];
		artlocation=artlocation.replace( 'POINT (','');
		artlocation=artlocation.replace( ')','');
		artlocation=artlocation.split(' ');
		artlocation=[parseFloat(artlocation[1]),parseFloat(artlocation[0])];
		var marker = new google.maps.Marker({
			position: {lat: artlocation[0], lng: artlocation[1]},
			map:map,
			title: artname
		})
			
		artmarket.push(marker);
	}
}
/*function addGalartMap(galartjson){
	var artdata=galartjson.meta.view.columns;
	for (var i = 0; i < artdata[9].cachedContents.top.length; i++) {
		var artlocation=artdata[9].cachedContents.top[i].item.coordinates;	
		var artname=artdata[8].cachedContents.top[i].item;
			var marker = new google.maps.Marker({
			position: {lat: artlocation[1], lng: artlocation[0]},
			map:map,
			title: artname
	})
}
}*/
//---------------------------------------------------------------------------------------------------


//-----------------------------------------------------------------------------------------------------
//Add Fire Departaments location markets fron json data to map
function fireMans(){
	var requestURL = 'https://data.ny.gov/api/views/qfsu-zcpv/rows.json';
	var request = new XMLHttpRequest();
	request.open('GET', requestURL);
	request.responseType = 'json';
	request.send();
	request.onload = function() {
  		var galart = request.response;
  		addFiremansMap(galart);
	}
}

function addFiremansMap(firjson){
	var firdata=firjson.data;
//8,17,18
	for (var i = 0; i < firdata.length; i++) {
		var firname = firdata[i][8];
		var firlocation = [parseFloat(firdata[i][17]),parseFloat(firdata[i][18])];

		var marker = new google.maps.Marker({
			position: {lat: firlocation[0], lng: firlocation[1]},
			map:map,
			title: firname
		})
		firmarket.push(marker);
	}
}
//-------------------------------------------------------------------------------------------------------