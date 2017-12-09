var map;
var NYU = {lat: 40.7291, lng: -73.9965};

function initMap(){
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: NYU
    });
    loadMarkers();
}

function loadMarkers(){
    loadMuseums();
    loadArtGalleries();
}

function putMarkers(map, array){
    for(var i=0; i<array.length;i++){
        array[i].setMap(map);
    }
}

var museumMarkers = [];
var showMuseums = false;
var museumsButton = document.getElementById("museums-button");

$("#museums-button").click(function(){
    if(!showMuseums){
        putMarkers(map, museumMarkers);
        museumsButton.style.backgroundColor = "#f2b632";
    }else{
        putMarkers(null, museumMarkers);
        museumsButton.style.backgroundColor = "#252839";
    }
    showMuseums = !showMuseums;
});

function loadMuseums(){

    var data = $.get("https://data.cityofnewyork.us/api/views/fn6f-htvy/rows.json")
    .done(function(){
        for (var i = 0; i < (data.responseJSON.data).length; i++) {
            var locationFromData = data.responseJSON.data[i][8].split("(")[1].split(")")[0].split(" ");
            var content = "<h4>" + data.responseJSON.data[i][8] +
                      "</h4><p>" +data.responseJSON.data[i][10] +
                      "</p><a href="+data.responseJSON.data[i][11]+" target='_blank'>Website</a>";
            var location = new google.maps.LatLng(locationFromData[1], locationFromData[0]);
            var infowindow = new google.maps.InfoWindow();
            var marker = new google.maps.Marker({
                position: location,
                map: map
            });
            marker.addListener('click', function(content){
                return function(){
                    infowindow.setContent(content);
                    infowindow.open(map, this);
                }
            }(content));
            museumMarkers.push(marker);
            marker.setMap(null);
            }
    })
}



var artGalleriesMarkers = [];
var showArtGalleries = false;

var artGalleriesButton = document.getElementById("art-galleries-button");
$("#art-galleries-button").click(function(){
    if(!showArtGalleries){
        putMarkers(map, artGalleriesMarkers);
        artGalleriesButton.style.backgroundColor = "#f2b632";
    }else{
        putMarkers(null, artGalleriesMarkers);
        artGalleriesButton.style.backgroundColor = "#252839";
    }
    showArtGalleries = !showArtGalleries;
});

function loadArtGalleries(){
    var data = $.get("https://data.cityofnewyork.us/api/views/43hw-uvdj/rows.json")
    .done(function(){
        for (var i = 0; i < (data.responseJSON.data).length; i++) {
            var locationFromData = data.responseJSON.data[i][9].split("(")[1].split(")")[0].split(" ");
            var content = "<h4>" + data.responseJSON.data[i][8] +
                      "</h4><p>" +data.responseJSON.data[i][10] +
                      "</p><a href="+data.responseJSON.data[i][11]+" target='_blank'>Website</a>";
            var location = new google.maps.LatLng(locationFromData[1], locationFromData[0]);
            var infowindow = new google.maps.InfoWindow();
            var marker = new google.maps.Marker({
                position: location,
                map: map
            });
            marker.addListener('click', function(content){
                return function(){
                    infowindow.setContent(content);
                    infowindow.open(map, this);
                }
            }(content));
            artGalleriesMarkers.push(marker);
            marker.setMap(null);
        }
    })
}
