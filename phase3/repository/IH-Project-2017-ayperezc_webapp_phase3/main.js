const DATASET_MUSEUM = 'https://data.cityofnewyork.us/resource/fn6f-htvy.json';
var museumMarkers = [];
var museumIcon = "https://i.downloadatoz.com/download/icon2/f/1/7/896426f52535286f955b9bf67a068a7e.jpg";

var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 40.7291, lng: -73.9965},
      zoom: 16
    });
}

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
	getMuseumData();

function setMuseumData(type){
  for (var i = 0; i < museumMarkers.length; i++) {
    museumMarkers[i].setMap(type);
  }
}


$(document).ready(function() {
  var x = true;
  getMuseumData();
	$("#btnMuseum").on('click', function(){setMuseumData(map)
  });
});
