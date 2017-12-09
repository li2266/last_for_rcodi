//--------------------------------- DATASETS ------------------------------------
const DATASET_ART = 'https://data.cityofnewyork.us/resource/43hw-uvdj.json';
const DATASET_BEACH = 'https://data.cityofnewyork.us/resource/4wtg-vt8c.json';
const DATASET_BIKE = 'https://data.cityofnewyork.us/resource/dimy-qyej.json';
const DATASET_FIRE = 'https://data.ny.gov/resource/qfsu-zcpv.json';
const DATASET_MUSEUM = 'https://data.cityofnewyork.us/resource/fn6f-htvy.json';
const DATASET_SOCCER = 'https://data.cityofnewyork.us/resource/6gqn-9g99.json';

//--------------------------------- MARKERS ------------------------------------
var artMarkers = [];
var beachPath = [];
var bikeMarkers = [];
var fireMarkers = [];
var museumMarkers = [];
var soccerPath = [];

//--------------------------------- ICONS --------------------------------------
var artIcon = 'https://i.imgur.com/TxmhOdw.png';
var beachIcon = 'https://i.imgur.com/Kfpnz8a.png';
var bikeIcon = 'https://i.imgur.com/2V4CoLu.png';
var fireIcon = 'https://i.imgur.com/ou6mXQ5.png';
var museumIcon = 'https://i.imgur.com/6whMKtc.png';
var universityIcon ='https://i.imgur.com/g86nhW3.png';

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
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(parseFloat(entry.lat),
                                         parseFloat(entry.long)),
        map: null,
        title: entry.fire_department_name,
        icon: fireIcon
      });
      fireMarkers.push(marker);
      var infowindow = new google.maps.InfoWindow({
        content: entry.fire_department_name + '<br/> Tel: ' + entry.phone_number + '<br/> County Name: ' + entry.countyname
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
//--------------------------------- SOCCER -------------------------------------
function getSoccer(){
  $.getJSON(DATASET_SOCCER, function(data, textstatus){
    $.each(data, function(i, entry){
      var path = [];
      var coor = entry.the_geom.coordinates[0][0];
      for (var i = 0; i < coor.length; i++) {
        var lati = parseFloat(coor[i][1]);
        var lngi = parseFloat(coor[i][0]);
        path.push({'lat': lati, 'lng': lngi});
      }
      var soccerPol = new google.maps.Polygon({
        paths: path,
        strokeColor: '#ff0aee',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#ff0aee',
        fillOpacity: 0.35
      });
      soccerPol.setMap(null);
      soccerPath.push(soccerPol);
    });
  });
};
function setSoccer(type){
  for (var i = 0; i < soccerPath.length; i++) {
    soccerPath[i].setMap(type);
  }
}
$(document).ready(function() {
  var x = true;
	$("#btnSoccer").on('click', function(){
    if (!x){
      setSoccer(null)
      x = true;
    }
    else {
      setSoccer(map)
      x = false;
    }
  });
});
//NOAA ----------------


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
    map.setCenter(uluru)
  });
}
function initMap() {
  //Google Maps JS
	//Set Map
  var name = 'University of New York';
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
  //Info Window
  var infowindow = new google.maps.InfoWindow({
    content: name
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
  getMuseumData();
  getSoccer();

  //Center
  var centerControlDiv = document.createElement('div');
  var centerControl = new CenterControl(centerControlDiv, map);

  centerControlDiv.index = 1;
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);
}