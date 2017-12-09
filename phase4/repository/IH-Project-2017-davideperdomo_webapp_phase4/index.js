const IDX_LAT = 0
const IDX_LON = 1

const HOUSEURL = "https://data.cityofnewyork.us/resource/q3m4-ttp3.json"
const CRIMEURL = "https://data.cityofnewyork.us/resource/5jvd-shfj.json"
const FIREDEPURL = "https://data.cityofnewyork.us/resource/byk8-bdfw.json"
const ATMURL = "https://data.ny.gov/api/resource/ndex-ad5r.json?$where=city=\"New%20York\""
const NEIGHURL = "https://data.cityofnewyork.us/api/resource/q2z5-ai38.json?$where=boro_name=%22Manhattan%22"
const POLICEURL = "https://data.cityofnewyork.us/resource/kmub-vria.json"
const PRICEURL = "https://data.cityofnewyork.us/resource/ffxx-dfvk.json"
const ARTURL = "https://data.cityofnewyork.us/api/views/43hw-uvdj/rows.json?accessType=DOWNLOAD"
const MUSURL = "https://data.cityofnewyork.us/api/resource/fn6f-htvy.json"
//var quandlkey="LzBf7VTjx4mPLM74cvVN";
const nyus_coord=[40.7290549,-73.9965233]

const HOUSEICON = 'http://www.rentsbuy.com/media/com_iproperty/categories/house-icon6.png'
const CRIMEICON = 'http://mpi.krakow.pl/_img/close-icon.png'
const ATMICON = 'http://www.cityofukiah.com/NewWeb/wp-content/themes/deepblue/images/icon-dollar-small.png'
const FIRESTICON = 'http://www.arfd.argonathrpg.com/forum/Smileys/default/ff.png'
const ARTICON = "https://static.tacdn.com/img2/badges/20px/rev_02.png"
const MUSICON = "http://www.doorstepbooks.com/images/suggest-book1.png"

var map = null

var HOUSESDATA = []
var CRIMEDATA = []
var FIRESTDATA = []
var ATMDATA = []
var POLICEDATA = []
var ARTDATA = []
var MUSDATA =[]

var radio = 0.02 //
var max_radio = 0.04

var housesMarkers = []
var crimeMarkers = []
var firestMarkers = []
var atmMarkers = []
var artMarkers = []
var musMarkers = []

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
    radio = (document.getElementById("selectradio").value)/100;
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
		//console.log("dataxx:",data);
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

/*Houses pricess in ney york data set  TEST
--------------------------------------------------------------------------------
*/

function getdataPolice(){
  var url = POLICEURL
	var data = $.get(url, () => {
		console.log( url );
	})	
	.done(function () {
		console.log("datapol:",data);
	    var resp = data.responseJSON; 	
		for(i=0;i<resp.length;i++){
		   var coor = resp[i].the_geom.coordinates[0][0];
		   //console.log(coor[i])
		   var polygon =[]
		   for(j=0;j<coor.length;j++){
          //if(coor[i].length>0){
		       polygon.push({'lat':coor[0][1], 'lng':coor[0][0]})           
          //}
		   }
		   var aux=[
		       polygon,
		       resp[i].precinct
		       ]   
       POLICEDATA.push(aux)
       var gpol = new google.maps.Polygon({
        paths: polygon,
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35
        });
        gpol.setMap(map);
		}	   
    console.log(POLICEDATA) 
	})
	.fail(function (error) {
		console.error(error);
	})
}
/*Houses pricess in ney york data set  TEST
--------------------------------------------------------------------------------
*/

function getdataPrice(){
  var url = PRICEURL+"?$where=borough=\"MANHATTAN\"";
	var data = $.get(url, () => {
		console.log( url );
	})	
	.done(function () {
		console.log("dataprice:",data);
	  var resp = data.responseJSON; 	
		/*for(i=0;i<resp.length;i++){
		   adddata(resp[i]);
		}	*/
    var street = Math.floor(Math.random() * 20);
    var text ="PRICE:\nThe average monthly rent in "+resp[street].location_street_a+" is : "+resp[street].avg_monthly_gross_rent
    alert(text);
	  
    //var divop = document.getElementById("options");
    var newdiv = document.createElement("div");
    newdiv.className = "optiondiv";
    newdiv.append(text)
    $("#options").append(newdiv)
  })
	.fail(function (error) {
		console.error(error);
	})
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
/*Art data set
--------------------------------------------------------------------------------
*/
function adddataArt(){
  var url = ARTURL
  var data = $.get(url, () => {
    console.log( url );
  })  
  .done(function () {
    console.log("dataart:",data);
    var resp = data.responseJSON.data;   
    for(i=0;i<resp.length;i++){
       //console.log(resp[i]);       
      var coor = resp[i][9].replace("(","").replace(")","").split(" ");
      var aux =[
        parseFloat(coor[2]),
        parseFloat(coor[1]),
        resp[i][8],
        resp[i][12]
      ]
      ARTDATA.push(aux)
    }
    console.log(ARTDATA)
  })
  .fail(function (error) {
    console.error(error);
  })
}
/*Museums data set
--------------------------------------------------------------------------------
*/
function adddataMus(mus){
  //console.log("Mus",mus)
  var aux = [
    parseFloat(mus.the_geom.coordinates[1]),
    parseFloat(mus.the_geom.coordinates[0]),
    mus.name,
    mus.adress1
  ];
  MUSDATA.push(aux);
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
    addMarkersPolice();
    addMarkersArt();
    addMarkersMus();
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
/*--*/

function addMarkersArt(){
  for (i = 0; i < ARTDATA.length; i++) {
        addMarker(ARTDATA[i],ARTICON,artMarkers);
    }
}
$(document).ready(function() {
  var artflag = true;
  $("#art").on('click', function(){
    if (!artflag){
      for(i=0;i<artMarkers.length;i++){
        artMarkers[i].setVisible(false);
      }
      artflag = true;
    }
    else {      
      for(i=0;i< artMarkers.length;i++){
        artMarkers[i].setVisible(true);
      }
      artflag = false;
    }
  });
});
/*----*/
function addMarkersMus(){
  for (i = 0; i < MUSDATA.length; i++) {
        addMarker(MUSDATA[i],MUSICON,musMarkers);
    }
}
$(document).ready(function() {
  var musflag = true;
  $("#mus").on('click', function(){
    if (!musflag){
      for(i=0;i<musMarkers.length;i++){
        musMarkers[i].setVisible(false);
      }
      musflag = true;
    }
    else {      
      for(i=0;i< musMarkers.length;i++){
        musMarkers[i].setVisible(true);
      }
      musflag = false;
    }
  });
});
/*----*/

function addMarkerPolice(marker){
    //var category = marker[2];
    var title = marker[1];
    var gpol = new google.maps.Polygon({
        paths: marker[0],
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35
    });
    gpol.setMap(map);
    
    var infowindow = new google.maps.InfoWindow();

    gpol.addListener('click', function () {
        infowindow.setContent(marker[1])
        infoWindow.setPosition(event.latLng);
        infowindow.open(map);
    });
    //housesMarkers.push(gmarker);
    //console.log(housesMarkers)
}

function addMarkersPolice(){
  for (i=0; i < POLICEDATA.length; i++){
        //if (radio>POLICE[i][4]){
            addMarkerPolice(POLICEDATA[i])
        //}
    }
}
/*
$(document).ready(function() {
  var hflag = false;
  $("#hospital").on('click', function(){
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
});*/
/*---*/
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
  adddataArt();
  getdata(MUSURL,adddataMus);	
  $("#testmap").on("click", getdataPolice);
	inputRadio();
	$("#testzillow").on("click", getdataPrice);
	$("#testmap").on("click", myMap);
	$("#showall").on("click", myMap);	
})