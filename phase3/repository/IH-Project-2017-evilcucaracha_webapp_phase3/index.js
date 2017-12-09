var map;
var NYUSternLocation = {lat: 40.7290549, lng: -73.99652329999998};

$('a[href^="#"]').click(function () {
    $('html, body').animate({
        scrollTop: $('[name="' + $.attr(this, 'href').substr(1) + '"]').offset().top
    }, 500);
    return;
});

function initMap(){
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: NYUSternLocation,
      styles: [
            {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
            {
              featureType: 'administrative.locality',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi',
              elementType: 'labels.text.fill',
              stylers: [{visibility: 'off'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'geometry',
              stylers: [{color: '#263c3f'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'labels.text.fill',
              stylers: [{color: '#6b9a76'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [{color: '#38414e'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry.stroke',
              stylers: [{color: '#212a37'}]
            },
            {
              featureType: 'road',
              elementType: 'labels.text.fill',
              stylers: [{color: '#9ca5b3'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry',
              stylers: [{color: '#746855'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry.stroke',
              stylers: [{color: '#1f2835'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'labels.text.fill',
              stylers: [{color: '#f3d19c'}]
            },
            {
              featureType: 'transit',
              elementType: 'geometry',
              stylers: [{visibility: 'off'}]
            },
            {
              featureType: 'transit.station',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{color: '#17263c'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.fill',
              stylers: [{color: '#9ca5b3'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.stroke',
              stylers: [{color: '#17263c'}]
            }
          ]

    });
    loadMarkers();
}

function loadMarkers(){
    loadCollege(NYUSternLocation);
    loadMuseums();
    loadArtGalleries();
}

function putMarkers(map, array){
    for(var i=0; i<array.length;i++){
        array[i].setMap(map);
    }
}

var collegeMarker = [];
var showCollege = true;
var collegeButton = document.getElementById("college-button");


$("#college-button").click(function(){
    if(!showCollege){
        putMarkers(map, collegeMarker);
        collegeButton.style.backgroundColor = "#f2b632";
    }else{
        putMarkers(null, collegeMarker);
        collegeButton.style.backgroundColor = "#252839";
    }
    showCollege = !showCollege;
});

function loadCollege(location){
    var marker = new google.maps.Marker({
      position: location,
      map: map,
      icon: "https://github.com/evilcucaracha/Purdue-UNAL-IronHacks-2017/blob/master/Images/college.png?raw=true"
    });
    var infowindow = new google.maps.InfoWindow();
    content = "<h4>NYU Stern</h4>"
    marker.addListener('click', function(content){
        return function(){
            infowindow.setContent(content);
            infowindow.open(map, this);
        }
    }(content));
    collegeMarker.push(marker);
    marker.setMap(null);

    putMarkers(map, collegeMarker);
    collegeButton.style.backgroundColor = "#f2b632";
}

//var museumIcon = 'https://i.imgur.com/RVdSDPo.png';
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
            var info = [];
            info[0] = data.responseJSON.data[i][9];
            info[1] = data.responseJSON.data[i][10];
            info[2] = data.responseJSON.data[i][11];
            var content = "<h4>" + info[0] + "</h4><p>" + info[1] + "</p><a href="+info[2]+" target='_blank'>More info</a>";
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
            var info = [];
            info[0] = data.responseJSON.data[i][8];
            info[1] = data.responseJSON.data[i][10];
            info[2] = data.responseJSON.data[i][11];
            var content = "<h4>" + info[0] + "</h4><p>" + info[1] + "</p><a href="+info[2]+" target='_blank'>More info</a>";
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

function bikeRoutes(){
    var bikeLayer = new google.maps.BicyclingLayer();
    bikeLayer.setMap(map);
}
