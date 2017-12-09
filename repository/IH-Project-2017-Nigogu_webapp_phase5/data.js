var map;

function initMap(){
		var mapDiv = document.getElementById('googleMapDiv');
		map = new google.maps.Map(mapDiv, {
			center: {lat: 40.7291, lng: -73.9965},
			zoom: 10});
		var marker = new google.maps.Marker({
			position: {lat: 40.7291, lng: -73.9965},
			map: map,
			icon: "http://hmp.me/a5yg",
			title: 'NYU Stern School of Business'
		});
	}

var casas = "https://data.cityofnewyork.us/api/views/hg8x-zxpr/rows.json?accessType=DOWNLOAD";

var museos = "https://data.cityofnewyork.us/api/views/fn6f-htvy/rows.json?accessType=DOWNLOAD";
var galerias = "https://data.cityofnewyork.us/api/views/43hw-uvdj/rows.json?accessType=DOWNLOAD";
var bomberos = "https://data.ny.gov/api/views/qfsu-zcpv/rows.json?accessType=DOWNLOAD";
var cajeros = "https://data.ny.gov/api/views/ndex-ad5r/rows.json?accessType=DOWNLOAD";


var datacasas;
var datamuseos;
var datagalerias;
var databomberos;
var datacajeros;

var casasmarkers = [];
var museosmarkers = [];
var galeriasmarkers = [];
var bomberosmarkers = [];
var cajerosmarkers = [];

loadDatasetsData();

$(document).ready(function() {
  document.getElementById("updatemap").onclick = function() {
		insertDatasetsData();
		updateMap();
  };
});


function loadDatasetsData() {
	$.ajax({
			url: casas,
			type: "GET"
	}).done(function(data){
		datacasas = data.data;
	});

  $.ajax({
      url: museos,
      type: "GET"
  }).done(function(data){
    datamuseos = data.data;
    //console.log(datamuseos);
  });

  $.ajax({
      url: galerias,
      type: "GET"
  }).done(function(data){
    datagalerias = data.data;
  });

  $.ajax({
      url: bomberos,
      type: "GET"
  }).done(function(data){
    databomberos = data.data;
  });

  $.ajax({
      url: cajeros,
      type: "GET"
  }).done(function(data){
    datacajeros = data.data;
  });
}

function insertDatasetsData(){

	for (var j = 0; j < datacasas.length; j++) {
		var lat = datacasas[j][23];
		var lng = datacasas[j][24];
		//console.log(lat);
		//console.log(lng);
		if(lat != null && lng != null){
		casasmarkers.push(addmarkeraux(lat,lng, "casa"));
	}
	}


    for (var j = 0; j < datamuseos.length; j++) {
      var ubicacion = datamuseos[j][8];
      var mus_split_a = ubicacion.split("(");
      var mus_split_b = mus_split_a[1].split(" ");
      var mus_split_c = mus_split_b[1].split(")");
      var lng = mus_split_b[0];
      var lat = mus_split_c[0];
      museosmarkers.push(addmarkeraux(lat,lng, "museo"));
    }

    for (var j = 0; j < datagalerias.length; j++) {
      var ubicacion2 = datagalerias[j][9];
      var mus_split_a = ubicacion2.split("(");
      var mus_split_b = mus_split_a[1].split(" ");
      var mus_split_c = mus_split_b[1].split(")");
      var lng = mus_split_b[0];
      var lat = mus_split_c[0];
      galeriasmarkers.push(addmarkeraux(lat,lng, "galeria"));
  }

    for (var j = 0; j < databomberos.length; j++) {
      var lat = databomberos[j][17];
      var lng = databomberos[j][18];
      bomberosmarkers.push(addmarkeraux(lat,lng,"bombero"));
  }
	/*

    for (var j = 0; j < datacajeros.length; j++) {
      var ubicacion = datacajeros[j][8];
      var mus_split_a = ubicacion.split("(");
      var mus_split_b = mus_split_a[1].split(" ");
      var mus_split_c = mus_split_b[1].split(")");
      var lng = mus_split_b[0];
      var lat = mus_split_c[0];
      cajerosmarkers.push(addmarkeraux(lat,lng));
    }*/
}

function addmarkeraux(lat,lng,type){
var icono;

if(type=='museo'){
	icono = "http://hmp.me/a5yf";
}if(type=='casa'){
	icono = "http://hmp.me/a5ye";
}if(type=='galeria'){
	icono = "http://hmp.me/a5yc";
}if(type=='bombero'){
	icono = "http://hmp.me/a5yd";
}

	var position =  new google.maps.LatLng(lat, lng);
	var marker = new google.maps.Marker({
		position: position,
		map: map,
		icon: icono
	});
	return marker;
}

function updateMap() {

if (document.getElementById("checkhouses").checked) {
	for (var i = 0; i < casasmarkers.length; i++) {
		casasmarkers[i].setMap(map);
	}
} else{
	for (var i = 0; i < casasmarkers.length; i++) {
		casasmarkers[i].setVisible(false);
	}
}


	if (document.getElementById("checkmuseums").checked) {
		for (var i = 0; i < museosmarkers.length; i++) {
			museosmarkers[i].setMap(map)
		}
	} else {
		for (var i = 0; i < museosmarkers.length; i++) {
			museosmarkers[i].setVisible(false);
		}
	}

  if (document.getElementById("checkgalleries").checked) {
		for (var i = 0; i < galeriasmarkers.length; i++) {
			galeriasmarkers[i].setMap(map)
		}
	} else {
		for (var i = 0; i < galeriasmarkers.length; i++) {
			galeriasmarkers[i].setVisible(false);
		}
  }

  if (document.getElementById("checkfiremen").checked) {
		for (var i = 0; i < bomberosmarkers.length; i++) {
			bomberosmarkers[i].setMap(map)
		}
	} else {
		for (var i = 0; i < bomberosmarkers.length; i++) {
			bomberosmarkers[i].setVisible(false);
		}
  }

  /* if (document.getElementById("checkatm").checked) {
		for (var i = 0; i < museosmarkers.length; i++) {
			museosmarkers[i].setMap(map)
		}
	} else {
		for (var i = 0; i < museosmarkers.length; i++) {
			museosmarkers[i].setVisible(false);
		}
  }*/
}

function setMapOnAll(map, list) {
  for (var i = 0; i < list.length; i++) {
    list[i].setMap(map);
  }
}

function HideMarkers(list) {
  setMapOnAll(null, list);
}

function getDataFromURL(URL) {
  var data = $.get(URL, function() {
      console.log(URL);
    })
    .done(function() {
      console.log(data);
    })
    .fail(function(error) {
      console.error(error);
    })
}

/*

var format = "https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=GSOM&stationid=GHCND:USC00010008&units=standard&startdate=2010-05-01&enddate=2010-05-31";

var noaa = new XMLHttpRequest();
noaa.open('GET', format);
noaa.setRequestHeader ("Token","BuNXXVFLuFkztcQjJsNVphTaJSwpNGQT");

noaa.responseType = 'json';
noaa.send();
var climate;

noaa.onload = function() {
  var climate = noaa.response;
  console.log(climate);
}
*/
