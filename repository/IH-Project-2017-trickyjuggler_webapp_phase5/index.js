var map;
var market0;


var artmarket=[];
var musmarket=[];
var schmarket=[];
var rentmarket=[];


var artGalleryData = []; 
var museumData = []; 
var schoolData = []; 
var streetData = [];
var rentList=[];


var manhattanZip=["10003","10011","10014","10012","10010","10009"];
var NYUSSB={lat: 40.7291, lng: -73.9965};


var token="sBCHKqeIGFtIYzftYfcTldsyqGjyYdjw";
var zid ="X1-ZWz18wv3cye2a3_aypsc";


var musIcon= "https://image.ibb.co/gO032m/museum.png";
var schIcon="https://image.ibb.co/gfs5F6/school_material.png";
var artIcon="https://image.ibb.co/nhk32m/portrait.png";
var uIcon="https://image.ibb.co/iOgbNm/university.png";
var rentIcon="https://image.ibb.co/dvWza6/cabin.png";

var near=3;
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//Map Functions

function initMap(){
	var mapDiv = document.getElementById('map');
	map = new google.maps.Map(mapDiv, {
		center: NYUSSB,
		zoom: 14});
        
	marker0 = new google.maps.Marker({
		position: NYUSSB,
		map:map,
		title: 'NYU Stern School of Business',
		icon: new google.maps.MarkerImage( uIcon, undefined, undefined, undefined, new google.maps.Size(30, 30)),
        animation: google.maps.Animation.DROP
	})
}


function addDataMarkets(dataL,dataM,iconD){
	for (var i = 0; i < dataL.length; i++) {
		var marker = new google.maps.Marker({
			position: {lat: dataL[i][1], lng: dataL[i][2]},
			map:map,
			title: dataL[i][0],
			icon: new google.maps.MarkerImage( iconD, undefined, undefined, undefined, new google.maps.Size(20, 20))
		})	
		dataM.push(marker);
	}
}


function addRentalMarkets(dataL,dataM){
	for (var i = 0; i < dataL.length; i++) {
		if (dataL[i].amount>=document.forms["form1"]["price"].value) {
			var marker = new google.maps.Marker({
				position: {lat: parseFloat(dataL[i].lat), lng: parseFloat(dataL[i].log)},
				map:map,
				title: dataL[i].address,
				icon: new google.maps.MarkerImage( rentIcon , undefined, undefined, undefined, new google.maps.Size(30, 30)),
				zpid: dataL[i].zpid,
            	animation: google.maps.Animation.DROP
			})

			marker.setAnimation(null);

			//Marker Event
			marker.addListener('click', function() {
				map.setCenter(searchPoint(this.zpid,rentList));
				map.setZoom(16);
				toggleBounce(this);
          		showPropertyInfo(this.zpid);
				document.getElementById("proper").click();
        	});

			dataM.push(marker);	
		}
	}
}


function searchPoint(IDt, rentals){
    for (var i=0; i < rentals.length; i++) {
        if (rentals[i].zpid === IDt) {
            return {lat: parseFloat(rentals[i].lat), lng: parseFloat(rentals[i].log)};
        }
    }
}


function toggleBounce(market) {
    if (market.getAnimation() !== null) {
        market.setAnimation(null);
    } else {
          market.setAnimation(google.maps.Animation.BOUNCE);
          setTimeout(function(){ market.setAnimation(null); }, 750*3);
    }
}


function removeMarket(market) {
    for(i=0; i<market.length; i++){
        market[i].setMap(null);
    }
}

function hideMarket(market) {
    for(i=0; i<market.length; i++){
        market[i].setMap(null);
    }
}


function cleanMarkets(){
	removeMarket(artmarket);
	removeMarket(musmarket);
	removeMarket(schmarket);
	removeMarket(rentmarket);
	artmarket=[];
	musmarket=[];
	schmarket=[];
	rentmarket=[];
}


/*var distaces=[];
    
function distance(){

    var DestiNYUSSB = new google.maps.LatLng(40.7291, -73.9965);
    var origin2="Manhattan,Nueva York";

    for (var i = 0; i < rentList.length; i++) {

    	var origin1 = new google.maps.LatLng(rentList[i].lat, rentList[i].log);
    	var service = new google.maps.DistanceMatrixService();
    	service.getDistanceMatrix({
    		origins: [origin1, origin2],
    		destinations: [origin2, DestiNYUSSB],
    		travelMode: 'DRIVING',
    		unitSystem: google.maps.UnitSystem.METRIC,
  		}, 		function (response, status) {
			if (status == 'OK') {
				console.log(i);
  				distaces.push(response.rows[0].elements[0].distance.text)
			}
		});


	}
	console.log(distaces);
}
*/
function getDistance(lat1,lon1,lat2,lon2) {
 	var R = 6371;
 	var dLat = deg2rad(lat2-lat1);
  	var dLon = deg2rad(lon2-lon1); 
  	var a = 
		Math.sin(dLat/2) * Math.sin(dLat/2) +
   	 	Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    	Math.sin(dLon/2) * Math.sin(dLon/2); 
  	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  	var d = R * c;
  	return (Math.round(d*100)/100);
}
function deg2rad(deg) {
  return deg * (Math.PI/180)
}
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function loadApp(){
	streetNYC();
	museumsL();
	artGalerias();
	schoolL();
	var tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    document.getElementById("defaultOpen").click();
}
	

document.getElementById("sendData").addEventListener("click", function(){

	cleanMarkets();
	map.setCenter(NYUSSB);
	map.setZoom(14);
	addRentalMarkets(rentList,rentmarket);
	document.getElementById("defaultOpen").click();
	if (document.getElementById("radio1").checked) {
		rentList.sort(function(a, b){return a.amount - b.amount});
	}
	if (document.getElementById("radio2").checked) {
    	rentList.sort(function(a, b){return a.distance - b.distance});
	}
	if(document.forms["form1"]["ArtGalleries"].checked){
		addDataMarkets( artGalleryData, artmarket, artIcon );
	}
	if (document.forms["form1"]["Museums"].checked) {
		addDataMarkets( museumData, musmarket, musIcon );
	}
	if (document.forms["form1"]["Schools"].checked) {
		addDataMarkets( schoolData, schmarket, schIcon);
	}
	updateTable();
});

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//Get Rental Info
function streetNYC(){		//Get Street Data
  	var requestURL = 'https://data.cityofnewyork.us/api/views/7xnr-9g4c/rows.json';
	var request = new XMLHttpRequest();
	request.open('GET', requestURL);
	request.responseType = 'json';
	request.send();
	request.onload = function() {
		getStreetList(request);
  	}
}


function getStreetList(request){	//Get Street List
  	var street = request.response;
	var streetAr=[];
	for (var i = 0; i < street.data.length; i++) {
		if (street.data[i][33]=="ST" || street.data[i][33] == "AVE" ) {
			streetAr[i]={zip: street.data[i][15] , name: street.data[i][37]+' '+street.data[i][33]};
		}
	}

	streetData = streetAr.filter(function(item){
   		return manhattanZip.indexOf(item.zip)!=-1;
	});

	streetData = removeDuplicates(streetData,"name");
	getZillowRent();
}


function removeDuplicates( arr, prop ) {
  var obj = {};
  return Object.keys(arr.reduce((prev, next) => {
    if(!obj[next[prop]]) obj[next[prop]] = next; 
    return obj;
  }, obj)).map((i) => obj[i]);
}


function getZillowRent(){	//Get Rental Sites List
	var myxml;
	var yqlurl1=[];
	try{
		for (var i = 0; i < streetData.length; i++) {
			url="http://www.zillow.com/webservice/GetSearchResults.htm?zws-id=X1-ZWz18wv3cye2a3_aypsc&address=1+W+"+ streetData[i].name.split(" ").join("+")+"&citystatezip="+streetData[i].zip;

			yqlurl1[i]=	{url:"http://query.yahooapis.com/v1/public/yql?q=" + encodeURIComponent("select * from xml where url='"+ url
    		+ "'")+"&format=xml&callback=?"};
   	 	}

    	for (var i = 0; i < yqlurl1.length; i++) {
    		$.getJSON(yqlurl1[i].url, function(data){
        		myxml=data.results[0];
        		parser = new DOMParser();
				xmlDoc = parser.parseFromString(myxml,"text/xml");
				x=xmlDoc.getElementsByTagName("code");
			
				if(x[0].childNodes[0].nodeValue==0){
					y=xmlDoc.getElementsByTagName("result");

					for (var j = 0; j < y.length; j++) {
						var zpidz=y[j].childNodes[0].childNodes[0].nodeValue;
						var streetz=y[j].childNodes[2].childNodes[0].childNodes[0].nodeValue;
						var latz=y[j].childNodes[2].childNodes[4].childNodes[0].nodeValue;
						var logz=y[j].childNodes[2].childNodes[5].childNodes[0].nodeValue;
						var distt=getDistance(parseFloat(latz),parseFloat(logz),NYUSSB.lat,NYUSSB.lng);
						var amountz;
						if (y[j].childNodes[3].childNodes[0].childNodes.length > 0){
    						var amountz=y[j].childNodes[3].childNodes[0].childNodes[0].nodeValue;
    						if (distt<=near) {
								rentList.push({zpid: zpidz, address: streetz, lat: parseFloat(latz), log: parseFloat(logz), amount: parseInt(amountz), distance: distt});
    						}
						}
					}
				}
			});
   	 	}
    }
    finally{
		document.getElementById("loading").style.visibility = "hidden";
	}
}


function showPropertyInfo(ID){
	url="http://www.zillow.com/webservice/GetUpdatedPropertyDetails.htm?zws-id="+zid+"&zpid="+ID;

	yqlurl=	{url:"http://query.yahooapis.com/v1/public/yql?q=" + encodeURIComponent("select * from xml where url='"+ url
    	+ "'")+"&format=xml&callback=?"};

	$.getJSON(yqlurl, function(data){
       	myxml=data.results[0];
       	parser = new DOMParser();
		xmlDoc = parser.parseFromString(myxml,"text/xml");
		x=xmlDoc.getElementsByTagName("code");

		if(x[0].childNodes[0].nodeValue==0){
			y=xmlDoc.getElementsByTagName("response");
			updateInfo(y[0]);
		}else if (x[0].childNodes[0].nodeValue==501||x[0].childNodes[0].nodeValue==502) {
			errorAPI(parseInt(x[0].childNodes[0].nodeValue));
		}
   	});
}


function errorAPI(error){
	$("#properInfo").empty();
	if (error==501) {
		$("#properInfo").append(
			"<h3>Error 501</h3></br>"		+
			"<p>No se puede mostrar informacion de esta propiedad.</p>"
		);
	}else if(error==502){
		$("#properInfo").append(
			"<h3>Error 502</h3></br>"		+
			"<p>Esta propiedad no tiene datos completos.</p>"
		);
	}
}


function updateInfo(xmlData){
	$("#properInfo").empty();
	$("#picture").empty();

	//console.log(xmlData.getElementsByTagName("images")[0].childNodes[1].childNodes[0].childNodes[0].nodeValue)

	//$('#picture').prepend('<img id="house" src='+musIcon+'style="width=100%;height=200px;"/>');

	$("#properInfo").append(
		"<h3>Property Info</h3>"		+
		"<b>Street:         </b>"+		xmlData.getElementsByTagName("address")[0].childNodes[0].childNodes[0].nodeValue		+
		"</br><b>ZipCode:   </b>"+		xmlData.getElementsByTagName("address")[0].childNodes[1].childNodes[0].nodeValue		+
		"</br><b>City:      </b>"+		xmlData.getElementsByTagName("address")[0].childNodes[2].childNodes[0].nodeValue		+ ", " + xmlData.getElementsByTagName("address")[0].childNodes[3].childNodes[0].nodeValue+
		"</br><b>Tipo:      </b>"+		xmlData.getElementsByTagName("editedFacts")[0].childNodes[0].childNodes[0].nodeValue
	);
}
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//Get museum location data from json
function museumsL(){
	var requestURL = 'https://data.cityofnewyork.us/api/views/fn6f-htvy/rows.json';
	var request = new XMLHttpRequest();
	request.open('GET', requestURL);
	request.responseType = 'json';
	request.send();
	request.onload = function() {
  		var museum = request.response;
  		getMuseumList(museum);
	}
}

function getMuseumList(museumjson){
	var musdata=museumjson.data;
	for (var i = 0; i < musdata.length ; i++) {
		var musname = musdata[i][9];
		var muslocation=musdata[i][8];
		muslocation=muslocation.replace( 'POINT (','');
		muslocation=muslocation.replace( ')','');
		muslocation=muslocation.split(' ');
		muslocation=[parseFloat(muslocation[1]),parseFloat(muslocation[0])];
		if (getDistance(muslocation[0],muslocation[1],NYUSSB.lat,NYUSSB.lng)<=near){
			museumData.push([musname, muslocation[0],muslocation[1]]);
		}
		
	}
}
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//Add School location markets fron json data to map
function schoolL(){
	var requestURL = 'https://data.cityofnewyork.us/api/views/qybk-bjjc/rows.json';
	var request = new XMLHttpRequest();
	request.open('GET', requestURL);
	request.responseType = 'json';
	request.send();
	request.onload = function() {
  		var school_safety = request.response;
  		getSchoolList(school_safety);
	}
}

function getSchoolList(schjson){
	var schdata=schjson.data;
  	for (var i = 0; i < schdata.length; i++) {
  		var schname = schdata[i][11];
		shclocation=[parseFloat(schdata[i][34]),parseFloat(schdata[i][35])];
		if (getDistance(shclocation[0],shclocation[1],NYUSSB.lat,NYUSSB.lng)<=near){
			schoolData.push([schname, shclocation[0],shclocation[1]]);
		}
	}
}
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//Add Art Gallery location markets fron json data to map
function artGalerias(){
	var requestURL = 'https://data.cityofnewyork.us/api/views/43hw-uvdj/rows.json';
	var request = new XMLHttpRequest();
	request.open('GET', requestURL);
	request.responseType = 'json';
	request.send();
	request.onload = function() {
  		var galart = request.response;
  		getGalleryList(galart);
	}
}

function getGalleryList(artjson){
	var artdata=artjson.data;
	for (var i = 0; i < artdata.length ; i++) {
		var artname = artdata[i][8];
		var artlocation=artdata[i][9];
		artlocation=artlocation.replace( 'POINT (','');
		artlocation=artlocation.replace( ')','');
		artlocation=artlocation.split(' ');
		artlocation=[parseFloat(artlocation[1]),parseFloat(artlocation[0])];
		if (getDistance(artlocation[0],artlocation[1],NYUSSB.lat,NYUSSB.lng)<=near) {
			artGalleryData.push([artname, artlocation[0], artlocation[1]]);
		}
	}
}
/*function getGalleryList(artjson){
	var artdata=artjson.meta.view.columns;

	for (var i = 0; i < artdata[9].cachedContents.top.length ; i++) {
		var artname = artdata[8].cachedContents.top[i].item;;
		var artlocation=artdata[9].cachedContents.top[i].item.coordinates;
		artGalleryData[i]=[artname, artlocation[1], artlocation[0]]
	}
}*/
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
function changeTab(evt, tabN) {
    var i, tabcontent, tablinks;

    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    document.getElementById(tabN).style.display = "block";
    evt.currentTarget.className += " active";
}
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//Get Clima Data
var station;
var climaDataOLD;
var climaData=[];

$(document).ready(function(){
	$.ajax({ 
		url:"https://www.ncdc.noaa.gov/cdo-web/api/v2/stations/GHCND:USC00304808",
		headers:{ token: token },
		success: function(result){
			station = result;
			getClimaData();

		} 
	})
})

function getClimaData(){
	$.ajax({ 
	url:"https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=GHCND&datatypeid=PRCP&locationid=FIPS:36&stationid=GHCND:USC00304808&startdate=2017-10-01&enddate="+station.maxdate+"&units=metrics&sortorder=desc&limit=1000",
	headers:{ token: token },
	success: function(result){
		climaDataOLD = result["results"];
		for (var i = 0; i < climaDataOLD.length; i++) {
			climaData.push({date:climaDataOLD[i].date.replace('T00:00:00',''),value:climaDataOLD[i].value})
		}
		plotg();
		} 
	})
}
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//Plot Chart
function plotg(){

	var svg = d3.select("svg");
		widthD=$( "#tab3" ).width();
		margin = {top: 20, right: 20, bottom: 30, left: 50},
		width = 0.95*widthD - margin.right - margin.left,
		height = 400 - margin.top - margin.bottom,
		g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	var parseTime = d3.timeParse("%Y-%m-%d");

	var dataT = [];
	for (var i = 0; i < climaData.length; i++) {
		dataT.push({
			date: parseTime(climaData[i].date),
			value: climaData[i].value
		})
	}

	var x = d3.scaleTime()
		.rangeRound([0, width]);

	var y = d3.scaleLinear()
		.rangeRound([height, 0]);

	var line = d3.line()
		.x(function(data) { return x(data.date); })
		.y(function(data) { return y(data.value); })

	x.domain(d3.extent(dataT, function(d) {return d.date; }));
	y.domain(d3.extent(dataT, function(d) {return d.value; }));

	g.append("g")
		.attr("transform", "translate(0," + height + ")")
		.call(d3.axisBottom(x));

	g.append("g")
		.call(d3.axisLeft(y))
		.append("text")
		.attr("fill", "#000")
		.attr("transform", "rotate(-90)")
		.attr("y", 6)
		.attr("dy" , "0.7em")

	g.append("path")
		.datum(dataT)
		.attr("fill", "none")
		.attr("stroke", "steelblue")
		.attr("stroke-width", 1.5)
		.attr("d", line);
}
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
function updateTable(){
	$("#tablebody").empty();
	tableReference = $("#tablebody")[0];
	var newRow, addresst, amountt, zpidt;
	for (var i = 0; i < rentList.length; i++) {
		if (rentList[i].amount>=document.forms["form1"]["price"].value) {

			newRow = tableReference.insertRow(tableReference.rows.length);
			addresst = newRow.insertCell(0);
			distancet= newRow.insertCell(1);
			amountt = newRow.insertCell(2);	
			zpidt = newRow.insertCell(3);
			addresst.innerHTML = rentList[i].address;
			distancet.innerHTML = rentList[i].distance+" Km";
			amountt.innerHTML = "$"+rentList[i].amount;
			zpidt.innerHTML = rentList[i].zpid;
		}
	}

	var table = document.getElementById("mytable");
    var rows = table.getElementsByTagName("tr");
    for (i = 0; i < rows.length; i++) {
            rows[i].onclick = (function() { // closure
            var cnt = i; // save the counter to use in the function
            return function() {
              var zpidt=this.cells[3].innerHTML;
              new google.maps.event.trigger( search(zpidt,rentmarket), 'click' );
            }    
        })(i);
    }

}

function search(IDt, markers){
    for (var i=0; i < markers.length; i++) {
        if (markers[i].zpid === IDt) {
            return markers[i];
        }
    }
}

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

