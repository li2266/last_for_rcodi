var map;

function initMap(){
		var mapDiv = document.getElementById('googleMapDiv');
		map = new google.maps.Map(mapDiv, {
			center: {lat: 40.7291, lng: -73.9965},
			zoom: 10});
		var marker = new google.maps.Marker({
			position: {lat: 40.7291, lng: -73.9965},
			map: map,
			title: 'NYU Stern School of Business'
		});
	}


/*
https://catalog.data.gov/dataset/new-york-city-population-by-boroughs-fd2c0 - Población por Barrio
https://catalog.data.gov/dataset/new-york-city-museums - Museos
https://catalog.data.gov/dataset/new-york-city-art-galleries - Galerías de Arte
https://catalog.data.gov/dataset/fire-department-directory-for-new-york-state - Bomberos
https://catalog.data.gov/dataset/housing-new-york-units-by-building  - Viviendas por edificio
https://catalog.data.gov/dataset/bank-owned-atm-locations-in-new-york-state - Cajeros ATM
https://catalog.data.gov/dataset/neighborhood-names-gis - Nombre de los vecindarios
https://catalog.data.gov/dataset/air-quality-ef520 - Calidad del aire
https://catalog.data.gov/dataset/school-safety-report-8067a - School Safety
*/

var museos = "https://data.cityofnewyork.us/api/views/fn6f-htvy/rows.json?accessType=DOWNLOAD";
var galerias = "https://data.cityofnewyork.us/api/views/43hw-uvdj/rows.json?accessType=DOWNLOAD";
var bomberos = "https://data.ny.gov/api/views/qfsu-zcpv/rows.json?accessType=DOWNLOAD";
var cajeros = "https://data.ny.gov/api/views/ndex-ad5r/rows.json?accessType=DOWNLOAD";

var datamuseos;
var datagalerias;
var databomberos;
var datacajeros;

var museosmarkers = [];
var galeriasmarkers = [];
var bomberosmarkers = [];
var cajerosmarkers = [];

loadDatasetsData();

$(document).ready(function() {
  document.getElementById("updatemap").onclick = function() {
		insertDatasetsData();
		console.log(museosmarkers);
		updateMap();
  };
});


function loadDatasetsData() {
  $.ajax({
      url: museos,
      type: "GET"
  }).done(function(data){
    datamuseos = data.data;
    console.log(datamuseos);
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
    for (var j = 0; j < datamuseos.length; j++) {
      var ubicacion = datamuseos[j][8];
      var mus_split_a = ubicacion.split("(");
      var mus_split_b = mus_split_a[1].split(" ");
      var mus_split_c = mus_split_b[1].split(")");
      var lng = mus_split_b[0];
      var lat = mus_split_c[0];
      museosmarkers.push(addmarkeraux(lat,lng));
    }

    for (var j = 0; j < datagalerias.length; j++) {
      var ubicacion2 = datagalerias[j][9];
      var mus_split_a = ubicacion2.split("(");
      var mus_split_b = mus_split_a[1].split(" ");
      var mus_split_c = mus_split_b[1].split(")");
      var lng = mus_split_b[0];
      var lat = mus_split_c[0];
      galeriasmarkers.push(addmarkeraux(lat,lng));
  }

    for (var j = 0; j < databomberos.length; j++) {
      var lat = databomberos[j][17];
      var lng = databomberos[j][18];
			console.log(lat);
			console.log(lng);
      bomberosmarkers.push(addmarkeraux(lat,lng));
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
		console.log(bomberosmarkers);
}

function addmarkeraux(lat,lng){
	var position =  new google.maps.LatLng(lat, lng);
	var marker = new google.maps.Marker({
		position: position,
		map: map
	});
	return marker;
}

function updateMap() {

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
      //console.log(URL);
    })
    .done(function() {
      console.log(data);
    })
    .fail(function(error) {
      console.error(error);
    })
}

/* NOITA. c:
var noaa = new XMLHttpRequest();
noaa.open('GET',DATASET_QUERY_FORMAT_B);
noaa.setRequestHeader ("Token","TyuZzlPzZZGkyDBQhthmJYFJtUjnZbAx");

noaa.responseType = 'json';
noaa.send();
var climate;

noaa.onload = function() {
  var climate = noaa.response;
  console.log(climate);
}
*/
