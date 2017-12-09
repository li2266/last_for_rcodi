const DATASET_MUSEO = 'https://data.cityofnewyork.us/resource/fn6f-htvy.json';
const DATASET_ARTE = 'https://data.cityofnewyork.us/resource/43hw-uvdj.json';
const DATASET_BICICLETAS = 'https://data.cityofnewyork.us/resource/dimy-qyej.json';
const DATASET_BOMBEROS = 'https://data.cityofnewyork.us/resource/byk8-bdfw.json';
const DATASET_VACUNAS = 'https://data.cityofnewyork.us/resource/w9ei-idxz.json';

var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 40.7291, lng: -73.9965},
      zoom: 14
    });
    getMuseos();
    getGalerias();
    getBiciParq();
    getBomberos();
    getVacunas();
}

var marcadoresMuseo = [];
var museumIcon = "https://i.imgur.com/1SqYi6W.png";

function getMuseos(){
  $.getJSON(DATASET_MUSEO, function(data){
    $.each(data, function(i, entry){
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(parseFloat(entry.the_geom.coordinates[1]),
                                         parseFloat(entry.the_geom.coordinates[0])),
        map: null,
        title: entry.name,
        icon: museumIcon
      });
      marcadoresMuseo.push(marker);
      var infowindow = new google.maps.InfoWindow({
        content: entry.name + '<br/> <b>Tel:</b> ' + entry.tel + '<br/> <b>Site:</b> ' + entry.url
      });
      marker.addListener('click', function() {
        infowindow.open(map, marker);
      });
    });
  });
};

function setMuseos(type){
  for (var i = 0; i < marcadoresMuseo.length; i++) {
    marcadoresMuseo[i].setMap(type);
  }
}
$(document).ready(function() {
  $("#btnMuseo").on('click', function(){
    setMuseos(map)
  });
}); 

var marcadoresArte = [];
var artIcon = "https://i.imgur.com/icqb2OT.png";

function getGalerias(){
  $.getJSON(DATASET_ARTE, function(data){
    $.each(data, function(i, entry){
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(parseFloat(entry.the_geom.coordinates[1]),
                                         parseFloat(entry.the_geom.coordinates[0])),
        map: null,
        title: entry.name,
        icon: artIcon
      });
      marcadoresArte.push(marker);
      var infowindow = new google.maps.InfoWindow({
        content: entry.name + '<br/> <b>Tel:</b> ' + entry.tel + '<br/> <b>Site:</b> ' + entry.url
      });
      marker.addListener('click', function() {
        infowindow.open(map, marker);
      });
    });
  });
};
function setGalerias(type){
  for (var i = 0; i < marcadoresArte.length; i++) {
    marcadoresArte[i].setMap(type);
  }
}
$(document).ready(function() {
  $("#btnArte").on('click', function(){
      setGalerias(map)
  });
});


var marcadoresBicicleta = [];
var bikeIcon = "https://i.imgur.com/ozzYNbE.png";
function getBiciParq(){
  $.getJSON(DATASET_BICICLETAS, function(data){
    $.each(data, function(i, entry){
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(parseFloat(entry.the_geom.coordinates[1]),
                                         parseFloat(entry.the_geom.coordinates[0])),
        map: null,
        title: entry.name,
        icon: bikeIcon
      });
      marcadoresBicicleta.push(marker);
      var infowindow = new google.maps.InfoWindow({
        content: '<b>Location:</b> ' + entry.location
      });
      marker.addListener('click', function() {
        infowindow.open(map, marker);
      });
    });
  });
};
function setBiciParq(type){
  for (var i = 0; i < marcadoresBicicleta.length; i++) {
    marcadoresBicicleta[i].setMap(type);
  }
}
$(document).ready(function() {
  $("#btnBicicletas").on('click', function(){
      setBiciParq(map);
  });
});

var marcadoresBomberos = [];
var fireIcon = "https://i.imgur.com/Y7AveNZ.png";
function getBomberos(){
  $.getJSON(DATASET_BOMBEROS, function(data){
    $.each(data, function(i, entry){
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(parseFloat(entry.latitude),
                                         parseFloat(entry.longitude)),
        map: null,
        title: entry.nta,
        icon: fireIcon
      });
      marcadoresBomberos.push(marker);
      var infowindow = new google.maps.InfoWindow({
        content: entry.nta + '<br/><b>Address:</b> ' + entry.facilityaddress+'<br/><b>Borough:</b> ' + entry.borough
      });
      marker.addListener('click', function() {
        infowindow.open(map, marker);
      });
    });
  });
};
function setBomberos(type){
  for (var i = 0; i < marcadoresBomberos.length; i++) {
    marcadoresBomberos[i].setMap(type);
  }
}
$(document).ready(function() {
  var x = true;
  $("#btnBomberos").on('click', function(){
      setBomberos(map)
  });
});


var marcadoresVacunas = [];
var vaccinationIcon = "https://i.imgur.com/SObYxfa.png";
function getVacunas(){
  $.getJSON(DATASET_VACUNAS, function(data){
    $.each(data, function(i, entry){
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(parseFloat(entry.latitude),
                                         parseFloat(entry.longitude)),
        map: null,
        title: entry.facility_name,
        icon: vaccinationIcon
      });
      marcadoresVacunas.push(marker);
      var infowindow = new google.maps.InfoWindow({
        content: entry.facility_name + '<br><b>Address:</b> ' +
                 entry.address +'<br><b>Type service:</b> ' +
                 entry.service_type + '<br/> <b>Phone:</b> ' +
                 entry.phone
      });
      marker.addListener('click', function() {
        infowindow.open(map, marker);
      });
    });
  });
};
function setVacunas(type){
  for (var i = 0; i < marcadoresVacunas.length; i++) {
    marcadoresVacunas[i].setMap(type);
  }
}
$(document).ready(function() {
  $("#btnVacunas").on('click', function(){
      setVacunas(map)
  });
});

$("#btnClear").click(function(){
  setMuseos(null);
  setGalerias(null);
  setBiciParq(null);
  setBomberos(null);
  setVacunas(null);
});