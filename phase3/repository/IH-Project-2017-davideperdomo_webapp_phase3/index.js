const IDX_LAT = 0
const IDX_LON = 1

const HOUSEURL = "https://data.cityofnewyork.us/resource/q3m4-ttp3.json"
const CRIMEURL = "https://data.cityofnewyork.us/resource/5jvd-shfj.json"
const FIREDEPURL = "https://data.cityofnewyork.us/resource/byk8-bdfw.json"
const ATMURL = "https://data.ny.gov/api/resource/ndex-ad5r.json?$where=city=\"New%20York\""
const NEIGHURL = "https://data.cityofnewyork.us/api/resource/q2z5-ai38.json?$where=boro_name=%22Manhattan%22"

//var quandlkey="LzBf7VTjx4mPLM74cvVN";
const nyus_coord=[40.7290549,-73.9965233]

const HOUSEICON = 'http://www.rentsbuy.com/media/com_iproperty/categories/house-icon6.png'
const CRIMEICON = 'http://mpi.krakow.pl/_img/close-icon.png'
const ATMICON = 'http://www.cityofukiah.com/NewWeb/wp-content/themes/deepblue/images/icon-dollar-small.png'
const FIRESTICON = 'http://www.arfd.argonathrpg.com/forum/Smileys/default/ff.png'

var map = null

var HOUSESDATA = []
var CRIMEDATA = []
var FIRESTDATA = []
var ATMDATA = []

var radio = 0.02 //
var max_radio = 0.04

var housesMarkers = []
var crimeMarkers = []
var firestMarkers = []
var atmMarkers = []


/*Xml parser to Json taken from: 
    https://gist.github.com/chinchang/8106a82c56ad007e27b1
--------------------------------------------------------------------------------
*/
function xmlToJson(xml) {
	var obj = {};// Create the return object
	if (xml.nodeType == 1) { // element
		// do attributes
		if (xml.attributes.length > 0) {
		obj["@attributes"] = {};
			for (var j = 0; j < xml.attributes.length; j++) {
				var attribute = xml.attributes.item(j);
				obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
			}
		}
	} else if (xml.nodeType == 3) { // text
		obj = xml.nodeValue;		
	}
	// do children
	// If just one text node inside
	if (xml.hasChildNodes() && xml.childNodes.length === 1 && xml.childNodes[0].nodeType === 3) {
		obj = xml.childNodes[0].nodeValue;
	}
	else if (xml.hasChildNodes()) {
		for(var i = 0; i < xml.childNodes.length; i++) {
			var item = xml.childNodes.item(i);
			//console.log("item ",item.nodeValue," Nodename ",item.nodeName);
			var nodeName = item.nodeName;
			if(item.nodeName == "SearchResults:searchresults"){ //modify to solve a query issue
			    nodeName = "search";
			}			
			if (typeof(obj[nodeName]) == "undefined") {
				obj[nodeName] = xmlToJson(item);
			} else {
				if (typeof(obj[nodeName].push) == "undefined") {
					var old = obj[nodeName];
					obj[nodeName] = [];
					obj[nodeName].push(old);
				}
				obj[nodeName].push(xmlToJson(item));
			}
		}
	}
	return obj;
}

function inputRadio(){
    radio = document.getElementById("selectradio").value;
}
//Provitional distance calculator given to coordinates
function distanceTo(coord1,coord2){
    return Math.sqrt( (Math.pow( coord2[0]-Math.abs(coord1[0]),2 ))+(Math.pow( Math.abs(coord2[1])-Math.abs(coord1[1]),2 )));    
}

/*JSON request to get data of data sets
--------------------------------------------------------------------------------
*/
function getdata(url,adddata){
	 var data = $.get(url, () => {
		console.log( url );
	})	
	.done(function () {
		console.log("dataxx:",data);
	    var resp = data.responseJSON; 	
		for(i=0;i<resp.length;i++){
		   adddata(resp[i]);
		}	
	})
	.fail(function (error) {
		console.error(error);
	})
}
function adddataNeighb(neighb){
	//console.log(neighb)
}

/*Houses in ney york data set 
--------------------------------------------------------------------------------
*/
function adddataHouse(house){
	var aux = [
		house.latitude,		
        house.longitude,
		house.house_number, //2
        house.street_name	//3
        ]
    aux.push( distanceTo(nyus_coord,[ aux[IDX_LAT], aux[IDX_LON] ]) );	//4: distance to nyu	    
    
    if(aux[4] < max_radio){
        HOUSESDATA.push(aux);
    }
}

/*Crimes information data set
--------------------------------------------------------------------------------
*/
function adddataCrime(crime){
	var aux = [
		crime.latitude, 	
        crime.longitude, 		
        crime.ofns_desc,	//2 
        "crime"				//3 
        ];
    aux.push( distanceTo(nyus_coord,[ aux[IDX_LAT], aux[IDX_LON] ]) );		//4: distance to nyu    
    if(aux[4] < max_radio){
        CRIMEDATA.push(aux);
    }
}
/*Fire department data set
--------------------------------------------------------------------------------
*/

function adddataFirest(station){
	var aux = [
		parseFloat(station.latitude),
		parseFloat(station.longitude),
		station.nta,
		station.borough
	];
	FIRESTDATA.push(aux);
}

/*Atm data set
--------------------------------------------------------------------------------
*/
function adddataATM(atm){
	if (atm.hasOwnProperty('location_1')){
		var aux = [
			parseFloat(atm.location_1.latitude),
			parseFloat(atm.location_1.longitude),
			atm.name_of_institution,
			atm.street_address
		];
		ATMDATA.push(aux);
	}
}

/*Test Air quality data set
--------------------------------------------------------------------------------
*/
function getdataAirq(){
    //var url = "https://data.cityofnewyork.us/api/views/c3uy-2p5r/rows.json?accessType=DOWNLOAD"
    var url = "https://data.cityofnewyork.us/resource/ah89-62h9.json?$where=year_description=%222013%22%20AND%20geo_entity_name=%22Manhattan%22";
    var data = $.get(url, () => {
		console.log( url );
	})
	.done(function () {
		console.log(data);
		var resp = data.responseJSON;
		alert("Air Quality in Manhattan:\n"+resp[0].name+": "+resp[0].data_valuemessage+" "+resp[0].measure);
	})
	.fail(function (error) {
		//fail
		console.error(error);
	})
}

/*Test current weather in New York
--------------------------------------------------------------------------------
*/
function getdataWeather(){
    var url = "http://api.openweathermap.org/data/2.5/weather?q=newyork&appid=9830879c002bb5e78eebb68edc11b148";
    var data = $.get(url, () => {
        console.log(url);
    })    
    .done(function () {
		console.log(data);
		var resp = data.responseJSON;
		alert("Current Weather in New York\nTemperature "+(resp.main.temp-273.0)+" °C\nHumidity: "+resp.main.humidity+"\nPressure: "+data.responseJSON.main.pressure) 
	})
}

/*Test Zillow, data set of houses price
--------------------------------------------------------------------------------
*/

function getdataZillow(){
	//var url ="http://www.zillow.com/webservice/GetRegionChildren.htm?zws-id=X1-ZWz1g3avqfkcuj_211k7&state=ny&city=newyork&childtype=neighborhood"
    var url = "http://api.zillow.com/webservice/GetDeepSearchResults.htm?zws-id=X1-ZWz1g3avqfkcuj_211k7&address=1600+Broadway&citystatezip=NewYork%2C+NY";
    //var url="http://www.zillow.com/webservice/GetDeepComps.htm?zws-id=X1-ZWz1g3avqfkcuj_211k7&zpid=2126597946&count=5&rentzestimate=true"
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
            parserFunct(this);
        }
    }
    xhttp.open("GET", url, true);
    xhttp.send(); 
    console.log(xhttp);
}
//Call to xml parse to Json
var HousePrice = []
function parserFunct(xml) {
    var xmlDoc = xml.responseXML;
    console.log(xmlDoc);
    var xtjson = xmlToJson(xmlDoc);
    console.log(xtjson);
    var resp = xtjson.search.response.results.result;
    console.log("testZ ", (resp) );
    alert("Adress: "+resp[0].address.street+"\nestimate:"+resp[0].zestimate.amount);
}

/*Functions to draw the google map
--------------------------------------------------------------------------------
--------------------------------------------------------------------------------
*/
function myMap() {
    var centermap = new google.maps.LatLng(nyus_coord[0],nyus_coord[1]);
        
    map = new google.maps.Map(document.getElementById("googleMap"),{
        center:centermap,
        zoom:14,
    });
   
    var marker = new google.maps.Marker({
        position: centermap,
        map: map,
        title: 'NYU Stern'
    });    
    var infowindow = new google.maps.InfoWindow({ content: ''});
    var content = 'Title of stern';
    google.maps.event.addListener(marker, 'click', (function (marker, content) {
        return function () {
            console.log('Gmarker gets pushed');
            infowindow.setContent(content);
            infowindow.open(map, marker);
            //map.panTo(this.getPosition());
            //map.setZoom(15);
        }
    })(marker, content));

    inputRadio();
    addMarkersCrime();   
    addMarkersHouse();
    addMarkersFirest();
    addMarkersATM();
}
/*--
--*/
function addMarker(marker,image,listMarkers){
	var category = marker[3];
    var title = marker[2];
    var pos = new google.maps.LatLng(marker[IDX_LAT], marker[IDX_LON]);
    gmarker = new google.maps.Marker({
        title: title,
        position: pos,
        category: category,
        map: map,
        visible: false,
        icon: image
    });
    var infowindow = new google.maps.InfoWindow();
    google.maps.event.addListener(gmarker, 'click', function () {
        infowindow.setContent(this.title)
        infowindow.open(map, this);
    });
    listMarkers.push(gmarker);
}
/*----*/

function addMarkerHouse(marker){
    var category = marker[2];
    var title = marker[3];
    var pos = new google.maps.LatLng(marker[IDX_LAT], marker[IDX_LON]);
    var image = HOUSEICON;
    gmarker = new google.maps.Marker({
        title: title,
        position: pos,
        category: category,
        map: map,
        icon: image
    });
    
    var infowindow = new google.maps.InfoWindow();
    google.maps.event.addListener(gmarker, 'click', function () {
        infowindow.setContent(this.title)
        infowindow.open(map, this);
    });
    housesMarkers.push(gmarker);
    //console.log(housesMarkers)
}

function addMarkersHouse(opt){
	for (i=0; i < HOUSESDATA.length; i++){
        if (radio>HOUSESDATA[i][4]){
            addMarkerHouse(HOUSESDATA[i])
        }
    }
}

$(document).ready(function() {
  var hflag = false;
  $("#houses").on('click', function(){
    if (!hflag){
      for(i=0;i<housesMarkers.length;i++){
      	housesMarkers[i].setVisible(false);
      }
      hflag = true;
    }
    else {      
      for(i=0;i<housesMarkers.length;i++){
      	housesMarkers[i].setVisible(true);
      }
      hflag = false;
    }
  });
});
/*---*/
function addMarkersCrime(){
	for (i = 0; i < CRIMEDATA.length; i++) {
        if(radio>CRIMEDATA[i][4]){
            //addMarkerCrime(CRIMEDATA[i],map);
            addMarker(CRIMEDATA[i],CRIMEICON,crimeMarkers)
        }
    }
}
$(document).ready(function() {
  var crflag = true;
  $("#crimes").on('click', function(){
    if (!crflag){
      for(i=0;i<crimeMarkers.length;i++){
      	crimeMarkers[i].setVisible(false);
      }
      crflag = true;
    }
    else {      
      for(i=0;i< crimeMarkers.length;i++){
      	crimeMarkers[i].setVisible(true);
      }
      crflag = false;
    }
  });
});

/*---*/

function addMarkersFirest(){
	for (i = 0; i < FIRESTDATA.length; i++) {
        //addMarkerFirest(FIRESTDATA[i],map);
        addMarker(FIRESTDATA[i],FIRESTICON,firestMarkers);
    }
}
$(document).ready(function() {
  var fsflag = true;
  $("#firest").on('click', function(){
    if (!fsflag){
      for(i=0;i<firestMarkers.length;i++){
      	firestMarkers[i].setVisible(false);
      }
      fsflag = true;
    }
    else {      
      for(i=0;i< firestMarkers.length;i++){
      	firestMarkers[i].setVisible(true);
      }
      fsflag = false;
    }
  });
});

/*--*/

function addMarkersATM(){
	for (i = 0; i < ATMDATA.length; i++) {
        addMarker(ATMDATA[i],ATMICON,atmMarkers);
    }
}
$(document).ready(function() {
  var atmflag = true;
  $("#atm").on('click', function(){
    if (!atmflag){
      for(i=0;i<atmMarkers.length;i++){
      	atmMarkers[i].setVisible(false);
      }
      atmflag = true;
    }
    else {      
      for(i=0;i< atmMarkers.length;i++){
      	atmMarkers[i].setVisible(true);
      }
      atmflag = false;
    }
  });
});

/*
--------------------------------------------------------------------------------
*//*
window.onload = function(){
	nyus_coord=[40.7290549,-73.9965233];
	myMap();
}*/
$(document).ready(function() {
	myMap();	
	$("#testairq").on("click", getdataAirq);
	$("#testweather").on("click", getdataWeather);	
	getdata(NEIGHURL,adddataNeighb);
	getdata(HOUSEURL+"?$where=counted_rental_units>0",adddataHouse);
	getdata(CRIMEURL,adddataCrime);
	getdata(FIREDEPURL,adddataFirest);
	getdata(ATMURL,adddataATM);
	inputRadio();
	$("#testzillow").on("click", getdataZillow);
	$("#testmap").on("click", myMap);
	$("#showall").on("click", myMap);	
})