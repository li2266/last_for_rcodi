//--------------------------------- DATASETS ------------------------------------
const DATASET_ART = 'https://data.cityofnewyork.us/resource/43hw-uvdj.json';
const DATASET_BEACH = 'https://data.cityofnewyork.us/resource/p9cw-7gsv.json';
const DATASET_BIKE = 'https://data.cityofnewyork.us/resource/dimy-qyej.json';
const DATASET_FIRE = 'https://data.cityofnewyork.us/resource/byk8-bdfw.json';
const DATASET_HOUSES = 'https://data.cityofnewyork.us/resource/hg8x-zxpr.json';
const DATASET_MUSEUM = 'https://data.cityofnewyork.us/resource/fn6f-htvy.json';
const DATASET_POLICEPRE = 'https://data.cityofnewyork.us/resource/kmub-vria.json';
const DATASET_VACCINATION = 'https://data.cityofnewyork.us/resource/w9ei-idxz.json';

//--------------------------------- MARKERS & PATHS ----------------------------
var artMarkers = [];
var beachPath = [];
var bikeMarkers = [];
var fireMarkers = [];
var houseMarkers = [];
var museumMarkers = [];
var policeprePath = [];
var vaccinationMarkers = [];

//--------------------------------- ICONS --------------------------------------
var artIcon = 'https://i.imgur.com/GX5aWua.png';
var bikeIcon = 'https://i.imgur.com/5RXH6Xg.png';
var fireIcon = 'https://i.imgur.com/OhIUqPN.png';
var libertyStatue = 'https://i.imgur.com/SuLaO1T.png';
var houseIcon = 'https://i.imgur.com/n17uorJ.png';
var museumIcon = 'https://i.imgur.com/vtU6YG1.png';
var vaccinationIcon = 'https://i.imgur.com/vBhyCRN.png';
var universityIcon = 'https://i.imgur.com/XXq4A7R.png';

//--------------------------------- ART ----------------------------------------
function getArt(){
  $.getJSON(DATASET_ART, function(data, textstatus){
    $.each(data, function(i, entry){
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(parseFloat(entry.the_geom.coordinates[1]),
                                         parseFloat(entry.the_geom.coordinates[0])),
        map: null,
        title: entry.name,
        icon: artIcon
      });
      artMarkers.push(marker);
      var infowindow = new google.maps.InfoWindow({
        content: entry.name + '<br/> Tel: ' + entry.tel + '<br/> URL: ' + entry.url
      });
      marker.addListener('click', function() {
        infowindow.open(map, marker);
      });
    });
  });
};
function setArt(type){
  for (var i = 0; i < artMarkers.length; i++) {
    artMarkers[i].setMap(type);
  }
}
$(document).ready(function() {
  var x = true;
	$("#btnArt").on('click', function(){
    if (!x){
      setArt(null)
      x = true;
    }
    else {
      setArt(map)
      x = false;
    }
  });
});
//--------------------------------- BEACH --------------------------------------
function getBeach(){
  $.getJSON(DATASET_BEACH, function(data, textstatus){
    $.each(data, function(i, entry){
      var path = [];
      var coor = entry.the_geom.coordinates[0][0];
      for (var i = 0; i < coor.length; i++) {
        var lati = parseFloat(coor[i][1]);
        var lngi = parseFloat(coor[i][0]);
        path.push({'lat': lati, 'lng': lngi});
      }
      var beachPol = new google.maps.Polygon({
        paths: path,
        strokeColor: '#8b9820',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#8b9820',
        fillOpacity: 0.35
      });
      beachPol.setMap(null);
      beachPath.push(beachPol);
    });
  });
};
function setBeach(type){
  for (var i = 0; i < beachPath.length; i++) {
    beachPath[i].setMap(type);
  }
}
$(document).ready(function() {
  var x = true;
	$("#btnBeach").on('click', function(){
    if (!x){
      setBeach(null)
      x = true;
    }
    else {
      setBeach(map)
      x = false;
    }
  });
});
//--------------------------------- BICYCLE PARKING ----------------------------
function getBike(){
  $.getJSON(DATASET_BIKE, function(data, textstatus){
    $.each(data, function(i, entry){
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(parseFloat(entry.the_geom.coordinates[1]),
                                         parseFloat(entry.the_geom.coordinates[0])),
        map: null,
        title: entry.name,
        icon: bikeIcon
      });
      bikeMarkers.push(marker);
      var infowindow = new google.maps.InfoWindow({
        content: 'Location: ' + entry.location
      });
      marker.addListener('click', function() {
        infowindow.open(map, marker);
      });
    });
  });
};
function setBike(type){
  for (var i = 0; i < bikeMarkers.length; i++) {
    bikeMarkers[i].setMap(type);
  }
}
$(document).ready(function() {
  var x = true;
  $("#btnBike").on('click', function(){
    if (!x){
      setBike(null);
      x = true;
    }
    else {
      setBike(map);
      x = false;
    }
  });
});
//--------------------------------- CYCLE PATHS --------------------------------
function setPathBike(type){
  bicycling.setMap(type);
}
$(document).ready(function() {
  var x = true;
  $("#btnPaths").on('click', function(){
    if (!x){
      setPathBike(null);
      x = true;
    }
    else {
      setPathBike(map);
      x = false;
    }
  });
});
//--------------------------------- FIRE DEPARMENTS ----------------------------
function getFire(){
  $.getJSON(DATASET_FIRE, function(data, textstatus){
    $.each(data, function(i, entry){
      //console.log(entry);
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(parseFloat(entry.latitude),
                                         parseFloat(entry.longitude)),
        map: null,
        title: entry.nta,
        icon: fireIcon
      });
      fireMarkers.push(marker);
      var infowindow = new google.maps.InfoWindow({
        content: entry.nta + '<br/>Address: ' + entry.facilityaddress+'<br/>Borough: ' + entry.borough
      });
      marker.addListener('click', function() {
        infowindow.open(map, marker);
      });
    });
  });
};
function setFire(type){
  for (var i = 0; i < fireMarkers.length; i++) {
    fireMarkers[i].setMap(type);
  }
}
$(document).ready(function() {
  var x = true;
	$("#btnFire").on('click', function(){
    if (!x){
      setFire(null)
      x = true;
    }
    else {
      setFire(map)
      x = false;
    }
  });
});
//--------------------------------- HOUSE --------------------------------------
//this dataset provided information about the location of rent places
const DATASET_BUILD = 'https://data.cityofnewyork.us/resource/hg8x-zxpr.json';
//now will used the zillow api for get the estimate price for rent places
//var latlng = '';
//const API_ZILLOW = 'http://www.zillow.com/webservice/GetSearchResults.htm?zws-id=X1-ZWz1g39w7vjdaj_1brbp&address='+ add +'&citystatezip=New+York+NY';
//var googleAddress = $.get('https://maps.googleapis.com/maps/api/geocode/json?latlng='+entry.latitude+','+entry.longitude+'&key=AIzaSyA-BwPXkomJr-XssDju3O_3Iatxl-6Am50');


// Changes XML to JSON
function xmlToJson(xml) {

	// Create the return object
	var obj = {};

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
	if (xml.hasChildNodes()) {
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
};

function getHouse(){
  $.getJSON(DATASET_HOUSES, function(data, textstatus){
    $.each(data, function(i, entry){
      if(parseInt(entry.counted_rental_units) > 0 && entry.latitude != undefined && entry.longitude != undefined ){

        $.ajax({
           url:'https://maps.googleapis.com/maps/api/geocode/json?latlng='+entry.latitude+','+entry.longitude+'&key=AIzaSyA-BwPXkomJr-XssDju3O_3Iatxl-6Am50',
           dataType: 'json'
        }).done(function(obj){

          var streetNumber = obj.results[0].address_components[0].long_name.replace(/-/g,"+");
          //console.log(streetNumber);
          var route = obj.results[0].address_components[1].short_name.replace(/\s/g,"+");
          //console.log(route
          var address = streetNumber + '+' + route;

          //console.log(address);

          //var data = xmlToJson('http://www.zillow.com/webservice/GetSearchResults.htm?zws-id=X1-ZWz1g39w7vjdaj_1brbp&address='+ address +'&citystatezip=New+York+NY');

          //console.log(data);
          var marker = new google.maps.Marker({
            position: new google.maps.LatLng(parseFloat(entry.latitude),
                                             parseFloat(entry.longitude)),
            map: null,
            title: entry.building_id,
            icon: houseIcon
          });
          houseMarkers.push(marker);
          var infowindow = new google.maps.InfoWindow({
            content: entry.building_id + '<br/>Counted Rental Units: ' + entry.counted_rental_units
          });
          marker.addListener('click', function() {
            infowindow.open(map, marker);
          });
        });
      }
    });
  });
};

function setHouse(type){
  for (var i = 0; i < houseMarkers.length; i++) {
    houseMarkers[i].setMap(type);
  }
}
$(document).ready(function() {
  var x = true;
	$("#btnHouse").on('click', function(){
    if (!x){
      setHouse(null)
      x = true;
    }
    else {
      setHouse(map)
      x = false;
    }
  });
});
//--------------------------------- MUSEUM -------------------------------------
function getMuseumData(){
  $.getJSON(DATASET_MUSEUM, function(data, textstatus){
    $.each(data, function(i, entry){
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(parseFloat(entry.the_geom.coordinates[1]),
                                         parseFloat(entry.the_geom.coordinates[0])),
        map: null,
        title: entry.name,
        icon: museumIcon
      });
      museumMarkers.push(marker);
      var infowindow = new google.maps.InfoWindow({
        content: entry.name + '<br/> Tel: ' + entry.tel + '<br/> Page: ' + entry.url
      });
      marker.addListener('click', function() {
        infowindow.open(map, marker);
      });
    });
  });
};
function setMuseumData(type){
  for (var i = 0; i < museumMarkers.length; i++) {
    museumMarkers[i].setMap(type);
  }
}
$(document).ready(function() {
  var x = true;
	$("#btnMuseum").on('click', function(){
    if (!x){
      setMuseumData(null)
      x = true;
    }
    else {
      setMuseumData(map)
      x = false;
    }
  });
});
//--------------------------------- POLICE PRECINTS ----------------------------
function getPolicepre(){
  $.getJSON(DATASET_POLICEPRE, function(data, textstatus){
    $.each(data, function(i, entry){
      //console.log(entry.precinct);
      var path = [];
      var coor = entry.the_geom.coordinates[0][0];
      for (var i = 0; i < coor.length; i++) {
        var lati = parseFloat(coor[i][1]);
        var lngi = parseFloat(coor[i][0]);
        path.push({'lat': lati, 'lng': lngi});
      }
      var policePol = new google.maps.Polygon({
        paths: path,
        strokeColor: '#216291',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#216291',
        fillOpacity: 0.35
      });
      var dataPol = 'Police precinct number: ' + entry.precinct;
      policePol.setMap(null);
      policeprePath.push(policePol);
      policePol.addListener('click', showData);

      infoWindow = new google.maps.InfoWindow;

      function showData(event) {
        var vertices = this.getPath();

        infoWindow.setContent(dataPol);
        infoWindow.setPosition(event.latLng);

        infoWindow.open(map);
      }
      google.maps.event.addListener(policePol,"mouseover",function(){
       this.setOptions({fillColor: "#00FF00"});
      });
      google.maps.event.addListener(policePol,"mouseout",function(){
       this.setOptions({fillColor: "#216291"});
      });
    });
  });
};
function setPolicepre(type){
  for (var i = 0; i < policeprePath.length; i++) {
    policeprePath[i].setMap(type);
  }
}
$(document).ready(function() {
  var x = true;
	$("#btnPolicepre").on('click', function(){
    if (!x){
      setPolicepre(null)
      x = true;
    }
    else {
      setPolicepre(map)
      x = false;
    }
  });
});
//--------------------------------- VACCINATION ----------------------------------------
function getVac(){
  $.getJSON(DATASET_VACCINATION, function(data, textstatus){
    $.each(data, function(i, entry){
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(parseFloat(entry.latitude),
                                         parseFloat(entry.longitude)),
        map: null,
        title: entry.facility_name,
        icon: vaccinationIcon
      });
      vaccinationMarkers.push(marker);
      var infowindow = new google.maps.InfoWindow({
        content: entry.facility_name + '<br>Address: ' +
                 entry.address +'<br>Type service: ' +
                 entry.service_type + '<br/> Phone: ' +
                 entry.phone
      });
      marker.addListener('click', function() {
        infowindow.open(map, marker);
      });
    });
  });
};
function setVac(type){
  for (var i = 0; i < vaccinationMarkers.length; i++) {
    vaccinationMarkers[i].setMap(type);
  }
}
$(document).ready(function() {
  var x = true;
	$("#btnVac").on('click', function(){
    if (!x){
      setVac(null)
      x = true;
    }
    else {
      setVac(map)
      x = false;
    }
  });
});

//NOAA ----------------

//ZILLOW
//http://www.zillow.com/webservice/GetSearchResults.htm?zws-id=X1-ZWz1g39w7vjdaj_1brbp&address=510+6th+Ave&citystatezip=New+York+NY


//--------------------------------- Smooth Scrolling ---------------------------
$('a.toMove').click(function(){
  $('html, body').animate({
    scrollTop: $( $(this).attr('href')
    ).offset().top
  },1500)
  return false;
})
//--------------------------------- GoogleMaps ---------------------------------
var map;
var bycicling;
var uluru = {lat: 40.7291, lng: -73.9965};
var ls = {lat: 40.689209, lng: -74.044439};

function CenterControl(controlDiv, map) {

  // Set CSS for the control border.
  var controlUI = document.createElement('div');
  controlUI.style.backgroundColor = '#fff';
  controlUI.style.border = '1px solid #fff';
  controlUI.style.borderRadius = '3px';
  controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
  controlUI.style.cursor = 'pointer';
  controlUI.style.marginTop = '5px';
  controlUI.style.marginBottom = '22px';
  controlUI.style.textAlign = 'center';
  controlUI.title = 'Click to recenter the map';
  controlDiv.appendChild(controlUI);

  // Set CSS for the control interior.
  var controlText = document.createElement('div');
  controlText.style.color = '#333';
  controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
  controlText.style.fontSize = '16px';
  controlText.style.lineHeight = '38px';
  controlText.style.paddingLeft = '5px';
  controlText.style.paddingRight = '5px';
  controlText.innerHTML = 'Center Map';
  controlUI.appendChild(controlText);

  // Setup the click event listeners: simply set the map to Chicago.
  controlUI.addEventListener('click', function() {
    map.setCenter(uluru),
    map.setZoom(14)
  });
}

function initMap() {
  //Google Maps JS
	//Set Map
  var name = 'NYU Stern School of Business';
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,
    center: uluru
  });
  //Add Marker
  var marker = new google.maps.Marker({
    position: uluru,
    map: map,
    text: name,
    icon: universityIcon
  });
  var markerLs = new google.maps.Marker({
    position: ls,
    map: map,
    text: 'Liberty Statue',
    icon: libertyStatue
  });
  //Info Window
  var infowindow = new google.maps.InfoWindow({
    content: name
  });
  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });
  var infowindowls = new google.maps.InfoWindow({
    content: 'Statue of Liberty <br> Location: Liberty Island, Manhattan, New York City, New York, U.S.'
  });
  markerLs.addListener('click', function() {
    infowindowls.open(map, markerLs);
  });

  //Resize Function
  google.maps.event.addDomListener(window, "resize", function() {
    var center = map.getCenter();
    google.maps.event.trigger(map, "resize");
    map.setCenter(center);
  });

  //Function Buttons
  bicycling = new google.maps.BicyclingLayer();

  getArt();
  getBeach();
  getBike();
  getFire();
  getHouse();
  getMuseumData();
  getPolicepre();
  getVac();
  updateMaxTemp();

  //Center
  var centerControlDiv = document.createElement('div');
  var centerControl = new CenterControl(centerControlDiv, map);

  centerControlDiv.index = 1;
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);
}
//JQuery Effects----------------------------------------------------------------
$(document).ready(function(){
    $("#mark").click(function(){
        $("#list").slideToggle("slow");
    });
});

//d3js--------------------------------------------------------------------------
var maxTemp2017 = [];
var maxTemNOAA2017 = 'https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=GHCND&datatypeid=tmax&locationid=CITY:US360019&stationid=GHCND:USW00094728&units=metric&startdate=2017-01-01&enddate=2017-11-01&limit=366'
var tokenNOAA ='tNspoqZwkFAFxbHkIcsfnNgEGSYqEhdh';

$.ajax({
  url: maxTemNOAA2017,
  headers:{
    'token': tokenNOAA
  },
  success: function(entry){
    for (var i = 0; i < entry.results.length; i++) {
      var date = entry.results[i].date.substring(0,10);
      var temp = entry.results[i].value;
      maxTemp2017.push([date, temp])
    }
  }
});

function updateMaxTemp(){
  var svg = d3.select("svg")
      margin = {top: 10, right: 10, bottom: 20, left: 25}
      width = $(window).width() - margin.right - margin.left
      height = 300 - margin.top - margin.bottom
      g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var parseTime = d3.timeParse("%Y-%m-%d");

  var x = d3.scaleTime()
            .rangeRound([0, width]);
  var y = d3.scaleLinear()
            .rangeRound([height, 0]);
  var line = d3.line()
              .x(function(data) { return x(data.date); })
              .y(function(data) { return y(data.close); });

  var data = maxTemp2017.map(function(data){
    return{
      date: parseTime(data[0]),
      close: data[1]
    };
  });

  x.domain(d3.extent(data, function(d){ return d.date; }));
  y.domain(d3.extent(data, function(d){ return d.close; }));

  g.append("g")
   .attr("transform", "translate(0," + height+ ")")
   .call(d3.axisBottom(x));

  g.append("g")
   .call(d3.axisLeft(y))
   .append("text")
   .attr("fill", "#000")
   .attr("transform", "rotate(-90)")
   .attr("y", 6)
   .attr("dy" , "0.7em")
   .text("New York Max Temperature 2017")

  g.append("path")
   .datum(data)
   .attr("fill", "none")
   .attr("stroke", "#d9882a")
   .attr("stroke-width", 3)
   .attr("d", line);
}