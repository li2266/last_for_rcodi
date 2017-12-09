var quandlkey="LzBf7VTjx4mPLM74cvVN";

var nyus_coord=[40.7290549,-73.9965233]

var housemarks=[]
var crimemarks=[]

var radio =0.02

function inputRadio(){
    radio = document.getElementById("selectradio").value;
}

//Provitional distance calculator given to coordinates
function distanceTo(coord1,coord2){
    //console.log(coord1,coord2);
    var d = Math.sqrt( (Math.pow( coord2[0]-Math.abs(coord1[0]),2 ))+(Math.pow( Math.abs(coord2[1])-Math.abs(coord1[1]),2 ))); 
    //console.log( Math.pow(coord2[0]-Math.abs(coord1[0]),2 ), coord2[1],Math.abs(coord1[1])  );
    return d;
}

//Test houses data set for Manhattan borough 
function getdataHouse(){
    var boro = "Manhattan"; 
    //var url = "https://data.cityofnewyork.us/api/views/hg8x-zxpr/rows.json?$where=borough=%22"+boro+"%22";
    var url = "https://data.cityofnewyork.us/resource/q3m4-ttp3.json?$where=counted_rental_units%3E0%20AND%20borough=%22Manhattan%22";
    var data = $.get(url, () => {
		console.log( url );
	})
	.done(function () {
	    var resp = data.responseJSON; 
		console.log(data);
		for(i=0;i<resp.length;i++){
		    var aux = [resp[i].house_number, 
		        resp[i].street_name, 
		        resp[i].latitude, 
		        resp[i].longitude];
		    aux.push( distanceTo(nyus_coord,[ aux[2], aux[3] ]) );
		    test=[];
		    if(aux[4] < 0.03){
		        housemarks.push(aux);
		    }else{
		        test.push(aux[4]);
		    }
		}
		console.log(test);
		console.log(housemarks);
		
	})
	.fail(function (error) {
		//fail
		console.error(error);
	})
}

//Test Air quality data set
function getdataAirq(){
    var url = "https://data.cityofnewyork.us/api/views/c3uy-2p5r/rows.json?accessType=DOWNLOAD"
    var data = $.get(url, () => {
		console.log( url );
	})
	.done(function () {
		console.log(data);
	})
	.fail(function (error) {
		//fail
		console.error(error);
	})
}

//Test current weather in New York
function getdataWeather(){
    var url = "http://api.openweathermap.org/data/2.5/weather?q=newyork&appid=9830879c002bb5e78eebb68edc11b148";
    var data = $.get(url, () => {
        console.log(url);
    })
    
    .done(function () {
		console.log(data);
		alert("Current-weather-in-ny\nTemperatura:"+data.responseJSON.main.temp+"kelvin\nHumedad:"+data.responseJSON.main.humidity+"\nPresion:"+data.responseJSON.main.pressure) 
	})
	.fail(function (error) {
		//fail
		console.error(error);
	})
	
}

//Test data base 
function getdataCrime(){
    var boro = "MANHATTAN"
    var url="https://data.cityofnewyork.us/resource/5jvd-shfj.json?$where=boro_nm=%22"+boro+"%22"
    //var url="https://data.cityofnewyork.us/api/views/INLINE/rows.json?accessType=DOWNLOAD"
    var data = $.get(url, () => {
		console.log( url );
	})
	.done(function () {
	    var  resp = data.responseJSON
		//.log(resp);
		//alert(resp[0].lat_lon.longitude)
		for (i=0;i<resp.length;i++){
		    var aux = [resp[i].ofns_desc, resp[i].latitude, resp[i].longitude, "crime"] ;
		    crimemarks.push(aux);
		}
		
		//console.log(distanceTo(nyus_coord,[parseFloat(crimemarks[0][1]),parseFloat(crimemarks[0][2])] ));
		console.log(crimemarks);
		alert("Crime data ready!")
	})
	.fail(function (error) {
		//fail
		console.error(error);
	})
}

//Xml parser to Json taken from: https://gist.github.com/chinchang/8106a82c56ad007e27b1
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
			var nodeName = item.nodeName;
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

//Test Zillow, data set of houses price
function getdataZillow(){
    //var url ="http://www.zillow.com/webservice/GetRegionChildren.htm?zws-id=X1-ZWz1g3avqfkcuj_211k7&state=ny&city=newyork&childtype=neighborhood"
    var url = "http://api.zillow.com/webservice/GetSearchResults.htm?zws-id=X1-ZWz1g3avqfkcuj_211k7&address=1600+Broadway&citystatezip=NewYork%2C+NY";
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
            parserFunct(this);
        }
    };
    
    xhttp.open("GET", url, true);
    xhttp.send();
    console.log(xhttp);
}
//Call to xml parse to Json
function parserFunct(xml) {
    var xmlDoc = xml.responseXML;
    console.log(xmlDoc);
    var xtjson = xmlToJson(xmlDoc);
    console.log(xtjson);
}

//Function to draw the google map
function myMap() {
    var centermap = new google.maps.LatLng(nyus_coord[0],nyus_coord[1]);
        
    
    var map=new google.maps.Map(document.getElementById("googleMap"),{
        center:centermap,
        zoom:14,
    });
   
    var marker = new google.maps.Marker({
          position: centermap,
          map: map,
          title: 'Hello World!'
        });
        
    inputRadio();
    var test=[]
    for (i = 0; i < crimemarks.length; i++) {
        var dist = distanceTo(nyus_coord,[parseFloat(crimemarks[i][1]),parseFloat(crimemarks[i][2])]);
        if(radio>dist){
            addMarkerCrime(crimemarks[i],map,);
        }else{
            test.push(dist);
        }
    }
    console.log(test);
    
    for (i=0; i < housemarks.length; i++){
        if (radio>housemarks[i][4]){
            addMarkerHouse(housemarks[i],map)
        }
    }
}

function addMarkerCrime(marker,map) {
    var category = marker[3];
    var title = marker[0];
    var pos = new google.maps.LatLng(marker[1], marker[2]);
    var image = 'http://mpi.krakow.pl/_img/close-icon.png';
    marker1 = new google.maps.Marker({
        title: title,
        position: pos,
        category: category,
        map: map,
        icon: image
    });
}
function addMarkerHouse(marker,map){
    var category = marker[1];
    var title = marker[0];
    var pos = new google.maps.LatLng(marker[2], marker[3]);
    var image = 'http://www.douganproperty.com/171101025909/style/icons/attr-type.png';
    marker1 = new google.maps.Marker({
        title: title,
        position: pos,
        category: category,
        map: map,
        icon: image
    });
}



$(document).ready(function() {
	$("#testairq").on("click", getdataAirq);
	$("#testweather").on("click", getdataWeather);
	getdataHouse();
	inputRadio();
	$("#testzillow").on("click", getdataZillow);
	$("#testcrime").on("click", getdataCrime);
	$("#testmap").on("click", myMap);
	$("#showall").on("click", myMap);
})